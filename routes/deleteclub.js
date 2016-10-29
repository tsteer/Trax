module.exports = function(router, db) {

	router.get('/deleteclub/:id', function(req, res, next){
		if(req.session.userid > 0){
      db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.session.userid, req.params.id], function(err, rows){
        if(rows[0].on_committee == 'TRUE'){
					db.run("DELETE from club WHERE club_id = ?", [req.params.id], function(err, rows){
						if (err) { 
							return next(err); 
						}
						if (req.query.json) {
							res.send(JSON.stringify({success: true, id: req.params.id}));
						}	else{
							res.render("deleted", {id: req.params.id});
						}
					});
				}else{
          res.send("You must be a committee member in order to access this page");
        }  
      });  
     }else{
      res.send("Please log in!");
    }   			
	});
};
