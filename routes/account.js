module.exports = function(router, db, apiToken, querystring) {

  router.get('/account/:id', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
	    res.render('account', { id: req.params.id});
		}else{
			res.render('login');	
		};	
  });
};