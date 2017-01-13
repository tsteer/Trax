module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts/:route_id/liftdeleted', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
      db.run("BEGIN TRANSACTION");
      db.run("DELETE from route WHERE route_id = ?", [req.params.route_id], function(err, rows){
        if (err) { 
          db.run("ROLLBACK"); 
          return next(err); 
        } else{
          db.run("DELETE from seats WHERE route_id = ?", [req.params.route_id], function(err, rows){
            if (err) { 
              db.run("ROLLBACK"); 
              return next(err); 
            } else{
              db.run("COMMIT TRANSACTION");
              res.render('liftdeleted', { id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
            };
          });
        };    
      }); 
    } else{
      res.render('login');
    };
  });		
};  

