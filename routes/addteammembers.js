module.exports = function(router, db, apiToken, querystring) {

  router.get("/committee/:id/:club_id/teams/:team_id/addteammembers", function(req, res) {
    var members_list = [];
    var members = {};
    if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM join_club INNER JOIN person ON person.id = join_club.holder_id WHERE join_club.club_holder_id = ?", [req.params.club_id], function(err, rows) {
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
          }else{
            res.render("addteammembers", {members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
          }  
        }else{
          if(req.query.json) {
            res.send(JSON.stringify({success: false, error: "no rows"}));
          }else{
            res.send("no rows");
          }  
        }  
      });  
    }else{
      res.render('login');
    }   
  });

  router.post("/committee/:id/:club_id/teams/:team_id/addteammembers", function(req, res, next) { 
    response = {
      team:req.body.team
    };
    if(req.session.userid == req.params.id){
      for(var i = 0; i < response.team.length; i++){
        var stmt = db.run("INSERT INTO join_team VALUES (NULL, ?, ?, ?)", [req.params.team_id, response.team[i], 'FALSE'], function(err, result){
          if (err) {
            console.log("error:" + err);
            res.send("error");
            return;
          }else{}
        });
      };
      res.render('teammembersadded', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
    }else{
      res.send("Please log in!");
    };  
  });
};