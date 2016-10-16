module.exports = function(router, db){

  router.get("/joinclub/:id", function(req, res, next) {
    db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) {
        var first_name = rows[0].first_name;
        var id = rows[0].id;
        var clubs = [];
        db.all("select club_name from club", function(err, rows) {
          rows.forEach(function(row){
            clubs.push(row.club_name);
          });
          if (req.query.json) {
            res.send(JSON.stringify({success: true, first_name: first_name, id: id, clubs: clubs}));
          } else{
            res.render("joinclub", {first_name: first_name, id: id, clubs: clubs}); 
          }       
        }); 
      } else {
        if (req.query.json) {
          res.send(JSON.stringify({success: false, error: "no rows"}));
        } else{
          res.send("no rows");
        }    
      }
    });
  });

  router.post("/joinclub/:id", function(req, res, next){
    response = {
      clubs:req.body.clubs
    };
    db.all("select club_id from club WHERE club.club_name = ?", [response.clubs], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) {
        var club_id = rows[0].club_id;
        var stmt = db.run("INSERT INTO join_club (membership_id, holder_id, club_holder_id, on_committee) VALUES (NULL, ?, ?, ?)", [req.params.id, club_id, 'FALSE'], function(err, result){   
          if (err) { 
            return next(err); 
          }
        });
      } else {
        res.send(JSON.stringify({success: false, error: "no rows"}));
      }
      res.send(JSON.stringify({success: true, holder_id: req.params.id, club_holder_id: club_id, on_committee: false}));
    });
  });
};

