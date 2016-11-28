module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/liftadded', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('liftadded', { id: req.params.id, club: req.params.club_id});
    } else{
			res.render('login');
    };     
  });

}; 