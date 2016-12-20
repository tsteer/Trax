module.exports = function(router, db, apiToken, querystring) {

  router.get('/editclub/:id/:club_id/removecommittee', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      		res.render('removecommittee', { id: req.params.id, club_id: req.params.club_id});
    		} else{
					res.render('login');
    		  
  	};	
  });		


};  
