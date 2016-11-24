
module.exports = function(router, db, apiToken, querystring) {

  router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
  });

  router.post('/login', function(req, res, next) {

    response = {
      email:req.body.email
    };
  console.log("LOGIN email=" + response.email);

     db.all("SELECT * FROM person WHERE email = ?", [response.email], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) { 
        var id = rows[0].id;
         console.log("real id="+id);
       req.session.userid = id;
        var user = apiToken.addUser(id);
        //var token = user.token;


        console.log("token =" + user.token);
        var token = user.token;
        console.log("test 1 token " + token);

     //   var token = req.query.token;
  //   var tokentest = querystring.stringify({token: token});
//console.log("my new test" + tokentest);
//res.render('login-redirect', {token: tokentest});
      console.log("json token " + token);
    // login successful. Send the reply.
    if (req.query.json) {
      res.send(JSON.stringify({token: token, id: id}));
    } else {
      res.render("account", {id: id});
    }
    //    res.render("account", {id: id, token: token});
    
       // console.log("req suqery" + usertoken);
     


      //  var token = logged_in(id);
       // res.send(JSON.stringify({token: token}));*/
    //   res.redirect('/news');
       // res.send("logged in");
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