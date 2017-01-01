module.exports = function(router, db, apiToken, querystring) {

  router.get('/newclub/:id/clubadded', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('clubadded', { id: req.params.id});
    } else{
			res.render('login');
    };     
  });
}; 