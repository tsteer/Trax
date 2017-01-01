module.exports = function(router, db, apiToken, querystring) {

  router.get('/joinclub/:id/noclubs', function(req, res, next) {
  	if(req.session.userid == req.params.id){ 
    	res.render('noclubs');   
    }else{
      res.render('login');
    }; 	  
  });
}; 