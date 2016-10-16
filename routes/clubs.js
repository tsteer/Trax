module.exports = function(router, db) {

  router.get("/clubs/:id", function(req, res) {
    db.all("select * from club where club_id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (req.query.json) {
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
      }  
    });
  });
};

