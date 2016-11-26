module.exports = function(router, db, apiToken, querystring) {

  router.get('/account/:id', function(req, res, next) {
  /*	var token = req.query.token; 
  	console.log("testing token here 1 " + req.query.token);
		var valid = apiToken.isTokenValid(token);
		if (valid) {
      var user = apiToken.findUserByToken(token);
      console.log("Your token is valid and you are " + JSON.stringify(user)); */
//console.log("checking" );
        console.log("session id1 " + req.session.userid);
 		if(req.session.userid == req.params.id){ 
 			        console.log("session id2 " + req.session.userid);
  	//	 var token = req.query.token;
	  	//	var tokentest = querystring.stringify({token: token});
	    	res.render('account', { id: req.params.id});
	    	
			}else{
				res.render('login');	
			};	/*
		}else{
			res.end("This is not a valid token." + token);
		} */
  });
};