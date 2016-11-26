module.exports = function(router, db, apiToken, querystring) {

  router.get("/people/:id", function(req, res) {

  /*  var token = req.query.token;
   console.log("token=" + token);
    var valid = apiToken.isTokenValid(token);
    if (valid) {
      var user = apiToken.findUserByToken(token);
      console.log("Your token is valid and you are " + JSON.stringify(user));
      console.log("username" + user.username);
*/   
console.log(req.session.userid);
console.log(req.params.id);
     if(req.session.userid == req.params.id){ 



        db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
          if (err) {
            console.log("error:" + err);
            res.send("error");
            return;
          }
          if (req.query.json) {
//console.log("check this" + XMLHttpRequest.getAllResponseHeaders());
            if (rows.length > 0) { //token
          //    var tokentest = querystring.stringify({token: token});
              res.send(JSON.stringify({success: true, first_name: rows[0].first_name, last_name: rows[0].last_name, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year}));
            } else {
              res.send(JSON.stringify({success: false, error: "no rows"}));
            }
          } else {
        //    console.log("check this" + XMLHttpRequest.getAllResponseHeaders());
            if (rows.length > 0) {
         //     var tokentest = querystring.stringify({token: token});
              res.render("people", {id: req.session.userid, first_name: rows[0].first_name, last_name: rows[0].last_name, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year});
            } else {
              res.send("no rows");
            }
          }
        });
      } else{
        res.send("Please log in!");
      };


/*

       } else {
      res.end("This is not a valid token.");
    };

*/

  });
};

