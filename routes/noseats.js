module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/:route_id/reservelift/noseats', function(req, res, next) {
  	if(req.session.userid == req.params.id){ 
    	res.render('noseats');   
    }else{
      res.render('login');
    }; 	  
  });
}; 