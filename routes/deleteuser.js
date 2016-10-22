module.exports = function(router, db) {

	router.get('/deleteuser/:id', function(req, res, next){
		if(req.session.userid == req.params.id){
			        console.log("watch this 1 " + req.session.userid); 
        console.log("watch this" + req.session); 
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
		} else{
      res.send(JSON.stringify({success: false}));
    };	
	});
};
