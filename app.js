'use strict';

const express = require('express');
const app = express();

const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes');
const db = require('./models/db');

const env = nunjucks.configure('views', {
  noCache: true
});
// have res.render work with html files
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(volleyball);

// body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

db
.sync()
.then(function(){
  app.listen(3000, function(){
    console.log('listening on port 3000');
  });
})
.catch(console.error);

// app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes);

// Error handling - express NEEDS all 4 parameters else it won't know this is an error handler middleware
app.use(function (err, req, res, next){
  console.error(err);
  res.status(500).send(err.message);
});
