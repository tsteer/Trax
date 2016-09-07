var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })

db.run("CREATE TABLE IF NOT EXISTS person (first_name TEXT, last_name TEXT)");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  response = {
    first_name:req.query.first_name,
    last_name:req.query.last_name
  };

  var stmt = db.run("INSERT INTO person VALUES (?, ?)", [response.first_name, response.last_name]);
  
  console.log(response);
  res.end(JSON.stringify(response));
});

router.get('/', function(req, res, next) {

  /*var stmt = */ db.prepare("SELECT * FROM person");
  console.log(stmt);
});

/*
db.serialize(function() {
  db.run("CREATE TABLE if not exists user_info (first_name TEXT, last_name TEXT)");
});

router.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   var stmt = db.run("INSERT INTO user_info VALUES (?, ?)", [response.first_name, response.last_name]);
  //  stmt.finalize();
   //  var stmt = db.prepare("INSERT INTO user_info VALUES (?)");

   db.each("SELECT rowid AS first_name, last_name FROM user_info", function(err, row) {
      console.log(" "+ row.first_name + ": " + row.last_name);
  });

   console.log(response);
   res.end(JSON.stringify(response));
})


router.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
}) 
*/
module.exports = router;

