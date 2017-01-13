module.exports = function(router, db, apiToken, querystring) {

	router.get('/committee/:id/:club_id/teams/:team_id/teamdeleted', function(req, res, next){
	  if(req.session.userid == req.params.id){ 
	  	db.run("BEGIN TRANSACTION");
			db.run("DELETE from team WHERE team_id = ?", [req.params.team_id], function(err, rows){
				if (err) { /* delete team */
					db.run("ROLLBACK");
					return next(err); 
				} else{
					db.run("DELETE from join_team WHERE team_id = ?", [req.params.team_id], function(err, rows){
						if (err) { /* delete team members */
							db.run("ROLLBACK");
							return next(err); 
						}	else{
							db.run("COMMIT TRANSACTION");
							res.render("teamdeleted", {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
						};
					});
				};		
			}); 
    } else{
			res.render('login');
    };    			
	});
};