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
    db.all("select * from club WHERE club_id = ?", [req.params.club_id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }else{
        res.render("club", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: req.params.club_id, id: req.params.id});
      }
    });  
  });  
};