module.exports = function(router, db, apiToken, querystring) {

	router.get('/committee/:id/:club_id/clubdeleted', function(req, res, next){
	  if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.params.id, req.params.club_id], function(err, rows){
        if(rows[0].on_committee == 'TRUE'){ /* only committee can delete club */
        	db.run("BEGIN TRANSACTION");
					db.run("DELETE from club WHERE club_id = ?", [req.params.club_id], function(err, rows){
						if (err) { /* delete club */
							db.run("ROLLBACK");
							return next(err); 
						}else{
							db.run("DELETE from join_club WHERE club_holder_id = ?", [req.params.club_id], function(err, rows){
								if (err) { /* delete all club members */
									db.run("ROLLBACK");
									return next(err); 
								}
								else{
									db.run("COMMIT TRANSACTION");
									res.render("clubdeleted", {id: req.params.id, club_id: req.params.club_id});
								};
							});
						};		
					});
				}else{
          res.send("You must be a committee member in order to access this page");
        }  
      });  
    } else{
			res.render('login');
    };    			
	});
};