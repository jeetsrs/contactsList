var db = require('./models/db');
var Contact = require('./models/contacts');

let data = {
    firstName: 'Ranjeet',
    lastName: 'Sodhi',
    phone: '+1 (917) 238-0842',
    email: 'ranjeet@sodhi.org'
};

db
  .sync({force: true})
  .then(function(){
    console.log('Dropping database, and re-seeding');
  })
  .then(function(){
    return Contact.create(data);
  })
  .catch(function(err){
    console.error(err);
  })
  .finally(function(){
    db.close();
    console.log('connection closed');
    return null;
  });
