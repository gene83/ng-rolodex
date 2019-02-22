const express = require('express');

const Contact = require('../../../../database/models/Contact');

const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/', isAuthenticated, (req, res) => {
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

router.get('/search/:term', isAuthenticated, (req, res) => {
  const searchTerm = req.params.term.toLowerCase();
  const userId = req.user.id;

  Contact.where('created_by', userId)
    .query(qb => {
      qb.whereRaw(`LOWER(name) LIKE ?`, [`%${searchTerm}%`])
        .orWhereRaw(`LOWER(address) LIKE ?`, [`%${searchTerm}%`])
        .orWhereRaw(`LOWER(mobile) LIKE ?`, [`%${searchTerm}%`])
        .orWhereRaw(`LOWER(work) LIKE ?`, [`%${searchTerm}%`])
        .orWhereRaw(`LOWER(twitter) LIKE ?`, [`%${searchTerm}%`])
        .orWhereRaw(`LOWER(instagram) LIKE ?`, [`%${searchTerm}%`])
        .orWhereRaw(`LOWER(github) LIKE ?`, [`%${searchTerm}%`]);
    })
    .fetchAll()
    .then(contacts => {
      return res.json(contacts);
    })
    .catch(err => {
      res.status(500);
      res.json({
        success: false,
        error: err
      });
    });
});

router.post('/', isAuthenticated, (req, res) => {
  const newContact = req.body;

  new Contact(newContact)
    .save()
    .then(dbContact => {
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

router.get('/:id', isAuthenticated, (req, res) => {
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

router.put('/:id', isAuthenticated, (req, res) => {
  const contactId = req.params.id;
  const {
    name,
    address,
    mobile,
    work,
    email,
    twitter,
    instagram,
    github
  } = req.body;
  const editedContact = {
    name,
    address,
    mobile,
    work,
    email,
    twitter,
    instagram,
    github
  };

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

router.delete('/:id', isAuthenticated, (req, res) => {
  const contactId = req.params.id;

  Contact.where('id', contactId)
    .destroy()
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

module.exports = router;
