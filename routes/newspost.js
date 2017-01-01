module.exports = function(router, db, apiToken, querystring) {

  router.get('/newsfeed/:id/:club_id/newspost', function(req, res, next) {
    res.render('newspost', {id: req.params.id, club_id: req.params.club_id});
  });

  router.post('/newsfeed/:id/:club_id/newspost', function(req, res, next) {
    response = {
      post_text:req.body.post_text
    };
    var date_now = new Date();
    var stmt = db.run("INSERT INTO newspost VALUES (NULL, ?, ?, ?, ?)", [response.post_text, req.params.club_id, req.params.id, date_now], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }else{
        res.render('postadded', {id: req.params.id, club_id: req.params.club_id});
      };
    }); 
  });  

  router.get('/newsfeed/:id/:club_id/postadded', function(req, res, next) {
    res.render('postadded', {id: req.params.id, club_id: req.params.club_id});
  });
};