module.exports = function(router, db, apiToken, querystring) {
  router.get('/liftsharing/:id/:club_id', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM route LEFT JOIN join_club on join_club.membership_id = route.driver_id WHERE join_club.club_holder_id = ?", [req.params.club_id], function(err, rows){
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) { 
          var car = [];
          for (var j = 0; j < rows.length; j++){
            car[j] = {driver: rows[j].driver, return_trip: rows[j].return_trip, seats:rows[j].seats, pick_up_location:rows[j].pick_up_location, pick_up_time:rows[j].pick_up_time, pick_up_date:rows[j].pick_up_date, drop_off_location:rows[j].drop_off_location, drop_off_time:rows[j].drop_off_time, drop_off_date:rows[j].drop_off_date}
          }
          console.log(JSON.stringify(car));
          res.render('lifts', { id: req.params.id, club_id: req.params.club_id, car: car});
        } //add else for no lifts
        else{
          res.render('login');
        }
            
      });
 			/*
      res.render('lifts', { id: req.params.id, club_id: req.params.club_id});
    } else{
			res.render('login'); */
    };     
  });
};  