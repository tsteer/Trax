module.exports = function(router, db) {

	router.get('/deleteuser/:id', function(req, res, next){
		if(req.session.userid == req.params.id){
			db.run("DELETE from person WHERE id = ?", [req.params.id], function(err, rows){
				if (err) { 
					return next(err); 
				}
				db.run("DELETE from join_club WHERE holder_id = ?", [req.params.id], function(err, rows){
					if (err) { 
						return next(err); 
					}
					if (req.query.json) {
						res.send(JSON.stringify({success: true, id: req.params.id}));
					}	else{
						res.render("deleted", {id: req.params.id});
					}
				});	
			});
		} else{
      res.send(JSON.stringify({success: false}));
    };	
	});
};


//db.run("DELETE from person INNER JOIN join_club WHERE person.id = join_club.holder_id and person.id = ?", [req.params.id], function(err, rows){