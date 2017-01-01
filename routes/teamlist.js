module.exports = function(router, db, apiToken, querystring) {

	router.get("/committee/:id/:club_id/teams/:team_id/teamlist", function(req, res) {
    var members_list = [];
    var members = {};
    if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM join_team INNER JOIN person ON person.id = join_team.holder_id WHERE join_team.team_id = ?", [req.params.team_id], function(err, rows) {
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) {
          rows.forEach(function(row){
            members = {id: row.id, first_name: row.first_name, last_name: row.last_name, email: row.email};
            members_list.push(members);
          });
          if (req.query.json) {
            res.send(JSON.stringify({success: true, members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id}));
          } else{
            res.render("teamlist", {members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
          }  
        } else{
          if (req.query.json) {
            res.send(JSON.stringify({success: false, error: "no rows"}));
          } else{
            res.render('noteammembers', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
          }  
        }  
      });  
    }else{
      res.render('login');
    }   
  });
};	