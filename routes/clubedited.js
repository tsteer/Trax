module.exports = function(router, db, apiToken, querystring) {

  router.get('/editclub/:id/:club_id/clubedited', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('clubedited', { id: req.params.id, club: req.params.club_id, route_id: req.params.route_id});
    } else{
			res.render('login');
    };     
  });

}; 