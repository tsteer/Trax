module.exports = function(router, db, apiToken, querystring, security) {

  router.get('/newuser', function(req, res, next) {
    res.render('newuser', { title: 'Express' });
  });

  router.post('/newuser', function(req, res, next) {
    response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      dob:req.body.dob,
      address:req.body.address,
      email:req.body.email,
      telephone:req.body.telephone,
      year:req.body.year,
      password:req.body.password
    };
    if(response.password === "" || response.email === ""){  /*check password and email valid */
      res.render('notvalid');
    }else{  
      db.all("select * from person where email = ?", [response.email], function(err, rows) {
        if (err) { /* check email not currently in use */
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if(rows.length > 0){
          res.render('notvalid');
        }
        else{
          security.hash(response.password, function(err, pwhash) {
            if (err) { /* hash password */
              return next(err); 
            } else {
              var stmt = db.run("INSERT INTO person VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)", [response.first_name, response.last_name, response.dob, response.address, response.email, response.telephone, response.year, pwhash], function(err, result){   
                if (err) { /* add new user to database */
                  return next(err);
                }else{
                  res.render('accountcreated');
                };
              });
            };    
          }); 
        };
      });    
    };
  });
}; 