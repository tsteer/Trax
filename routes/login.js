
module.exports = function(router, db, apiToken, querystring, security) {

  router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
  });

  router.post('/login', function(req, res, next) {

    response = {
      email:req.body.email,
      password:req.body.password
    };
     db.all("SELECT * FROM person WHERE email = ?", [response.email], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error 1");
        return;
      }
      if (rows.length > 0) { 

        var pwhash = rows[0].password;
        var password = response.password;
        security.verify(pwhash, password, function(err, ok) {
          if (err) {
            console.log("error:" + err);
            res.send("error 2");
            return;
          } else {
            if (ok) {
              var id = rows[0].id;
              req.session.userid = id;
              var user = apiToken.addUser(id);
              //var token = user.token; 
              console.log("session id" + req.session.userid);
              var token = user.token;
              res.render("account", {id: id});
            } else {
              res.render('login');
            }
          }
        });
  /*  if (req.query.json) {
      res.send(JSON.stringify({token: token, id: id}));
    } else {
      res.render("account", {id: id});
    }
*/
      }else{
        res.send("no rows");
      }
    });
  });

router.get('/newuser', function(req, res){
  res.render('newuser');
});
  /*
          function logged_in(id) {
          var token = crypto.randomBytes(64).toString('base64');
          sessions[token] = {id: id};
          console.log("token: " + token);
          return token;
        } ; */
};