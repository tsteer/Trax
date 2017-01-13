module.exports = function(router, db, apiToken, querystring) {

	router.get('/userdeleted/:id', function(req, res, next){
		if (req.query.json) {
      var token = req.get('X-Auth-Token');
      var valid = apiToken.isTokenValid(token);
      if (valid) {
      	db.run("DELETE from person WHERE id = ?", [req.params.id], function(err, rows){
					if (err) { /* delete user */
						return next(err); 
					}else{
						db.run("DELETE from join_club WHERE holder_id = ?", [req.params.id], function(err, rows){
							if (err) { /* delete all user's club memberships */
								return next(err); 
							}else{
								res.send(JSON.stringify({success: true, id: req.params.id}));
							};
						});
					};
				});
			}else{
        res.send(JSON.stringify({success: false, error: "login"}));
      };	
    }  
    else if(req.session.userid == req.params.id){   			
			db.run("DELETE from person WHERE id = ?", [req.params.id], function(err, rows){
				if (err) { 
					return next(err); 
				}else{
					db.run("DELETE from join_club WHERE holder_id = ?", [req.params.id], function(err, rows){
						if (err) { 
							return next(err); 
						}	else{
							res.render('userdeleted', {id: req.params.id});
						};
					});	
				};	
			});
		};	
	});
};