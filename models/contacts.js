'use strict';

var Sequelize = require('sequelize');
var db = require('./db');

const Contact = db.define('Contact', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get: function(){
      return this.firstName + ' ' + this.lastName;
    }
  }
});

Contact.prototype.add = function(obj){
  return Contact.create({
    firstName: obj.firstName,
    lastName: obj.lastName,
    phone: obj.phone,
    email: obj.email
  });
};

module.exports = Contact;
