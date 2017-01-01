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
        res.send("error");
        return;
      }else{
        var stmt = db.run("INSERT INTO join_team VALUES (NULL, ?, ?, ?) ", [this.lastID, req.params.id, 'TRUE'], function(err, result){ 
          if (err) {
            console.log("error:" + err);
            res.send("error");
            return;
          }else{
            res.render('teamadded', {id: req.params.id, club_id: req.params.club_id});
          };
        }); 
      };
    });
  });  

  router.get('/committee/:id/:club_id/teamadded', function(req, res, next) {
    res.render('teamadded', {id: req.params.id, club_id: req.params.club_id});
  });
};