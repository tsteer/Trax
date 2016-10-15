module.exports = function(router, db){

  router.get('/newclub', function(req, res, next) {
    res.render('newclub', { title: 'Express' });
  });

  router.post('/newclub', function(req, res, next) {
    response = {
      club_name:req.body.club_name,
      sport:req.body.sport,
      club_email:req.body.club_email
    };
    var stmt = db.run("INSERT INTO club VALUES (NULL, ?, ?, ?)", [response.club_name, response.sport, response.club_email]);
    console.log(response);
    res.end(JSON.stringify(response));
  });
};