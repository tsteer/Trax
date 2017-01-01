module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts/:route_id/editlift/noroute', function(req, res, next) {
  	if(req.session.userid == req.params.id){ 
    	res.render('noroute');   
    }else{
      res.render('login');
    }; 	  
  });
}; 