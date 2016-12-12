module.exports = function(router, db, apiToken, querystring) {

  router.get('/newclub/:id', function(req, res, next) {
    res.render('newclub', {id: req.params.id});
  });

  router.post('/newclub/:id', function(req, res, next) {
    response = {
      club_name:req.body.club_name,
      sport:req.body.sport,
      club_email:req.body.club_email
    };
    var stmt = db.run("INSERT INTO club VALUES (NULL, ?, ?, ?)", [response.club_name, response.sport, response.club_email]);
    res.end(JSON.stringify({success: true, club_name: response.club_name, sport: response.sport, club_email: response.club_email}));
  });
};