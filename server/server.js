const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const redis = require('connect-redis')(session);

const api = require('./routes/api');

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
  user
    .where('id', user.id)
    .fetch()
    .then(dbUser => {
      dbUser = dbUser.toJSON();
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
    return User.where('username', username)
      .fetch(user => {
        if (user === null) {
          return done(null, false);
        }

        user = user.toJSON();
        bcrypt.compare(password, user.password).then(res => {
          if (res) {
            return done(null, user);
          }

          return done(null, false);
        });
      })
      .catch(err => {
        return done(err);
      });
  })
);

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
