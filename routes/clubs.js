module.exports = function(router, db, apiToken, querystring) {

  router.get("/clubs/:id", function(req, res) {
    db.all("select * from club left join join_club on join_club.club_holder_id = club.club_id where join_club.holder_id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) {
        var clubs = [];
        var club = {};
        rows.forEach(function(row){
          club = {club_id: row.club_id, club_name: row.club_name};
          clubs.push(club);
        });
        if (req.query.json) {
          res.send(JSON.stringify({success: true, club: club, clubs: clubs}));
        } else{
          res.render("clubs", {clubs: clubs, id: req.params.id}); 
        }       
      } else {
        if (req.query.json) {
          res.send(JSON.stringify({success: false, error: "no rows"}));
        } else{
          res.render('noclubs', {id:req.params.id});
        }    
      }; 
    });
  });

  router.get("/clubs/:id/:club_id", function(req, res, next) {
     db.all("select on_committee from join_club WHERE club_holder_id = ? and holder_id = ?", [req.params.club_id, req.params.id], function(err, rows) {
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        } else{
          var committee = rows[0].on_committee;
           db.all("select * from club WHERE club_id = ?", [req.params.club_id], function(err, rows) {
            if (err) {
              console.log("error:" + err);
              res.send("error");
              return;
            }
            if(committee == 'TRUE'){
              console.log(rows[0].on_committee);
              res.render("clubcommittee", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: req.params.club_id, id: req.params.id});
            }else{
              console.log(rows[0].on_committee);
              res.render("club", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: req.params.club_id, id: req.params.id});
            }
          });  
        }
        /*
    db.all("select * from club WHERE club_id = ?", [req.params.club_id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      } else{
          db.all("select on_committee from join_club WHERE club_holder_id = ? and holder_id = ?", [req.params.club_id, req.params.id], function(err, rows) {
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        } 
        if(rows[0].on_committee == 'TRUE'){
          console.log(rows[0].on_committee);
          res.render("clubcommittee", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: rows[0].club_id, id: req.params.id});
        }else{
                    console.log(rows[0].on_committee);
          res.render("club", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: rows[0].club_id, id: req.params.id});
        }
      });
      }
/*
     if (req.query.json) {
        if (rows.length > 0) {
          res.send(JSON.stringify({success: true, club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: rows[0].club_id}));
        }  else{
          res.send(JSON.stringify({success: false, error: "no rows"}));
        }
      }else{  
        if (rows.length > 0) {
          res.render("club", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: rows[0].club_id, id: req.params.id});
        } else {
          res.render('noclubs', {id:req.params.id});
        }
      } */
    });  
  });  
/*
  router.post("/clubs/:id/:club_id", function(req, res, next){
    if(req.session.userid > 0){
      var stmt = db.run("INSERT INTO join_club (membership_id, holder_id, club_holder_id, on_committee) VALUES (NULL, ?, ?, ?)", [req.session.userid, req.params.club_id, 'FALSE'], function(err, result){   
        if (err) { 
          console.log("error:" + err);
          res.send("error");
          return;
        } else{
          res.send(JSON.stringify({success: true, holder_id: req.session.userid, club_holder_id: req.params.id, on_committee: false, id: req.session.id}));
        }
      });   
    }else{
      res.send("Please log in!");
    }       
  });  */
};

