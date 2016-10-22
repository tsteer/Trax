module.exports = function(router, db) {

  router.get("/clubs", function(req, res) {
    db.all("select * from club", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
   /*   if (req.query.json) {
        if (rows.length > 0) {
          res.send(JSON.stringify({success: true, club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email}));
        }  else{
          res.send(JSON.stringify({success: false, error: "no rows"}));
        }
      }else{  
        if (rows.length > 0) {
        	res.render("clubs", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email});
        } else {
          res.send("no rows");
        }
      } */
      if (rows.length > 0) {
        //  var first_name = rows[0].first_name;
         // var id = rows[0].id;
          var clubs = [];
          var club = {};
          rows.forEach(function(row){
            club = {club_id: row.club_id, club_name: row.club_name};
            clubs.push(club);
          });
          if (req.query.json) {
              res.send(JSON.stringify({success: true, club: club, clubs: clubs}));
            } else{
              res.render("clubs", {clubs: clubs}); 
          }       
      } else {
          if (req.query.json) {
            res.send(JSON.stringify({success: false, error: "no rows"}));
          } else{
            res.send("no rows");
          }    
      }; 
    });
  });

  router.get("/clubs/:id", function(req, res, next) {
    db.all("select * from club WHERE club_id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
     if (req.query.json) {
        if (rows.length > 0) {
          res.send(JSON.stringify({success: true, club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: rows[0].club_id}));
        }  else{
          res.send(JSON.stringify({success: false, error: "no rows"}));
        }
      }else{  
        if (rows.length > 0) {
          res.render("club", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: rows[0].club_id});
        } else {
          res.send("no rows");
        }
      } 
    });  
  });  

  router.post("/clubs/:id", function(req, res, next){
    console.log(req.session.userid);
    console.log(req.params.id);
    if(req.session.userid > 0){
      var stmt = db.run("INSERT INTO join_club (membership_id, holder_id, club_holder_id, on_committee) VALUES (NULL, ?, ?, ?)", [req.session.userid, req.params.id, 'FALSE'], function(err, result){   
        if (err) { 
          console.log("error:" + err);
          res.send("error");
          return;
        } else{
          res.send(JSON.stringify({success: true, holder_id: req.session.userid, club_holder_id: req.params.id, on_committee: false}));
        }
      });   
    }else{
      res.send("Please log in!");
    }       
  });  
};

