module.exports = function(router, db, apiToken, querystring, security) {
  
  router.get('/login', function(req, res, next) {
    res.render('login');
  });

  router.post('/login', function(req, res, next) {
    response = {
      email:req.body.email,
      password:req.body.password
    };
    db.all("SELECT * FROM person WHERE email = ?", [response.email], function(err, rows) {
      if (err) { 
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) { /* check email is found on database */
        var pwhash = rows[0].password;
        var password = response.password;
        security.verify(pwhash, password, function(err, ok) {
          if (err) {
            res.send("error");
            return;
          } else {
            if (ok) { /* verify password */
              var id = rows[0].id;
              req.session.userid = id; /* current user's session saved */
              var user = apiToken.addUser(id);
              var token = user.token; /* mobile token generated */
              if (req.query.json) {
                res.send(JSON.stringify({success: true, token: token, id: id}));
              } else {
                res.render("account", {id: id});
              };
            } else {
              if (req.query.json) {
                res.send(JSON.stringify({success: false, error: "login"}));
              } else {
                res.render('login');
              };
            };
          };
        });
      }else{ /* no user found */
        if (req.query.json) {
          res.send(JSON.stringify({success: false, error: "login"}));
        } else {
          res.render('nouser');
        };
      };
    });
  });

  router.get('/newuser', function(req, res){
    res.render('newuser');
  });
};