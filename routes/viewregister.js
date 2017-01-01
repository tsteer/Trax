module.exports = function(router, db, apiToken, querystring) {
  
  router.get('/committee/:id/:club_id/statistics/:team_id/viewregister', function(req, res, next) {
    var team = [];
    var member = [];
    db.all("select * from join_team WHERE team_id = ? ORDER BY holder_id ASC", [req.params.team_id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }else{
        rows.forEach(function(row){
          team.push(row.holder_id);
        });  
        for(i = 1; i < team.length + 1; i++){ 
          member[i] = [];
          var temp_holder_id = team[i];
          db.all("select * from join_event WHERE team_id = ? AND holder_id = ?", [req.params.team_id, temp_holder_id], function(err, rows) {
            rows.forEach(function(row){
              member.push(row.present);
            });  
          }); 
        };
      };  
      res.render('viewregister', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
    }); 
  });  
};  