
module.exports = function(router, db, apiToken, querystring) {

  router.get('/deleteuser/:id', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      		res.render('deleteuser', { id: req.params.id});
    		} else{
					res.render('login'); 
  	};	
  });		
};  
