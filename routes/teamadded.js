module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/teamadded', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('teamadded', { id: req.params.id, club_id: req.params.club_id});
    } else{
			res.render('login');
    };     
  });
}; 