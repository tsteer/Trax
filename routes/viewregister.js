module.exports = function(router, db, apiToken, querystring) {
  router.get('/committee/:id/:club_id/statistics/:team_id/viewregister', function(req, res, next) {
  	var register = [];
    var event = [];
    var member = {};
    db.all("select * from join_event where team_id = ? ORDER BY event_id ASC", [req.params.team_id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      } else{
          var event_tracker = rows[0].event_id;
          var i = 0;
          event[i] = [];
      	rows.forEach(function(row){
        	if(event_tracker == row.event_id){
          }else{
            i++;
            event[i] = [];
            console.log("number " + i);
            event_tracker = row.event_id;
          }
        });
    		db.all("select * from join_event left join event on join_event.event_id = event.event_id left join person on person.id = join_event.holder_id where join_event.team_id = ? ORDER BY event_id ASC, person.id ASC", [req.params.team_id], function(err, rows) {
  	      if (err) {
  	        console.log("error:" + err);
  	        res.send("error");
  	        return;
  	      } else {
            var event_tracker_second = rows[0].event_id;
            var j = 0;
        		rows.forEach(function(row){
              if(event_tracker_second == row.event_id){
            		member = {event_id: row.event_id, holder_id: row.holder_id, present: row.present, first_name: row.first_name, last_name: row.last_name};
            		event[j].push(member);
            		console.log("asdfsadfs " + j + JSON.stringify(event[j]));
              }else{
                j++;
                member = {event_id: row.event_id, holder_id: row.holder_id, present: row.present, first_name: row.first_name, last_name: row.last_name};
                event[j].push(member);
                event_tracker_second = row.event_id;
              }
            });
            console.log("lenth " + event.length);
            for (var k = 0; k < event.length; k++) {
               console.log("blah " + k + JSON.stringify(event[k]));
            }
          //    console.log(JSON.stringify(event));
        res.render('viewregister', {id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event: event});
  
          };
       });
      };
    });
  });		
};  