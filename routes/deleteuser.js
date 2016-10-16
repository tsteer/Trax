module.exports = function(router, db) {

	router.get('/deleteuser/:id', function(req, res, next){
		db.run("DELETE from person WHERE id = ?", [req.params.id], function(err, rows){
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
};
