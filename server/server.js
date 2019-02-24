const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const redis = require('connect-redis')(session);

const api = require('./routes/api');
const contactRouter = require('./routes/api/contacts');
const User = require('../database/models/User');

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'development';
const SESSION_SECRET = process.env.SESSION_SECRET || 'rolodolo';

if (!process.env.REDIS_STORE_URI) {
  throw new Error('redis store uri not set');
}

const app = express();

app.use(express.static('../public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(
  session({
    store: new redis({ url: process.env.REDIS_STORE_URI, logErrors: true }),
    secret: SESSION_SECRET,
    resave: false,
    cookie: { secure: ENV === 'production' }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  User.where('id', user.id)
    .fetch()
    .then(dbUser => {
      dbUser = dbUser.toJSON({ visibility: false });
      return done(null, {
        id: dbUser.id,
        username: dbUser.username
      });
    })
    .catch(err => {
      return done(err);
    });
});

passport.use(
  new localStrategy((username, password, done) => {
    username = username.toLowerCase();

    return User.query(qb => {
      qb.whereRaw(`LOWER(username) LIKE ?`, [username]);
    })
      .fetch()
      .then(user => {
        if (user === null) {
          return done(null, false);
        } else {
          user = user.toJSON({ visibility: false });
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);

app.use('/api', api);
app.use('/api/contacts', contactRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
