module.exports = function(router, db, apiToken, querystring) {

  router.get('/newsfeed/:id/:club_id/newspost', function(req, res, next) {
    console.log("1");
    res.render('newspost', {id: req.params.id, club_id: req.params.club_id});
  });

  router.post('/newsfeed/:id/:club_id/newspost', function(req, res, next) {
    response = {
      post_text:req.body.post_text
    };
    var date_now = new Date();
    console.log("asfddsaf " + date_now);
    console.log("2");
    var stmt = db.run("INSERT INTO newspost VALUES (NULL, ?, ?, ?, ?)", [response.post_text, req.params.club_id, req.params.id, date_now], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }else{
        console.log("3");
        res.render('postadded', {id: req.params.id, club_id: req.params.club_id});
      };
    }); 
          // var stmt = db.run("INSERT INTO join_club (membership_id, holder_id, club_holder_id, on_committee) VALUES (NULL, ?, ?, ?)", [req.params.id, club_id, 'TRUE'], function(err, result){ 
    //res.end(JSON.stringify({success: true, club_name: response.club_name, sport: response.sport, club_email: response.club_email}));
  });  

    router.get('/newsfeed/:id/:club_id/postadded', function(req, res, next) {
      console.log("4");
    res.render('postadded', {id: req.params.id, club_id: req.params.club_id});
  });

};