module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics/:team_id', function(req, res, next) {
    if(req.session.userid == req.params.id){
      res.render("teamevent", {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id}); 
    }else{
      res.render('login');
    };
  });  

  router.get('/committee/:id/:club_id/statistics/:team_id/addevent', function(req, res, next) {
    var event_location = [];
  	if(req.session.userid == req.params.id){ 
      db.all("select * from event_location where club_id = ?", [req.params.club_id], function(err, rows) { 
        if (err) { /* select all event locations for given club */
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if(rows.length > 0){
          for (var k = 0; k < rows.length; k++){ /*store locations as array of objects to be displayed by EJS */
            event_location[k] = {location_id: rows[k].location_id, location_name: rows[k].location_name}; 
          };  
          res.render('addevent', { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_location: event_location});
        }else{
          res.render('eventnolocation', { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
        };
      });
    }else{
			res.render('login');
    };     
  });


  router.post('/committee/:id/:club_id/statistics/:team_id/addevent', function(req, res, next){
    response = {
      event_location:req.body.event_location
    };
    if(req.session.userid == req.params.id){ 
      var stmt = db.run("INSERT INTO event (team_id, location_id) VALUES (?, ?)", [req.params.team_id, response.event_location], function(err, rows) {   
        if (err) { /* create new event for given team, entering only selected location id and team id */
          console.log("error:" + err);
          res.send("error");
          return;
        }else{
          var event_id = this.lastID;
          res.render('eventdetails', { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_id: event_id});
        }
      });
    }else{
      res.render('login');
    };   
  });
};