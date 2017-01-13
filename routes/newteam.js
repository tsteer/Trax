module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/newteam', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      res.render('newteam', {id: req.params.id, club_id: req.params.club_id});
    }else{
      res.render('login');
    };
  });

  router.post('/committee/:id/:club_id/newteam', function(req, res, next) {
    response = {
      team_name:req.body.team_name
    };
    if(req.session.userid == req.params.id){ 
      var stmt = db.run("INSERT INTO team VALUES (NULL, ?, ?)", [response.team_name, req.params.club_id], function(err, rows) {
        if (err) { /* create new team */
          console.log("error:" + err);
          res.send("error");
          return;
        }else{
          var stmt = db.run("INSERT INTO join_team VALUES (NULL, ?, ?, ?) ", [this.lastID, req.params.id, 'TRUE'], function(err, result){ 
            if (err) { /* add user to team just created */
              console.log("error:" + err);
              res.send("error");
              return;
            }else{
              res.render('teamadded', {id: req.params.id, club_id: req.params.club_id});
            };
          }); 
        };
      });
    }else{
      res.render('login');
    };
  });  

  router.get('/committee/:id/:club_id/teamadded', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      res.render('teamadded', {id: req.params.id, club_id: req.params.club_id});
    }else{
      res.render('login');
    };
  });
};