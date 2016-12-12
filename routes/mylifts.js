module.exports = function(router, db, apiToken, querystring) {
          var route_id = [];
  router.get('/liftsharing/:id/:club_id/mylifts', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM route LEFT JOIN join_club on join_club.membership_id = route.driver_id WHERE join_club.holder_id = ?", [req.params.id], function(err, rows){  
        if(err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) { 
          var mylifts = [];
          var passengers = [];
       //   var name = [];
          for (var k = 0; k < rows.length; k++){
     //       console.log("driver" + rows[].driver_id);
      //      console.log("driver" + rows[j].driver_id);
       //     name = rows[j].first_name + " " + rows[j].last_name;
            mylifts[k] = {return_trip: rows[k].return_trip, seats:rows[k].seats, pick_up_location:rows[k].pick_up_location, pick_up_time:rows[k].pick_up_time, pick_up_date:rows[k].pick_up_date, drop_off_location:rows[k].drop_off_location, drop_off_time:rows[k].drop_off_time, drop_off_date:rows[k].drop_off_date}
            route_id[k] = {route_id: rows[k].id}
            console.log("checkkkkk" + route_id[k].route_id);
               console.log("this" + route_id[k].route_id);
            db.all("SELECT first_name, last_name from seats INNER JOIN route on seats.route_id = route.id inner join person on person.id = seats.membership_id where route.id = ?", [route_id[k].route_id], function(err, rows){ 
           
              console.log(rows.length);
              if(err) {
                console.log("error:" + err);
                res.send("error");
                return;
              }
              if(rows.length > 0) { 
                var passengers = [];
                for (var i = 0; i < rows.length; i++){
                  passengers = rows[i].first_name + " " + rows[i].last_name;
                 
                  console.log("passengers " + JSON.stringify(passengers));
                }
                
              }else{
                console.log("blah");
                return;
              }
            }); 
           
          };
                            console.log(JSON.stringify(passengers));
           console.log("test here");
            res.render('mylifts', { id: req.params.id, club_id: req.params.club_id, route_id: route_id, mylifts: mylifts, passengers: passengers});
       
        }else{
          res.send('You have no lifts');
        }   
      });
    }else{
      res.render('login');
    };  
  });  

};  

