const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const saltRounds = 12;

const User = require('../../../database/models/User');

const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/users/:username/exists', (req, res) => {
  const username = req.params.username.toLowerCase();

  User.query(qb => {
    qb.whereRaw(`LOWER(username) LIKE ?`, [username]);
  })
    .fetch()
    .then(user => {
      if (!user) {
        return res.send(false);
      }

      return res.send(true);
    });
});

router.get('/profile', isAuthenticated, (req, res) => {
  const userId = req.user.id;

  User.where('id', userId)
    .fetch()
    .then(dbUser => {
      return res.json(dbUser);
    })
    .catch(err => {
      res.status(500);
      return res.json({
        success: false,
        error: err
      });
    });
});

router.put('/users', isAuthenticated, (req, res) => {
  const userId = req.user.id;
  const { username, name, email, address } = req.body;
  const editedUserReq = { username, name, email, address };

  User.where('id', userId)
    .fetch()
    .then(dbUser => {
      return dbUser.save(editedUserReq);
    })
    .then(resUser => {
      return res.json(resUser);
    })
    .catch(err => {
      res.status(500);
      return res.json({
        success: false,
        error: err
      });
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({
    username: req.body.username
  });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.json({
    success: true
  });
});

router.post('/register', (req, res) => {
  const newUser = req.body;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      res.status(500);
      return res.json({
        success: false,
        error: err
      });
    }

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        res.status(500);
        return res.json({
          success: false,
          error: err
        });
      }

      return new User({
        username: newUser.username,
        password: hash,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address
      })
        .save()
        .then(() => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          res.status(500);
          res.json({
            success: false,
            error: err
          });
        });
    });
  });
});

module.exports = router;
