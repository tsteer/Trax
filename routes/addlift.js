module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id/addlift', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
          console.log("0");
      res.render('addlift', { id: req.params.id, club: req.params.club_id});
    } else{
			res.render('login');
    };     
  });

  router.post('/liftsharing/:id/:club_id/addlift', function(req, res, next){
    response = {
      pick_up_location:req.body.pick_up_location,
      pick_up_time:req.body.pick_up_time,
      pick_up_date:req.body.pick_up_date,
      drop_off_location:req.body.drop_off_location,
      drop_off_time:req.body.drop_off_time,
      drop_off_date:req.body.drop_off_date,
      seats:req.body.seats,
      return_trip:req.body.return_trip
    };
    console.log("1");
    console.log(response);
    db.all("SELECT membership_id FROM join_club WHERE holder_id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if(rows.length > 0) {
        console.log("2");
        var membership_id = rows[0].membership_id;
        var stmt = db.run("INSERT INTO route VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [membership_id, response.return_trip, response.seats, response.pick_up_location, response.pick_up_time, response.pick_up_date, response.drop_off_location, response.drop_off_time, response.drop_off_date], function(err, rows) {   
          if (err) {
            console.log("error:" + err);
            res.send("error");
            return;
          }else{
            console.log("3");
            res.render('liftadded', { id: req.params.id, club: req.params.club_id});
          }
        });
      }else{
        res.render('login');
      }; 
    });  
  });
};