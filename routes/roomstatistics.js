module.exports = function(router, db, apiToken, querystring) {
	
  router.get('/committee/:id/:club_id/statistics/:team_id/roomstatistics', function(req, res, next) {
	  db.all("select * from event left join event_location on event.location_id = event_location.location_id where team_id = ? ORDER BY event_id ASC", [req.params.team_id], function(err, rows) {
			event_room_list = [];
			if (err) {
			  console.log("error:" + err);
			  res.send("error");
			  return;
			}else{
				rows.forEach(function(row){
					event_room_list.push(row.location_name); 
				});	
				event_date_list = [];
				db.all("select * from event where team_id = ? ORDER BY event_id ASC", [req.params.team_id], function(err, rows) {
				  if (err) {
				    console.log("error:" + err);
			      res.send("error");
		        return;
		      }else{
					 	rows.forEach(function(row){
				     	event_date_list.push(row.event_date);
			      });
						res.render('roomstatistics', {id:req.params.id, club_id:req.params.club_id, team_id:req.params.team_id, event_room_list: event_room_list, event_date_list: event_date_list});
					}
				});	
			}
		});
	});    	
};