module.exports = function(router, db, apiToken, querystring) {

	router.get('/committee/:id/:club_id/clubdeleted', function(req, res, next){
	  if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.params.id, req.params.club_id], function(err, rows){
        if(rows[0].on_committee == 'TRUE'){ /* only committee can delete club */
					db.run("DELETE from club WHERE club_id = ?", [req.params.club_id], function(err, rows){
						if (err) { /* delete club */
							return next(err); 
						}else{
							db.run("DELETE from join_club WHERE club_holder_id = ?", [req.params.club_id], function(err, rows){
								if (err) { /* delete all club members */
									return next(err); 
								}
								if (req.query.json) { /* must be updated for further mobile development - mobile token must be validated in order to complete this request */
									res.send(JSON.stringify({success: true, id: req.params.id}));
								}	else{
									res.render("clubdeleted", {id: req.params.id, club_id: req.params.club_id});
								}
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