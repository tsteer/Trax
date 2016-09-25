var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydbtest.db');
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })

db.run("CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT)");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM person", function(err, rows) {
    var people = "";
    rows.forEach(function(row) {
      console.log("Found a person: " + row.first_name + " " + row.last_name);
      people += row.first_name + " " + row.last_name + ", ";
    });
    res.render('index', {
      title: 'Express',
      people: people
    });
  });
});
/*
  res.render('index', { title: 'Express',

   //    people: [ {name: "David"}, {name: "Tasmin"}]
   people:  db.run("SELECT * FROM person", function(err, row) {
     

      row = {
    first_name:req.query.first_name,
    last_name:req.query.last_name

    //first_name:req.body.first_name,
    //last_name:req.body.last_name
  };
      console.log('Correct');  
     console.log(row);
      console.log("this" + row);

})
   }); 
*/

router.post('/', function(req, res, next){
    response = {
    //first_name:req.query.first_name,
    //last_name:req.query.last_name
    first_name:req.body.first_name,
    last_name:req.body.last_name
  };
  var id = req.body.id;
  console.log("test1");
  db.run("UPDATE Person SET first_name = ? WHERE id = ?", [response.first_name, 1], function(err, result){   
  });
  console.log("test2");
  res.render('index', {
    title: 'Express' 
  });
});   
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
    people: [ {name: "David"}, {name: "Tasmin"}]
   });
}); */

router.post('/', function(req, res, next) {
  response = {
    //first_name:req.query.first_name,
    //last_name:req.query.last_name
    first_name:req.body.first_name,
    last_name:req.body.last_name
  };
  var stmt = db.run("INSERT INTO person VALUES (NULL, ?, ?)", [response.first_name, response.last_name]);
  //console.log(response);
  //res.end(JSON.stringify(response));
});
/*
router.get('/', function(req, res, next) {
  /*var stmt =  db.prepare("SELECT * FROM person");
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

