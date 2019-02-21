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

router.get('/profile', isAuthenticated, (req, res) => {
  const userId = req.user.id;

  User.where('id', userId)
    .fetch()
    .then(dbUser => {
      return res.JSON(dbUser);
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
  const editedUser = req.body;

  User.where('id', userId)
    .fetch()
    .then(dbUser => {
      dbUser
        .save(editedUser)
        .then(resUser => {
          delete resUser.id;

          return res.json(resUser);
        })
        .catch(err => {
          res.status(500);
          return res.json({
            success: false,
            error: err
          });
        });
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
    success: true
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
