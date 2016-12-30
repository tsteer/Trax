module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts/:reserved_route_id/:reserved_seats_id/liftcancelled', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      db.run("DELETE from seats WHERE seats_id = ?", [req.params.reserved_seats_id], function(err, rows){
        if (err) { 
          return next(err); 
        } else{
          db.all("SELECT * FROM route WHERE route_id = ?", [req.params.reserved_route_id], function(err, rows){
            if(err) {
              console.log("error:" + err);
              res.send("error");
              return;
            }
            if (rows.length > 0) { 
              var seats = rows[0].seats;
              seats = seats + 1;
              db.run("UPDATE route SET seats = ? WHERE route_id = ?", [seats, req.params.reserved_route_id], function(err, result){ 
                if (err) { 
                  return next(err); 
                }else{
                  res.render('liftcancelled', { id: req.params.id, club_id: req.params.club_id, reserved_seats_id: req.params.reserved_seats_id});
                }
              });
            }else{
              res.send("no seats!");
            }
          }); 
        };  
      }); 
    } else{
      res.send(JSON.stringify({success: false}));
    };  
  });		
};  

