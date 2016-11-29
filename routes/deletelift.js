module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts/:route_id/deletelift', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      		res.render('deletelift', { id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
    		} else{
					res.render('login');
    		  
  	};	
  });		
};  
