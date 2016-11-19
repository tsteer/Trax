module.exports = function(router, db, apiToken, querystring) {

  router.get("/people?:token", function(req, res) {

    var token = req.query.token;
    console.log("token=" + token);
    var valid = apiToken.isTokenValid(token);
    if (valid) {
      var user = apiToken.findUserByToken(token);
      console.log("Your token is valid and you are " + JSON.stringify(user));

 console.log("user" + user);
 console.log("username" + user.username);
 console.log("userid" + user.id);

      if(req.session.userid == user.username){
        db.all("select * from person where id = ?", [user.username], function(err, rows) {
          if (err) {
            console.log("error:" + err);
            res.send("error");
            return;
          }
          if (req.query.json) {
            if (rows.length > 0) { //token
              res.send(JSON.stringify({success: true, first_name: rows[0].first_name, last_name: rows[0].last_name, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year}));
            } else {
              res.send(JSON.stringify({success: false, error: "no rows"}));
            }
          } else {
            if (rows.length > 0) {
              res.render("people", {token: token, id: req.session.userid, first_name: rows[0].first_name, last_name: rows[0].last_name, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year});
            } else {
              res.send("no rows");
            }
          }
        });
      } else{
        res.send("Please log in!");
      };




       } else {
      res.end("This is not a valid token.");
    };



  });
};

