module.exports = function(router, db, apiToken, querystring) {

  router.get('/liftsharing/:id/:club_id', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM route LEFT JOIN join_club on join_club.membership_id = route.driver_id LEFT JOIN person on person.id = join_club.holder_id WHERE join_club.club_holder_id = ? AND route.seats > 0", [req.params.club_id], function(err, rows){          
        if (err) { /* select all lifts with available seats for given club */
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) { 
          var car = [];
          var name = [];
          var returntrip;
          for (var j = 0; j < rows.length; j++){
            if(rows[j].return_trip == "true"){
              returntrip = "yes";
            }
            else{
              returntrip = "no";
            };
            name = rows[j].first_name + " " + rows[j].last_name;
            car[j] = {route_id: rows[j].route_id, driver: name, return_trip: returntrip, seats:rows[j].seats, pick_up_location:rows[j].pick_up_location, pick_up_time:rows[j].pick_up_time, pick_up_date:rows[j].pick_up_date, drop_off_location:rows[j].drop_off_location, drop_off_time:rows[j].drop_off_time, drop_off_date:rows[j].drop_off_date};
          }; /* loop through results, save data for each lift as an object in an array */
          res.render('lifts', {id: req.params.id, club_id: req.params.club_id, car: car});
        } else{
          res.render('noroute', {id: req.params.id, club_id: req.params.club_id});
        };   
      });
    } else{
      res.render('login');
    };    
  });
};  