module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/mylifts/:route_id/liftdeleted', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 

      db.run("DELETE from route WHERE id = ?", [req.params.route_id], function(err, rows){
        if (err) { 
          return next(err); 
          } else{
            res.render('liftdeleted', { id: req.params.id, club_id: req.params.club_id, route_id: req.params.route_id});
          }
        }); 
    } else{
      res.send(JSON.stringify({success: false}));
    }
  });		
};  

