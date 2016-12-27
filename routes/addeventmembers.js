module.exports = function(router, db, apiToken, querystring) {

  router.post("/committee/:id/:club_id/statistics/:team_id/addevent/:event_id/eventdetails/addeventmembers", function(req, res, next) { // /edituser?:token ???
    response = {
      team:req.body.team
    };
    db.all("SELECT * FROM team left join join_team on team.team_id = join_team.team_id WHERE team.team_id = ?", [req.params.team_id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }else{
        rows.forEach(function(row){
          var stmt = db.run("INSERT INTO join_event VALUES (NULL, ?, ?, ?, ?)", [row.holder_id, req.params.event_id, req.params.team_id, 'FALSE'], function(err, result){
            if (err) {
              console.log("error:" + err);
              res.send("error");
              return;
            }else{
              for(var i = 0; i < response.team.length; i++){
                db.run("UPDATE join_event SET present = ? WHERE event_id = ? and holder_id = ?", ['TRUE', req.params.event_id, response.team[i]], function(err, result){
                  if (err) {
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
  });
};

/*
  router.post("/committee/:id/:club_id/statistics/:team_id/addevent/:event_id/eventdetails/addeventmembers", function(req, res, next) { // /edituser?:token ???
    response = {
      team:req.body.team
    };
    if(req.session.userid == req.params.id){
      for(var i = 0; i < response.team.length; i++){
       console.log(i + response.team[i]);
             console.log("test2");
       var stmt = db.run("INSERT INTO join_event VALUES (NULL, ?, ?, ?, ?)", [response.team[i], req.params.event_id, req.params.team_id, 'FALSE'], function(err, result){
                      if (err) {
                console.log("error:" + err);
                res.send("error");
                return;
              }else{}
        });
       res.render('eventmembersadded', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_id: req.params.event_id});
      }
     /* db.run("UPDATE person SET first_name = ?, last_name = ?, dob = ?, address = ?, email = ?, telephone = ?, year = ? WHERE id = ?", [response.first_name, response.last_name, response.dob, response.address, response.email, response.telephone, response.year, req.params.id], function(err, result){   
        if (err) { 
          return next(err); 
        }
        res.send(JSON.stringify({success: true, first_name: response.first_name, last_name: response.last_name, dob: response.dob, address: response.address, email: response.email, telephone: response.telephone, year: response.year})); //dont need for app
      });*//*console.log(JSON.stringify(response.team));
      console.log(response.team.length);
    }else{
      res.send("Please log in!");
    };  
  }); */