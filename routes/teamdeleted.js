module.exports = function(router, db, apiToken, querystring) {

	router.get('/committee/:id/:club_id/teams/:team_id/teamdeleted', function(req, res, next){
	  if(req.session.userid == req.params.id){ 
			db.run("DELETE from team WHERE team_id = ?", [req.params.team_id], function(err, rows){
				if (err) { 
					return next(err); 
				} else{
					db.run("DELETE from join_team WHERE team_id = ?", [req.params.team_id], function(err, rows){
						if (err) { 
							return next(err); 
						}
						if (req.query.json) {
							res.send(JSON.stringify({success: true, id: req.params.id}));
						}	else{
							res.render("teamdeleted", {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
						}
					});
				};		
			}); 
     }else{
      res.send("Please log in!");
    }   			
	});
};