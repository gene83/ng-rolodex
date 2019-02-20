const express = require('express');
const router = express.Router();
const User = require('../../../database/models/User');
const Contact = require('../../../database/models/Contact');

router.get('/profile', (req, res) => {
  const userId = localStorage.getItem('user_id');

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

router.put('/users', (req, res) => {
  const userId = localStorage.getItem('user_id');
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

router.post('/login', (req, res) => {
  const username = req.body.username;

  User.where('username', username)
    .fetch()
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
      res.status(500);
      return res.json({
        success: false,
        err: err
      });
    });
});

router.post('/logout', (req, res) => {
  localStorage.removeItem('user_id');
  return res.redirect('/');
});

router.post('/register', (req, res) => {
  const newUser = req.body;

  new User(newUser)
    .save()
    .then(() => {
      return res.redirect('/');
    })
    .catch(err => {
      res.status(500);
      return res.json({
        success: false,
        error: err
      });
    });
});

router.get('/contacts', (req, res) => {
  const userId = localStorage.getItem('user_id');

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

router.get('/contacts/search/:term', (req, res) => {
  const searchTerm = req.params.term;
  const userId = localStorage.getItem('user_id');

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

router.post('/contacts', (req, res) => {
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

router.get('/contacts/:id', (req, res) => {
  const id = req.params.id;

  Contact.where('id', id)
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

router.put('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const editedContact = req.body;

  Contact.where('id', id)
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

router.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;

  Contact.where('id', id)
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
