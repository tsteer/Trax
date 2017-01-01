var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydbtest1.db');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
module.exports = router;

require('./people')(router, db);
require('./deleteuser')(router, db);
require('./newuser')(router, db);
require('./edituser')(router, db);

db.run("CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, dob DATE, address TEXT, email EMAIL, telephone TEL, year NUMBER)");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
}); 
module.exports = router;