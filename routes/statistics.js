module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics', function(req, res, next) {
    res.render('statistics', {id: req.params.id, club_id: req.params.club_id});
  });		
};
