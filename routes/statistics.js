module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics', function(req, res, next) {
    db.all("select * from team where team_club_id = ?", [req.params.club_id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) { 
        var teams = [];
        var team = {};
        rows.forEach(function(row){
          team = {team_id: row.team_id, team_name: row.team_name, team_club_id: row.team_club_id};
          teams.push(team);
        });
        if (req.query.json) {
          res.send(JSON.stringify({success: true, team: team, teams: teams}));
        } else{
          res.render('statistics', {id: req.params.id, club_id: req.params.club_id, teams: teams});
        }       
      } else {
        if (req.query.json) {
          res.send(JSON.stringify({success: false, error: "no rows"}));
        } else{
          res.render('noteams', {id:req.params.id, club_id:req.params.club_id});
        }    
      }; 
    });
  });

  router.get('/committee/:id/:club_id/statistics/addeventlocation', function(req, res, next) {
 		res.render('addeventlocation', { id: req.params.id, club_id: req.params.club_id});
  });
};