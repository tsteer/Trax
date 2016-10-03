/*
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydbtest1.db');
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })	
module.exports = router;
*/

/*
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM person" WHERE first_name = ?", ["test1"], function(err, rows) {
    var people = "";
    rows.forEach(function(row) {
      console.log("Found a person: people" + row.first_name + " " + row.last_name);
      people += row.first_name + " " + row.last_name + ", ";
    });
    res.render('people', {
      title: 'Express',
      people: people
    });
  });
});
*/

module.exports = function(router, db) {


router.get("/people/:id", function(req, res) {
  db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
    if (err) {
      console.log("error:" + err);
      res.send("error");
      return;
    }
    if (rows.length > 0) {
    	res.render("example", {first_name: rows[0].first_name, last_name: rows[0].last_name});
      //res.send("<h1>Person:</h1>person: " + rows[0].first_name);   
    } else {
      res.send("no rows");
    }
  });
});

};

//module.exports = ;
