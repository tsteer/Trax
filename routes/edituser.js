module.exports = function(router, db) {

  router.get("/edituser/:id", function(req, res, next) {
    db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (req.query.json) {      
        if (rows.length > 0) {
          res.send(JSON.stringify({success: true, first_name: rows[0].first_name, last_name: rows[0].last_name, id: rows[0].id, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year})); 
        } else{
          res.send(JSON.stringify({success: false, error: "no rows"}));
        }   
      } else {
        if (rows.length > 0) { 
        	res.render("edituser", {first_name: rows[0].first_name, last_name: rows[0].last_name, id: rows[0].id, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year}); 
        } else {
          res.send("no rows");
        }
      }  
    });
  });

  router.post("/edituser/:id", function(req, res, next) {
    response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      dob:req.body.dob,
      address:req.body.address,
      email:req.body.email,
      telephone:req.body.telephone,
      year:req.body.year
    };
    db.run("UPDATE person SET first_name = ?, last_name = ?, dob = ?, address = ?, email = ?, telephone = ?, year = ? WHERE id = ?", [response.first_name, response.last_name, response.dob, response.address, response.email, response.telephone, response.year, req.params.id], function(err, result){   
      if (err) { 
        return next(err); 
      }
      res.send(JSON.stringify({success: true, first_name: response.first_name, last_name: response.last_name, dob: response.dob, address: response.address, email: response.email, telephone: response.telephone, year: response.year}));
    });
  });
};



