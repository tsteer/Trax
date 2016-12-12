module.exports = function(router, db, apiToken, querystring) {

router.get('/liftsharing/:id/:club_id/:route_id/liftreserved', function(req, res, next) {
   res.render('liftreserved', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
});   

/*
var seats; //move?
  router.get('/liftsharing/:id/:club_id/:route_id/liftreserved', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      db.all("select seats from route where id = ?", [req.params.route_id], function(err, rows){
        console.log("test seats here");
        if (err) { 
          return next(err); 
        }
        if (rows.length > 0) {
          seats = rows[0].seats;
          console.log("seats = " + seats);
          res.render('liftreserved', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
        }else{
          res.render('login');
        };
      });
    }else{
      res.render('login');
    };
  });
  
  router.post('/liftsharing/:id/:club_id/:route_id/liftreserved', function(req, res, next){
    if(req.session.userid == req.params.id){ 
      if(seats > 0){
        var stmt = db.run("INSERT into seats NULL, ?, ?", [req.params.id, req.params.route_id], function(req, res, next) {
          if (err) { 
            return next(err); 
          }else{
            var available_seats = seats - 1;
            db.run("UPDATE route set seats = ? where id = ?", [available_seats, req.params.route_id], function(err, result){
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

  /*
          if(rows[0].seats > 0){
            var seats = rows[0].seats;
                    console.log("seats = " + seats);
            var stmt = db.run("INSERT into seats NULL, ?, ?", [req.params.id, req.params.route_id], function(req, res, next) {
              if (err) { 
                return next(err); 
              }else{
                var available_seats = seats - 1;
                db.run("UPDATE route set seats = ? where id = ?", [available_seats, req.params.route_id], function(err, result){
                  if (err) { 
                    return next(err); 
                  }else{
                    res.render('liftreserved', {id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id})
                  }
                });  
              }
            });
          } else{
            res.render('lifts', { id: req.params.id, club_id: req.params.club_id, car: car, route_id: route_id});
          }
        } else{
          res.render('login');
        } 
      });    
    }else{
      res.render('login');
    }      
  });        */

      /*    
      var stmt = db.run("INSERT into seats ?, ?, ?", [NULL, req.params.id, req.params.route_id], function(req, res, next) {
        if (err) { 
          return next(err); 
        }else{
          db.all("select seats from route", function(err, rows){
            if (rows.length > 0) {
              if rows
            }
          }
      db.run("UPDATE route db.all("SELECT id FROM seats WHERE id = SCOPE_IDENTITY()", function(err, rows){
        if(rows.length > 0){
          console.log("check here123" + rows[0].id);
            res.render('liftreserved', { id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
        }
      };
     /*     var stmt = db.run("INSERT into route_seats ?, ?", [req.params.route_id], function(req, res, next) {
          if (err) { 
            return next(err); 
          } 
          else{
            res.render('liftreserved', { id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
          } *//*
        }
      });    
    } else{
      res.send(JSON.stringify({success: false}));
    };
  });		*/
};  

