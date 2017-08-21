'use strict';
const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');
// const Contact = models.Contacts;

router.get('/', function(req, res, next){
  Contact.findAll()
  .then(function(contactsList){
    res.render('index', { contacts: contactsList });
    // res.json({contactsList});
  })
  .catch(next);
});

router.post('/', function (req, res, next){
  console.log(req.body);
  Contact.findOrCreate({
    where: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone
    }
  })
  .then(res.redirect('/'))
  .catch(console.error);
});

module.exports = router;
