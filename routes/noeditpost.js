module.exports = function(router, db, apiToken, querystring) {

  router.get('/newsfeed/:id/:club_id/:post_id/editpost/noeditpost', function(req, res, next) {
  	if(req.session.userid == req.params.id){ 
    	res.render('noeditpost');   
    }else{
      res.render('login');
    }; 	  
  });
}; 