module.exports = function(router, db, apiToken, querystring) {
  router.get("/committee/:id/:club_id/teams/:team_id/deleteteammembers", function(req, res) {
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
                  res.send(
                  JSON.stringify({success: true, members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id}));
                } else{
                  res.render("deleteteammembers", {members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
                }  
              } else{
                if (req.query.json) {
                  res.send(JSON.stringify({success: false, error: "no rows"}));
                } else{
                  res.send("no rows");
                }  
              }  
            });  
    }else{
      res.render('login');
    }   
  });

  router.post("/committee/:id/:club_id/teams/:team_id/deleteteammembers", function(req, res, next) { // /edituser?:token ???
    response = {
      team:req.body.team
    };
    if(req.session.userid == req.params.id){
      for(var i = 0; i < response.team.length; i++){
       console.log(i + response.team[i]);
       var stmt = db.run("DELETE FROM join_team WHERE holder_id = ? and team_id = ?", [response.team[i], req.params.team_id], function(err, result){
                      if (err) {
                console.log("error:" + err);
                res.send("error");
                return;
              }else{}
        });
       res.render('teammembersdeleted', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
      }
     /* db.run("UPDATE person SET first_name = ?, last_name = ?, dob = ?, address = ?, email = ?, telephone = ?, year = ? WHERE id = ?", [response.first_name, response.last_name, response.dob, response.address, response.email, response.telephone, response.year, req.params.id], function(err, result){   
        if (err) { 
          return next(err); 
        }
        res.send(JSON.stringify({success: true, first_name: response.first_name, last_name: response.last_name, dob: response.dob, address: response.address, email: response.email, telephone: response.telephone, year: response.year})); //dont need for app
      });*/ console.log(JSON.stringify(response.team));
      console.log(response.team.length);
    }else{
      res.send("Please log in!");
    };  
  });
};