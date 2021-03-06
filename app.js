var express = require('express');

// libraries
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydbtest21.db');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var sessions = {};
var apiToken = require('api-token');
apiToken.setExpirationTime(5);
const querystring = require('querystring');
var credential = require('credential');
var security = credential();

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
require('./routes/people')(router, db, apiToken, querystring);
require('./routes/deleteuser')(router, apiToken, querystring);
require('./routes/newuser')(router, db, apiToken, querystring, security);
require('./routes/edituser')(router, db, apiToken, querystring);
require('./routes/newclub')(router, db, apiToken, querystring);
require('./routes/clubs')(router, db, apiToken, querystring);
require('./routes/editclub')(router, db, apiToken, querystring);
require('./routes/deleteclub')(router, db, apiToken, querystring);
require('./routes/newsu')(router, db, apiToken, querystring);
require('./routes/addcommittee')(router, db, apiToken, querystring);
require('./routes/viewclub')(router, db, apiToken, querystring);
require('./routes/login')(router, db, apiToken, querystring, security);
require('./routes/account')(router, db, apiToken, querystring);
require('./routes/userdeleted')(router, db, apiToken, querystring);
require('./routes/liftsharing')(router, db, apiToken, querystring);
require('./routes/joinclub')(router, db, apiToken, querystring);
require('./routes/addlift')(router, db, apiToken, querystring);
require('./routes/lifts')(router, db, apiToken, querystring);
require('./routes/liftadded')(router, db, apiToken, querystring);
require('./routes/mylifts')(router, db, apiToken, querystring);
require('./routes/editlift')(router, db, apiToken, querystring);
require('./routes/deletelift')(router, db, apiToken, querystring);
require('./routes/liftdeleted')(router, db, apiToken, querystring);
require('./routes/reservelift')(router, db, apiToken, querystring);
require('./routes/liftreserved')(router, db, apiToken, querystring);
require('./routes/cancellift')(router, db, apiToken, querystring);
require('./routes/liftcancelled')(router, db, apiToken, querystring);
require('./routes/clubadded')(router, db, apiToken, querystring);
require('./routes/clubedited')(router, db, apiToken, querystring);
require('./routes/clubdeleted')(router, db, apiToken, querystring);
require('./routes/committeerole')(router, db, apiToken, querystring);
require('./routes/removecommittee')(router, db, apiToken, querystring);
require('./routes/committeeremoved')(router, db, apiToken, querystring);
require('./routes/committee')(router, db, apiToken, querystring);
require('./routes/statistics')(router, db, apiToken, querystring);
require('./routes/teams')(router, db, apiToken, querystring);
require('./routes/newteam')(router, db, apiToken, querystring);
require('./routes/teamadded')(router, db, apiToken, querystring);
require('./routes/addteammembers')(router, db, apiToken, querystring);
require('./routes/teamlist')(router, db, apiToken, querystring);
require('./routes/teammembersadded')(router, db, apiToken, querystring);
require('./routes/deleteteammembers')(router, db, apiToken, querystring);
require('./routes/teammembersdeleted')(router, db, apiToken, querystring);
require('./routes/deleteteam')(router, db, apiToken, querystring);
require('./routes/teamdeleted')(router, db, apiToken, querystring);
require('./routes/addevent')(router, db, apiToken, querystring);
require('./routes/eventadded')(router, db, apiToken, querystring);
require('./routes/eventlocationadded')(router, db, apiToken, querystring);
require('./routes/addeventlocation')(router, db, apiToken, querystring);
require('./routes/eventdetails')(router, db, apiToken, querystring);
require('./routes/addeventmembers')(router, db, apiToken, querystring);
require('./routes/eventmembersadded')(router, db, apiToken, querystring);
require('./routes/newsfeed')(router, db, apiToken, querystring);
require('./routes/newspost')(router, db, apiToken, querystring);
require('./routes/postadded')(router, db, apiToken, querystring);
require('./routes/editpost')(router, db, apiToken, querystring);
require('./routes/postedited')(router, db, apiToken, querystring);
require('./routes/deletepost')(router, db, apiToken, querystring);
require('./routes/postdeleted')(router, db, apiToken, querystring);
require('./routes/attendancestatistics')(router, db, apiToken, querystring);
require('./routes/roomstatistics')(router, db, apiToken, querystring);
require('./routes/noevents')(router, db, apiToken, querystring);
require('./routes/noroute')(router, db, apiToken, querystring);
require('./routes/noclubs')(router, db, apiToken, querystring);
require('./routes/nouser')(router, db, apiToken, querystring);
require('./routes/noseats')(router, db, apiToken, querystring);
require('./routes/eventnolocation')(router, db, apiToken, querystring);
require('./routes/useredited')(router, db, apiToken, querystring);
require('./routes/logout')(router, db, apiToken, querystring);
require('./routes/noeditpost')(router, db, apiToken, querystring);

