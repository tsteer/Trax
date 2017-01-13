module.exports = function(router, db, apiToken, querystring) {

  router.get('/logout', function(req, res, next) {
 		req.session.destroy();
		res.render('login');	
  });
};