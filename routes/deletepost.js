module.exports = function(router, db, apiToken, querystring) {

  router.get('/newsfeed/:id/:club_id/:post_id/deletepost', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      res.render('deletepost', { id: req.params.id, club_id: req.params.club_id, post_id: req.params.post_id});
    }else{
			res.render('login'); 
  	};	
  });		
};  
