module.exports = function(router, db) {

	router.get('/deleteuser/:id', function(req, res, next){
		db.run("DELETE from person WHERE id = ?", [req.params.id], function(err, rows){
			if (err) { return next(err); }
		});
		console.log("done"); 
		res.send("We deleted user" + req.params.id);
	});
};
