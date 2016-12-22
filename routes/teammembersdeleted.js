module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/teams/:team_id/teammembersdeleted', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('teammembersdeleted', { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
    } else{
			res.render('login');
    };     
  });

}; 