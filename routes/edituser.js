module.exports = function(router, db) {


router.get("/edituser/:id", function(req, res, next) {
  db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
    if (err) {
      console.log("error:" + err);
      res.send("error");
      return;
    }
    if (rows.length > 0) {
    	res.render("example", {first_name: rows[0].first_name, last_name: rows[0].last_name}); 
    } else {
      res.send("no rows");
    }
  });
  next();
});


/*
router.post("/edituser/:id", function(req, res, next) {
  var id = req.body.id;
  response = {
    first_name:req.body.first_name,
  };
  db.run("UPDATE person SET first_name = ? WHERE id = ?", [response.first_name, req.params.id], function(err, result){   
    console.log("1");
  });
  console.log(response);
  console.log("this bit working");
}); */
/*
router.post("/edituser2/:id", function(req, res, next) {
response = {
    first_name:req.body.first_name,
  };
//var first_name = req.body.first_name;
console.log("test this" + response.first_name);
  db.run("UPDATE person SET first_name = ? WHERE id = ?", [response.first_name, req.params.id], function(err, result){   
    console.log("1");
  });
  console.log("2");



});
*/
};



