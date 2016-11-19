module.exports = function(router, db, apiToken, querystring) {

  router.get('/account?:token', function(req, res, next) {
  	var token = req.query.token; 
  	console.log("testing token here 1 " + token);
		var valid = apiToken.isTokenValid(token);
		if (valid) {
      var user = apiToken.findUserByToken(token);
      console.log("Your token is valid and you are " + JSON.stringify(user));
  		if(req.session.userid){
  	//	 var token = req.query.token;
	  		console.log("testing token here" + token);
	  		var tokentest = querystring.stringify({token: token});
				console.log("my new test" + tokentest);
	    	res.render('account', { id: req.session.userid, token: tokentest});
	    	console.log("account token" + token);
	    	console.log("account query" + req.query.token);
			}else{
				res.render('login');	
			};	
		}else{
			res.end("This is not a valid token.");
		}
  });
};