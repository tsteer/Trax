module.exports = function(router, db) {

	router.get('/deleteclub/:id', function(req, res, next){
		db.run("DELETE from club WHERE club_id = ?", [req.params.id], function(err, rows){
			if (err) { return next(err); }
		});
		console.log("done"); 
		res.send("We deleted club" + req.params.id);
	});
};
