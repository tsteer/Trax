module.exports = function(router, db) {

  router.get("/editclub/:id", function(req, res, next) {
    db.all("select * from club where club_id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) {
      	res.render("editclub", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, id: rows[0].club_id}); 
      } else {
        res.send("no rows");
      }
    });
  });

  router.post("/editclub/:id", function(req, res, next) {
    response = {
      club_name:req.body.club_name,
      sport:req.body.sport,
      club_email:req.body.club_email
    };
    db.run("UPDATE club SET club_name = ?, sport = ?, club_email = ?", [response.club_name, response.sport, response.club_email], function(err, result){   
      if (err) { return next(err); }
      res.send("done");
    });
  });
};