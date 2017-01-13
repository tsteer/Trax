module.exports = function(router, db, apiToken, querystring) {

  router.post("/committee/:id/:club_id/statistics/:team_id/addevent/:event_id/eventdetails/addeventmembers", function(req, res, next) { // /edituser?:token ???
    response = {
      team:req.body.team
    };
    if(req.session.userid == req.params.id){
      db.all("SELECT * FROM team left join join_team on team.team_id = join_team.team_id WHERE team.team_id = ?", [req.params.team_id], function(err, rows) {
        if (err) { /* select all team members - for attendance register */
          console.log("error:" + err);
          res.send("error");
          return;
        }else{
          rows.forEach(function(row){
            var stmt = db.run("INSERT INTO join_event VALUES (NULL, ?, ?, ?, ?)", [row.holder_id, req.params.event_id, req.params.team_id, 'FALSE'], function(err, result){
              if (err) { /* for each team member, create a join_event, setting attendance to absent (false) */
                console.log("error:" + err);
                res.send("error");
                return;
              }else{
                for(var i = 0; i < response.team.length; i++){
                  db.run("UPDATE join_event SET present = ? WHERE event_id = ? and holder_id = ?", ['TRUE', req.params.event_id, response.team[i]], function(err, result){
                    if (err) { /* If member is present, update join_event to reflect this (true) */
                      console.log("error:" + err);
                      res.send("error");
                      return;
                    }else{};
                  });
                };
              };    
            });
          });
          res.render('eventmembersadded', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_id: req.params.event_id});
        };   
      });
    }else{
      res.render('login');
    };  
  });
};