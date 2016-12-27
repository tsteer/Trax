module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics/:team_id/viewregister', function(req, res, next) {
    res.render('viewregister', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
  });		
};  

