module.exports = function(router, db, apiToken, querystring) {

  router.get('/newsfeed/:id/:club_id/noposts', function(req, res, next) {
  	if(req.session.userid == req.params.id){ 
    	res.render('noposts');   
    }else{
      res.render('login');
    }; 	  
  });
}; 