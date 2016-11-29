module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts/:route_id/liftedited', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('liftedited', { id: req.params.id, club: req.params.club_id});
    } else{
			res.render('login');
    };     
  });

}; 