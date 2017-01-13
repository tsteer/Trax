module.exports = function(router, db, apiToken, querystring) {

  router.get("/clubs/:id", function(req, res) {
    if (req.query.json) {
      var token = req.get('X-Auth-Token');
      var valid = apiToken.isTokenValid(token);
      if (valid) { /* check valid mobile request */
         db.all("select * from club left join join_club on join_club.club_holder_id = club.club_id where join_club.holder_id = ?", [req.params.id], function(err, rows) {
        if (err) { /* select all clubs that user is a member of */
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) {
          var clubs = [];
          var club = {};
          rows.forEach(function(row){ /* store each club info as object, which is added to array of all clubs */
            club = {club_id: row.club_id, club_name: row.club_name};
            clubs.push(club);
          });
            res.send(JSON.stringify({success: true, clubs: clubs})); /* return object to mobile application */ 
        } else {
            res.send(JSON.stringify({success: false, error: "no rows"}));  
        }; 
      });
      }else{
        res.send(JSON.stringify({success: false, error: "login"}));
      };    
    }     
    else if(req.session.userid == req.params.id){ /* check user logged in to web application */
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
            res.render("clubs", {clubs: clubs, id: req.params.id});     
        } else {
            res.render('noclubs', {id:req.params.id});   
        }; 
      });
    }else{
      res.render('login');
    };    
  });





  router.get("/clubs/:id/:club_id", function(req, res, next) {
    if(req.session.userid == req.params.id){
      db.all("select * from club WHERE club_id = ?", [req.params.club_id], function(err, rows) {
        if (err) { /* select club information to be displayed */
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) {
          res.render("club", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: req.params.club_id, id: req.params.id});
        } else{
          res.render('noclubs', {id:req.params.id});
        };
      });  
    }else{
      res.render('login');
    };  
  });  
};