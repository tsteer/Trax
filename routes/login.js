module.exports = function(router, db){

  router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
  });

  router.post('/login', function(req, res, next) {
    response = {
      id:req.body.id
    };
     db.all("SELECT * FROM person WHERE id =?", [response.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) { 
        req.session.userid = response.id;
        //req.session.save();
        console.log(response.id);
        console.log("watch this 1 " + req.session.userid); 
        console.log("watch this" + req.session); 
        res.send("logged in");
      }else{
        res.send("no rows");
      }
    });
  });
};