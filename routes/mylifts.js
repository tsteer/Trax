module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
 			db.all("SELECT * FROM route LEFT JOIN join_club on join_club.membership_id = route.driver_id WHERE join_club.holder_id = ?", [req.params.id], function(err, rows){	
        if(err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) { 
          var mylifts = [];
          var route_id = [];
          for (var k = 0; k < rows.length; k++){
            mylifts[k] = {return_trip: rows[k].return_trip, seats:rows[k].seats, pick_up_location:rows[k].pick_up_location, pick_up_time:rows[k].pick_up_time, pick_up_date:rows[k].pick_up_date, drop_off_location:rows[k].drop_off_location, drop_off_time:rows[k].drop_off_time, drop_off_date:rows[k].drop_off_date}
            route_id[k] = {route_id: rows[k].id}
          }
          console.log("test here");
      		res.render('mylifts', { id: req.params.id, club_id: req.params.club_id, route_id: route_id, mylifts: mylifts});
    		} else{
					res.render('login');
    		}    
  		});
  	};	
  });		
};  

