module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
 			db.all("SELECT * FROM route LEFT JOIN join_club on join_club.membership_id = route.driver_id WHERE join_club.holder_id = ?", [req.params.id], function(err, rows){	
        if(err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) { 
          var mylifts = [];
          for (var k = 0; k < rows.length; k++){
            mylifts[k] = {pick_up_location: rows[k].pick_up_location}
          }
          console.log(JSON.stringify(mylifts));
      		res.render('mylifts', { id: req.params.id, mylifts: mylifts});
    		} else{
					res.render('login');
    		};     
  		});
  	};	
  });		
};  

