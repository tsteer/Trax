module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts/:reserved_route_id/:reserved_seats_id/cancellift', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      		res.render('cancellift', { id: req.params.id, club_id: req.params.club_id, reserved_route_id: req.params.reserved_route_id, reserved_seats_id: req.params.reserved_seats_id});
    		} else{
					res.render('login');
    		  
  	};	
  });		
};  
