module.exports = function(router, db){

  router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
  });

  router.post('/login', function(req, res, next) {
    console.log("post login - got " + req.body);

    response = {
      id:req.body.id
    };
    console.log("this one " + response.id);
     db.all("SELECT * FROM person WHERE id =?", [response.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) { 
        req.session.userid = response.id;
        req.session.save(function(err){
          console.log("saved");
        })
        console.log("logged in 1");
        res.send("logged in");
           console.log("logged in 2");
              console.log("logged in 3" + req.session.userid);
        console.log("logged in 4" + response.id);      
      }else{
        res.send("no rows");
      }
    });
  });
};