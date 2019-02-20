const express = require('express');
const router = express.Router();
const User = require('../../../database/models/User');

router.get('/profile', (req, res) => {
  const userId = localStorage.getItem('user_id');

  User.where('id', userId)
    .fetch()
    .then(dbUser => {
      return res.JSON(dbUser);
    })
    .catch(err => {
      res.json({
        success: false,
        error: err
      });
    });
});

router.put('/users', (req, res) => {
  const userId = localStorage.getItem('user_id');
  const editedUser = req.body;

  User.where('id', userId)
    .fetch()
    .then(dbUser => {
      dbUser
        .save(editedUser)
        .then(() => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          res.json({
            success: false,
            error: err
          });
        });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err
      });
    });
});

router.post('/login', (req, res) => {
  const username = req.body.username;

  User.fetch()
    .where('username', username)
    .then(dbUser => {
      if (dbUser === null) {
        return res.json({
          success: false,
          error: `User ${username} does not exist.`
        });
      }

      localStorage.setItem('user_id', dbUser.id);
      return res.json({
        success: true
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        err: err
      });
    });
});

router.post('/logout', (req, res) => {
  localStorage.removeItem('user_id');
  res.redirect('/');
});

router.post('/register', (req, res) => {
  const newUser = req.body;

  new User(newUser)
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      res.json({
        success: false,
        error: err
      });
    });
});
module.exports = router;
