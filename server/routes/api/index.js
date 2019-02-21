const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const saltRounds = 12;

const User = require('../../../database/models/User');
const Contact = require('../../../database/models/Contact');

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

router.get('/contacts', isAuthenticated, (req, res) => {
  const userId = req.user.id;

  Contact.where('created_by', userId)
    .fetchAll({ withRelated: ['users'] })
    .then(contacts => {
      return res.json(contacts);
    })
    .catch(err => {
      res.status(500);
      return res.json({
        success: false,
        err: err
      });
    });
});

router.get('/contacts/search/:term', isAuthenticated, (req, res) => {
  const searchTerm = req.params.term;
  const userId = req.user.id;

  Contact.where('created_by', userId)
    .fetchAll({ withRelated: ['users'] })
    .then(contacts => {
      if (contacts === null) {
        return res.json({});
      }

      contacts = contacts.toJSON();

      const filteredContacts = contacts.filter(contact => {
        const contactValues = Object.values(contact);

        return contactValues.some(value => {
          value.includes(searchTerm);
        });
      });

      return res.json(filteredContacts);
    })
    .catch(err => {
      res.status(500);
      res.json({
        success: false,
        error: err
      });
    });
});

router.post('/contacts', isAuthenticated, (req, res) => {
  const newContact = req.body;

  new Contact(newContact)
    .save()
    .then(dbContact => {
      delete dbContact.id;

      return res.json(dbContact);
    })
    .catch(err => {
      res.status(500);
      return res.json({
        success: false,
        error: err
      });
    });
});

router.get('/contacts/:id', isAuthenticated, (req, res) => {
  const contactId = req.params.id;

  Contact.where('id', contactId)
    .fetch({ withRelated: ['users'] })
    .then(contact => {
      if (contact === null) {
        return res.json({
          success: false
        });
      }

      return res.json(contact);
    })
    .catch(err => {
      res.status(500);
      res.json({
        success: false,
        error: err
      });
    });
});

router.put('/contacts/:id', isAuthenticated, (req, res) => {
  const contactId = req.params.id;
  const editedContact = req.body;

  Contact.where('id', contactId)
    .fetch({ withRelated: ['users'] })
    .then(dbContact => {
      if (dbContact === null) {
        return res.json({
          success: false
        });
      }

      dbContact
        .save(editedContact)
        .then(resContact => {
          res.json(resContact);
        })
        .catch(err => {
          res.status(500);
          res.json({
            success: false,
            error: err
          });
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

router.delete('/contacts/:id', isAuthenticated, (req, res) => {
  const contactId = req.params.id;

  Contact.where('id', contactId)
    .destroy()
    .then(() => {
      res.status(200);
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

module.exports = router;
