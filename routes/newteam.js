module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/newteam', function(req, res, next) {
    res.render('newteam', {id: req.params.id, club_id: req.params.club_id});
  });

  router.post('/committee/:id/:club_id/newteam', function(req, res, next) {
    response = {
      team_name:req.body.team_name
    };
    var stmt = db.run("INSERT INTO team VALUES (NULL, ?, ?)", [response.team_name, req.params.club_id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error 1");
        return;
      }else{
          console.log("testing " + this.lastID);
          var stmt = db.run("INSERT INTO join_team VALUES (NULL, ?, ?, ?) ", [this.lastID, req.params.id, 'TRUE'], function(err, result){ 
          if (err) {
            console.log("error:" + err);
            res.send("error2");
            return;
          }else{
            res.render('teamadded', {id: req.params.id, club_id: req.params.club_id});
          };
        }); 
           // var stmt = db.run("INSERT INTO join_club (membership_id, holder_id, club_holder_id, on_committee) VALUES (NULL, ?, ?, ?)", [req.params.id, club_id, 'TRUE'], function(err, result){ 
      };
    //res.end(JSON.stringify({success: true, club_name: response.club_name, sport: response.sport, club_email: response.club_email}));
    });
  });  

    router.get('/committee/:id/:club_id/teamadded', function(req, res, next) {
    res.render('teamadded', {id: req.params.id, club_id: req.params.club_id});
  });

};