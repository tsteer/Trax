module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts/:reserved_route_id/:reserved_seats_id/liftcancelled', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.run("BEGIN TRANSACTION");
      db.run("DELETE from seats WHERE seats_id = ?", [req.params.reserved_seats_id], function(err, rows){
        if (err) { 
          db.run("ROLLBACK"); 
          return next(err); 
        } else{
          db.run("UPDATE route SET seats = seats + 1 WHERE route_id = ?", [req.params.reserved_route_id], function(err, result){ 
            if (err) { 
              db.run("ROLLBACK"); 
              return next(err); 
            }else{
              db.run("COMMIT TRANSACTION");
              res.render('liftcancelled', { id: req.params.id, club_id: req.params.club_id, reserved_seats_id: req.params.reserved_seats_id});
            };
          });
        };  
      }); 
    } else{
      res.render('login');
    };  
  });		
}; 