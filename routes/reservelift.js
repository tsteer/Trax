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
          res.render('noroute', {id: req.params.id, club_id: req.params.club_id});
        };
      });
    }else{
      res.render('login'); 
    };
  });
  
  router.post('/liftsharing/:id/:club_id/:route_id/reservelift', function(req, res, next){
    if (req.query.json) {
      var token = req.get('X-Auth-Token');
      var valid = apiToken.isTokenValid(token);
      if (valid) {
        if(seats > 0){
          db.run("BEGIN TRANSACTION");
          var stmt = db.run("INSERT into seats values (NULL, ?, ?)", [req.params.id, req.params.route_id], function(err, result) {
            if (err) { 
              db.run("ROLLBACK"); 
              return next(err); 
            }else{
              db.run("UPDATE route set seats = seats - 1 where route_id = ?", [req.params.route_id], function(err, result){
                if (err) { 
                  db.run("ROLLBACK"); 
                  return next(err); 
                }else{
                  db.run("COMMIT TRANSACTION");
                  res.send(JSON.stringify({success: true, id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id}));
                }; 
              }); 
            };
          });  
        }else{
          res.send(JSON.stringify({success: false, error: "no rows"}));
        };
      }else{
        res.send(JSON.stringify({success: false, error: "login"}));
      };  
    }  
    else if(req.session.userid == req.params.id){ 
      if(seats > 0){
        db.run("BEGIN TRANSACTION");
        var stmt = db.run("INSERT into seats values (NULL, ?, ?)", [req.params.id, req.params.route_id], function(err, result) {
          if (err) { 
            db.run("ROLLBACK"); 
            return next(err); 
          }else{
            db.run("UPDATE route set seats = seats - 1 where route_id = ?", [req.params.route_id], function(err, result){
              if (err) { 
                db.run("ROLLBACK"); 
                return next(err); 
              }else{
                db.run("COMMIT TRANSACTION");
                res.render('liftreserved', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
              }; 
            }); 
          };
        });  
      }else{
        res.render('noseats', {id: req.params.id, club_id: req.params.club_id});
      };
    }else{
      res.render('login');
    }; 
  });        
};  
