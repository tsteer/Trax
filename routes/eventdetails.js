module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics/:team_id/addevent/:event_id/eventdetails', function(req, res, next) {
    if(req.session.userid == req.params.id){
      res.render('eventdetails', { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_id: req.params.event_id});
    }else{
      res.send("Please log in!");
    }; 
  });  

  router.post('/committee/:id/:club_id/statistics/:team_id/addevent/:event_id/eventdetails', function(req, res, next){
    var members_list = [];
    var members = {};
    response = {
      event_date: req.body.event_date,
      event_start_time: req.body.event_start_time,
      event_end_time: req.body.event_end_time
    };   
    if(req.session.userid == req.params.id){  
      db.run("UPDATE event SET event_date = ?, event_start_time = ?, event_end_time = ? WHERE event_id = ?", [response.event_date, response.event_start_time, response.event_end_time, req.params.event_id], function(err, rows) {   
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }else{
          db.all("SELECT * FROM join_team INNER JOIN person ON person.id = join_team.holder_id WHERE join_team.team_id = ?", [req.params.team_id], function(err, rows) {
            if (err) {
              console.log("error:" + err);
              res.send("error");
              return;
            }
            if (rows.length > 0) {
              rows.forEach(function(row){
                members = {id: row.id, first_name: row.first_name, last_name: row.last_name};
                members_list.push(members);
              });
              if (req.query.json) {
                res.send(JSON.stringify({success: true, members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_id: req.params.event_id}));
              } else{
                res.render("addeventmembers", {members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_id: req.params.event_id});
              };  
            } else{
              if (req.query.json) {
                res.send(JSON.stringify({success: false, error: "no rows"}));
              } else{
                res.send("no rows");
              };  
            };  
          });  
        };
      });
    }else{
      res.send("Please log in!");
    };  
  });
};