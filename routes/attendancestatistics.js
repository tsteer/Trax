module.exports = function(router, db, apiToken, querystring) {
	
  router.get('/committee/:id/:club_id/statistics/:team_id/attendancestatistics', function(req, res, next) {
  	if(req.session.userid == req.params.id){ 
		  db.all("select * from join_event where team_id = ? ORDER BY event_id ASC", [req.params.team_id], function(err, rows) {
				event_attendance_list = []; /*select all join_event rows for given team */
				if (err) {
				  console.log("error:" + err);
				  res.send("error");
				  return;
				}
				if(rows.length == 0){
					res.render('noevents', {id:req.params.id, club_id:req.params.club_id, team_id:req.params.team_id});			 
				} else{
				  var current_event = 0; /* var to track current event */
				  current_event = rows[0].event_id; /* set current event to equal first event_id of select results */
				  var attendance_count = 0;
				  rows.forEach(function(row){ /* for each join_event - where event_id matches current event */
					  if(current_event == row.event_id){
					    if(row.present == 'TRUE'){  
					      attendance_count = attendance_count + 1; /* count members present for each event */
					    }else{}	
					  }else{
					   	event_attendance_list.push(attendance_count); /* when event changes, add attendance count to array and reset count */
					    attendance_count = 0;
					    current_event = row.event_id; /* set new current event */
					    if(row.present == 'TRUE'){
					     	attendance_count = attendance_count + 1; /*count event attendance */
					    }else{}	
					  }
				  });	
				  event_attendance_list.push(attendance_count); /* when final row reached, add final attendance count to array */
					event_date_list = [];
					var total_event_attend = 0;
					db.all("select * from event where team_id = ? ORDER BY event_id ASC", [req.params.team_id], function(err, rows) {
					  if (err) { /* select all team events */
					    console.log("error:" + err);
				      res.send("error");
			        return;
			      }else{
						 	rows.forEach(function(row){
					     	event_date_list.push(row.event_date);
				      });
			      	db.all("select * from join_team where team_id = ? ", [req.params.team_id], function(err, rows) {
								var team_size = 0;
								team_size = rows.length; /* find team size */
								res.render('attendancestatistics', {id:req.params.id, club_id:req.params.club_id, team_id:req.params.team_id, team_size: team_size, total_event_attend: total_event_attend, event_date_list: event_date_list, event_attendance_list: event_attendance_list});
						 	});
						 }
					});
				}
			});
		}else{
      res.render('login');
    };  	
	});    	
};
