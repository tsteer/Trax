module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics/:team_id/eventadded', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('eventadded', { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
    } else{
			res.render('login');
    };     
  });
}; 