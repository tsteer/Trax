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
            //   console.log( "1" + JSON.stringify(row));
             member.push(row.present);
              console.log( "1" + i + JSON.stringify(member));
            });  
                 console.log(  "2" + i + JSON.stringify(member));  
          }); 
            console.log( "3" +  i + JSON.stringify(member));
        };
      };  
    //   console.log("2" + JSON.stringify(team));
      //  console.log("3" + JSON.stringify(attendance));
        //   console.log("4" + attendance);
        res.render('viewregister', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
    
    }); 

  });  
};  

/*
    var event = [];
    var member = {};
    db.all("select * from join_event left join event on join_event.event_id = event.event_id left join person on person.id = join_event.holder_id where join_event.team_id = ? ORDER BY event_id ASC, person.id ASC", [req.params.team_id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }else {
        rows.forEach(function(row){
          member = {person_id: row.id, event_date: row.event_date, first_name: row.first_name, last_name: row.last_name, present: row.present};
          event.push(member);
        });
        console.log(JSON.stringify(event));
        res.render('viewregister', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event: event});
      }  
    });
  });  */