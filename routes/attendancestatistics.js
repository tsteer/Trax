module.exports = function(router, db, apiToken, querystring) {
	
  router.get('/committee/:id/:club_id/statistics/:team_id/attendancestatistics', function(req, res, next) {
	  db.all("select * from join_event where team_id = ? ORDER BY event_id ASC", [req.params.team_id], function(err, rows) {
			event_attendance_list = [];
			if (err) {
			  console.log("error:" + err);
			  res.send("error");
			  return;
			}else{
			  var current_event = 0;
			  current_event = rows[0].event_id;
			  var attendance_count = 0;
			  rows.forEach(function(row){
				  if(current_event == row.event_id){
				    if(row.present == 'TRUE'){
				      attendance_count = attendance_count + 1;
				    }else{}	
				    event_attendance_list.push(attendance_count); 
				  }else{
				    attendance_count = 0;
				    current_event = row.event_id;
				    if(row.present == 'TRUE'){
				     	attendance_count = attendance_count + 1;
				    }else{}	
				  }
			  });	
				event_date_list = [];
				var total_event_attend = 0;
				db.all("select * from event where team_id = ? ORDER BY event_id ASC", [req.params.team_id], function(err, rows) {
				  if (err) {
				    console.log("error:" + err);
			      res.send("error");
		        return;
		      }else{
					 	rows.forEach(function(row){
				     	event_date_list.push(row.event_date);
			      });
		      	db.all("select * from join_team where team_id = ? ", [req.params.team_id], function(err, rows) {
							var team_size = 0;
							team_size = rows.length;
							res.render('attendancestatistics', {id:req.params.id, club_id:req.params.club_id, team_id:req.params.team_id, team_size: team_size, total_event_attend: total_event_attend, event_date_list: event_date_list, event_attendance_list: event_attendance_list});
					 	});
					 }
				});
			}
		});
	});    	
};
