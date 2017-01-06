module.exports = function(router, db, apiToken, querystring) {

 router.get("/edituser/:id", function(req, res, next) {
    if (req.query.json) {
      var token = req.get('X-Auth-Token');
      var valid = apiToken.isTokenValid(token);
      if (valid) {
        db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
          if (err) {
            console.log("error:" + err);
            res.send("error");
            return;
          }    
          if (rows.length > 0) {
            res.send(JSON.stringify({success: true, first_name: rows[0].first_name, last_name: rows[0].last_name, id: rows[0].id, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year})); 
          } else{
            res.send(JSON.stringify({success: false, error: "no rows"}));
          };
        });  
      }else{
        res.send(JSON.stringify({success: false, error: "login"}));
      }; 
    }
    else if(req.session.userid == req.params.id){    
      db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }  
        if (rows.length > 0) { 
          res.render("edituser", {first_name: rows[0].first_name, last_name: rows[0].last_name, id: rows[0].id, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year}); 
        } else {
          res.send("no rows");
        };  
      });
    } else{
      res.send("Please log in!");
    };
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
    console.log("1");
    if (req.query.json) {
      console.log("2");
      var token = req.get('X-Auth-Token');
      var valid = apiToken.isTokenValid(token);
      if (valid) {
        console.log("3");
      //  db.run("UPDATE person SET first_name = ?, last_name = ?, dob = ?, address = ?, email = ?, telephone = ?, year = ? WHERE id = ?", [response.first_name, response.last_name, response.dob, response.address, response.email, response.telephone, response.year, req.params.id], function(err, result){ 
 db.run("UPDATE person SET first_name = ?, last_name = ? WHERE id = ?", [response.first_name, response.last_name, req.params.id], function(err, result){ 
          if (err) { 
            res.send("error");
            return;
          }else{
            console.log("4");
            res.send(JSON.stringify({success: true, first_name: response.first_name, last_name: response.last_name, dob: response.dob, address: response.address, email: response.email, telephone: response.telephone, year: response.year})); //dont need for app
          }; 
        });
      }else{
        res.send(JSON.stringify({success: false, error: "login"}));
      };  
    }  
    else if(req.session.userid == req.params.id){
      console.log("1");
      db.run("UPDATE person SET first_name = ?, last_name = ?, dob = ?, address = ?, email = ?, telephone = ?, year = ? WHERE id = ?", [response.first_name, response.last_name, response.dob, response.address, response.email, response.telephone, response.year, req.params.id], function(err, result){   
        if (err) { 
          res.send("error");
          return next(err); 
        }else{  
          res.render("useredited", {id: req.params.id}); 
        };
      });
    }else{
      res.send("Please log in!");
    }; 
  });
};