module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts/:route_id/editlift', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
 			db.all("SELECT * FROM route WHERE route_id = ?", [req.params.route_id], function(err, rows){	
        if(err) { /* select data for given route */
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) { 
      		res.render('editlift', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id, return_trip: rows[0].return_trip, seats: rows[0].seats, pick_up_location: rows[0].pick_up_location, pick_up_time: rows[0].pick_up_time, pick_up_date: rows[0].pick_up_date, drop_off_location: rows[0].drop_off_location, drop_off_time: rows[0].drop_off_time, drop_off_date: rows[0].drop_off_date});
    		} else{
					res.render('noroute', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
    		}    
  		});
  	} else{
      res.render('login');
    };  	
  });		

  router.post('/liftsharing/:id/:club_id/mylifts/:route_id/editlift', function(req, res, next) {
   response = {
      pick_up_location:req.body.pick_up_location,
      pick_up_time:req.body.pick_up_time,
      pick_up_date:req.body.pick_up_date,
      drop_off_location:req.body.drop_off_location,
      drop_off_time:req.body.drop_off_time,
      drop_off_date:req.body.drop_off_date,
      seats:req.body.seats,
      return_trip:req.body.return_trip
    };
    if(req.session.userid == req.params.id){ 
      db.run("UPDATE route SET pick_up_location = ?, pick_up_time = ?, pick_up_date = ?, drop_off_location = ?, drop_off_time = ?, drop_off_date = ?, seats = ?, return_trip = ? WHERE route_id = ?", [response.pick_up_location, response.pick_up_time, response.pick_up_date, response.drop_off_location, response.drop_off_time, response.drop_off_date, response.seats, response.return_trip, req.params.route_id], function(err, result){ 
        if (err) { /* update route with responses entered */
          return next(err); 
        } else{
          res.render('liftedited', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
        };
      });
    }else{
      res.render('login');
    };
  });

  router.get('/liftsharing/:id/:club_id/mylifts/:route_id/deletelift', function(req, res){
    if(req.session.userid == req.params.id){ 
      res.render('deletelift', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
    }else{
      res.render('login');
    };
  });
};  