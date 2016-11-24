module.exports = function(router, db, apiToken, querystring) {

  router.get("/edituser/:id", function(req, res, next) {
  /*  console.log("logged in 5" + req.session.userid);
    console.log("logged in 6" + req.params.id);  
    var token = req.query.token; 
    console.log("testing token here 1 " + req.query.token);
    var valid = apiToken.isTokenValid(token);
    if (valid) {
      var user = apiToken.findUserByToken(token);
      console.log("user is" + user.username); */
      if(req.session.userid == req.params.id){ 
        db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
          if (err) {
            console.log("error:" + err);
            res.send("error");
            return;
          }
          if (req.query.json) {      
            if (rows.length > 0) {
           //   var tokentest = querystring.stringify({token: token});
              res.send(JSON.stringify({success: true, first_name: rows[0].first_name, last_name: rows[0].last_name, id: rows[0].id, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year})); 
            } else{
              res.send(JSON.stringify({success: false, error: "no rows"}));
            }   
          } else {
            if (rows.length > 0) { 
           //   var tokentest = querystring.stringify({token: token});
            	res.render("edituser", {first_name: rows[0].first_name, last_name: rows[0].last_name, id: rows[0].id, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year}); 
            } else {
              res.send("no rows");
            }
          }  
        });
      } else{
        res.send("Please log in!");
      };
 /*   }else{
      res.end("This is not a valid token." + token);
    };  */
  });

  router.post("/edituser?:token", function(req, res, next) {
    response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      dob:req.body.dob,
      address:req.body.address,
      email:req.body.email,
      telephone:req.body.telephone,
      year:req.body.year
    };
    if(req.session.userid == req.params.id){
      db.run("UPDATE person SET first_name = ?, last_name = ?, dob = ?, address = ?, email = ?, telephone = ?, year = ? WHERE id = ?", [response.first_name, response.last_name, response.dob, response.address, response.email, response.telephone, response.year, req.params.id], function(err, result){   
        if (err) { 
          return next(err); 
        }
        res.send(JSON.stringify({success: true, first_name: response.first_name, last_name: response.last_name, dob: response.dob, address: response.address, email: response.email, telephone: response.telephone, year: response.year})); //dont need for app
      });
    }else{
      res.send("Please log in!");
    };  
  });
};

//testing: something that calls to make new person - then find max id (that is the new person) then call other functions 
//to edit delete etc and check that output is right - so to do this print error message if wrong.



