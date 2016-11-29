module.exports = function(router, db, apiToken, querystring) {
	  
  router.get('/liftsharing/:id', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
 			db.all("select club_id, club_name from club left join join_club on club.club_id = join_club.club_holder_id where holder_id = ?", [req.params.id], function(err, rows) {
 			  if (err) {
	        console.log("error:" + err);
	        res.send("error");
	        return;
	      }
	      if (req.query.json) {      
	        if (rows.length > 0) {
	          res.send(JSON.stringify({success: true})); 
	        } else{
	          res.send(JSON.stringify({success: false, error: "no rows"}));    
	        }  
	      } else {
          if (rows.length > 0) { 
          	var club = [];
       
          	for (var i = 0; i < rows.length; i++){
          		club[i] = {club_name: rows[i].club_name, club_id: rows[i].club_id}
		        } // semicolon here?
		       // console.log(JSON.stringify(club));
		        console.log("check length here" + club.length);
           //   var tokentest = querystring.stringify({token: token});
            res.render('liftsharing', {id: req.params.id, club: club});
          } else{
						res.render('login');
          }
        };     
      });         
    };
  });
};