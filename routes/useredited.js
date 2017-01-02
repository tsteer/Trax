module.exports = function(router, db, apiToken, querystring) {

  router.get('/edituser/:id/useredited', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('useredited', { id: req.params.id});
    } else{
			res.render('login');
    };     
  });
}; 