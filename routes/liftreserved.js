module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/:route_id/liftreserved', function(req, res, next) {
     res.render('liftreserved', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
  });   
};  