module.exports = function(router, db, apiToken, querystring) {

  router.get("/committee/:id/:club_id/teams", function(req, res) {
    db.all("select * from team where team_club_id = ?", [req.params.club_id], function(err, rows) {
      if (err) { /* select all teams in club */
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) { 
        var teams = [];
        var team = {};
        rows.forEach(function(row){ /* store team data as object, object added to array of all teams */
          team = {team_id: row.team_id, team_name: row.team_name, team_club_id: row.team_club_id};
          teams.push(team);
        });
        if (req.query.json) {
          res.send(JSON.stringify({success: true, team: team, teams: teams}));
        } else{
          res.render("teams", {teams: teams, id: req.params.id, club_id:req.params.club_id}); 
        };       
      } else {
        if (req.query.json) {
          res.send(JSON.stringify({success: false, error: "no rows"}));
        } else{
          res.render('noteams', {id:req.params.id, club_id:req.params.club_id});
        };    
      }; 
    });
  });

  router.get("/committee/:id/:club_id/teams/:team_id", function(req, res) {
    var members_list = [];
    var members = {};
    if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM join_team Left JOIN person ON person.id = join_team.holder_id WHERE join_team.team_id = ?", [req.params.team_id], function(err, rows) {
        if (err) { /* select all team members */
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) {
          rows.forEach(function(row){ /* store each member data as object, add to array of all members */
            members = {id: row.id, first_name: row.first_name, last_name: row.last_name, email: row.email};
            members_list.push(members);
          });
          if (req.query.json) {
            res.send(JSON.stringify({success: true, members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id}));
          } else{
            res.render("teamlist", {members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
          };  
        } else{
          if (req.query.json) {
            res.send(JSON.stringify({success: false, error: "no rows"})); /// change this so shows no teams not no rows
          } else{
            res.render('noteammembers', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
          };  
        };  
      });  
    }else{
      res.render('login');
    };   
  });
};