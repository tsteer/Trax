module.exports = function(router, db, apiToken, querystring) {
 
  router.get("/people/:id", function(req, res) {
    if (req.query.json) {
      var token = req.get('X-Auth-Token');
      var valid = apiToken.isTokenValid(token);
      if (valid) { /* check valid mobile request token */
        db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
          if (err) {
            console.log("error:" + err);
            res.send("error"); 
            return;
          }
          if (rows.length > 0) { 
            res.send(JSON.stringify({success: true, first_name: rows[0].first_name, last_name: rows[0].last_name, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year}));
          } else {
            res.send(JSON.stringify({success: false, error: "no rows"}));
          };
        });
      }else{
        res.send(JSON.stringify({success: false, error: "login"}));
      };
    }    
    else if(req.session.userid == req.params.id){ /* check valid web session */
      db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) {
          res.render("people", {id: req.session.userid, first_name: rows[0].first_name, last_name: rows[0].last_name, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year});
        } else {
          res.send("no rows");
        };
      });   
    } else{
      res.render('login');
    };
  }); 
};