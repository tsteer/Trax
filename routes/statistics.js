module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.all("select * from team where team_club_id = ?", [req.params.club_id], function(err, rows) {
        if (err) { /* select all teams in club */
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) { 
          var teams = [];
          var team = {};
          rows.forEach(function(row){ /* store team data as an object, add object to array */
            team = {team_id: row.team_id, team_name: row.team_name, team_club_id: row.team_club_id};
            teams.push(team);
          });
          if (req.query.json) { /* must be updated for further mobile development - mobile token must be validated in order to complete this request */
            res.send(JSON.stringify({success: true, team: team, teams: teams}));
          } else{
            res.render('statistics', {id: req.params.id, club_id: req.params.club_id, teams: teams});
          };       
        } else {
          if (req.query.json) { /* must be updated for further mobile development - mobile token must be validated in order to complete this request */
            res.send(JSON.stringify({success: false, error: "no rows"}));
          } else{
            res.render('noteams', {id:req.params.id, club_id:req.params.club_id});
          };    
        }; 
      });
    }else{
      res.render('login');
    };  
  });

  router.get('/committee/:id/:club_id/statistics/addeventlocation', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
 		  res.render('addeventlocation', { id: req.params.id, club_id: req.params.club_id});
    }else{
      res.render('login');
    };  
  });
};