db.run("CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, dob DATE, address TEXT, email EMAIL NOT NULL UNIQUE, telephone TEL, year NUMBER, password TEXT NOT NULL)");
db.run("CREATE TABLE IF NOT EXISTS club (club_id INTEGER PRIMARY KEY, club_name TEXT NOT NULL, sport TEXT NOT NULL, club_email EMAIL NOT NULL UNIQUE)");
db.run("CREATE TABLE IF NOT EXISTS students_union (su_id INTEGER PRIMARY KEY, su_name TEXT NOT NULL)");
db.run("CREATE TABLE IF NOT EXISTS join_club (membership_id INTEGER PRIMARY KEY, holder_id INTEGER REFERENCES person(id), club_holder_id INTEGER REFERENCES club(club_id), on_committee BOOLEAN, committee_role TEXT)");
db.run("CREATE TABLE IF NOT EXISTS route (route_id INTEGER PRIMARY KEY, driver_id INTEGER REFERENCES join_club(holder_id), return_trip BOOLEAN, seats INTEGER, pick_up_location TEXT, pick_up_time TIME, pick_up_date DATE, drop_off_location TEXT, drop_off_time TIME, drop_off_date DATE)");
db.run("CREATE TABLE IF NOT EXISTS seats (seats_id INTEGER PRIMARY KEY, membership_id INTEGER REFERENCES person(id), route_id INTEGER REFERENCES route(id))");
db.run("CREATE TABLE IF NOT EXISTS team (team_id INTEGER PRIMARY KEY, team_name TEXT NOT NULL, team_club_id INTEGER NOT NULL REFERENCES club(club_id))");
db.run("CREATE TABLE IF NOT EXISTS join_team (join_team_id INTEGER PRIMARY KEY, team_id INTEGER NOT NULL REFERENCES team(team_id), holder_id INTEGER NOT NULL REFERENCES join_club(holder_id), team_captain BOOLEAN)");
db.run("CREATE TABLE IF NOT EXISTS event (event_id INTEGER PRIMARY KEY AUTOINCREMENT, team_id INTEGER NOT NULL REFERENCES team(team_id), event_date DATE, event_start_time TIME, event_end_time TIME, location_id INTEGER NOT NULL REFERENCES event_location(location_id))");
db.run("CREATE TABLE IF NOT EXISTS join_event (join_event_id INTEGER PRIMARY KEY, holder_id INTEGER NOT NULL REFERENCES person(id), event_id INTEGER NOT NULL REFERENCES event(event_id), team_id INTEGER NOT NULL REFERENCES team(team_id), present BOOLEAN)");
db.run("CREATE TABLE IF NOT EXISTS event_location (location_id INTEGER PRIMARY KEY, location_name TEXT NOT NULL, club_id INTEGER NOT NULL REFERENCES club(club_id))");
db.run("CREATE TABLE IF NOT EXISTS newsfeed (newsfeed_id INTEGER PRIMARY KEY, club_holder_id INTEGER REFERENCES club(club_id))");
db.run("CREATE TABLE IF NOT EXISTS newspost (post_id INTEGER PRIMARY KEY, post_text TEXT, newsfeed INTEGER REFERENCES newsfeed(club_holder_id), holder_id INTEGER NOT NULL REFERENCES person(id), date DATE)");

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

