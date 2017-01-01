module.exports = function(router, db, apiToken, querystring) {
  
  var seats;
  router.get('/liftsharing/:id/:club_id/:route_id/reservelift', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      db.all("select seats from route where route_id = ?", [req.params.route_id], function(err, rows){
        if (err) { 
          return next(err); 
        }
        if (rows.length > 0) {
          seats = rows[0].seats;
          res.render('reservelift', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
        }else{
          res.render('login');
        };
      });
    }else{
      res.render('login');
    };
  });
  
  router.post('/liftsharing/:id/:club_id/:route_id/reservelift', function(req, res, next){
    if(req.session.userid == req.params.id){ 
      if(seats > 0){
        var stmt = db.run("INSERT into seats values (NULL, ?, ?)", [req.params.id, req.params.route_id], function(err, result) {
          if (err) { 
            return next(err); 
          }else{
            var available_seats = seats - 1;
            db.run("UPDATE route set seats = ? where route_id = ?", [available_seats, req.params.route_id], function(err, result){
              if (err) { 
                return next(err); 
              }else{
                res.render('liftreserved', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id})
              }
            }); 
          }
        });  
      }else{
        res.render('login');
      }
    }else{
      res.render('login');
    }; 
  });        
};  
