module.exports = function(router, db, apiToken, querystring) {


   router.get('/committee/:id/:club_id/statistics/:team_id', function(req, res, next) {
            console.log("dsfdaskfjhasdhkf222222");
 res.render("teamevent", {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id}); 
   });  

  router.get('/committee/:id/:club_id/statistics/:team_id/addevent', function(req, res, next) {
    var event_location = [];
  	if(req.session.userid == req.params.id){ 
      console.log("0");
      db.all("select * from event_location where club_id = ?", [req.params.club_id], function(err, rows) {
        if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }else{

         for (var k = 0; k < rows.length; k++){
          event_location[k] = {location_id: rows[k].location_id, location_name: rows[k].location_name}; 
        };  
      res.render('addevent', { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_location: event_location});
    };
  });
    } else{
			res.render('login');
    };     
  });


  router.post('/committee/:id/:club_id/statistics/:team_id/addevent', function(req, res, next){
    
    response = {
      event_location:req.body.event_location
    };

           console.log("trewdsfds" + response.event_location);
    var stmt = db.run("INSERT INTO event (team_id, location_id) VALUES (?, ?)", [req.params.team_id, response.event_location], function(err, rows) {   
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }else{
         var event_id = this.lastID;
        console.log("id " + event_id);
        res.render('eventdetails', { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_id: event_id});
      }
      /*
         var event_id = this.lastID;
        console.log("id " + event_id);
        res.render('memberattendance', { id: req.params.id, event_id: event_id, club_id: req.params.club_id, team_id: req.params.team_id});
 */
    });
  });
};