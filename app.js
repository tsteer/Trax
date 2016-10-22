var express = require('express');

// libraries
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydbtest8.db');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// set up the main app object
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

var session = require('express-session');
app.use(session({secret:'imeTLH4ADXhj4cY6yld47z05', saveUninitialized: true, resave: true}));

// the main router we will be using
var router = express.Router();
app.use('/', router);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// place the routes here.
require('./routes/people')(router, db);
require('./routes/deleteuser')(router, db);
require('./routes/newuser')(router, db);
require('./routes/edituser')(router, db);
require('./routes/newclub')(router, db);
require('./routes/clubs')(router, db);
require('./routes/editclub')(router, db);
require('./routes/deleteclub')(router, db);
require('./routes/newsu')(router, db);
require('./routes/addcommittee')(router, db);
require('./routes/viewclub')(router, db);
require('./routes/login')(router, db);

db.run("CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, dob DATE, address TEXT, email EMAIL, telephone TEL, year NUMBER)");
db.run("CREATE TABLE IF NOT EXISTS club (club_id INTEGER PRIMARY KEY, club_name TEXT, sport TEXT, club_email EMAIL)");
db.run("CREATE TABLE IF NOT EXISTS students_union (su_id INTEGER PRIMARY KEY, su_name TEXT)");
db.run("CREATE TABLE IF NOT EXISTS join_club (membership_id INTEGER PRIMARY KEY, holder_id INTEGER REFERENCES person(id), club_holder_id INTEGER REFERENCES club(club_id), on_committee BOOLEAN, committee_role TEXT)");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
}); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

