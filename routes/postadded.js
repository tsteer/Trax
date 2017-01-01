module.exports = function(router, db, apiToken, querystring) {

  router.get('/newsfeed/:id/:club_id/postadded', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('postadded', { id: req.params.id, club_id: req.params.club_id});
    } else{
			res.render('login');
    };     
  });
}; 