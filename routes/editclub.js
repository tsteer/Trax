module.exports = function(router, db, apiToken, querystring) {

  router.get("/editclub/:id", function(req, res, next) {
    if(req.session.userid > 0){
      db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.session.userid, req.params.id], function(err, rows){
        if(rows[0].on_committee == 'TRUE'){
          db.all("select * from club where club_id = ?", [req.params.id], function(err, rows) {
            if (err) {
              console.log("error:" + err);
              res.send("error");
              return;
            }
            if (req.query.json) {
              if (rows.length > 0) {
                res.send(JSON.stringify({success: true, club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, id: rows[0].club_id}));
              } else{
                res.send(JSON.stringify({success: false, error: "no rows"}));
              }  
            } else {    
              if (rows.length > 0) { 
              	res.render("editclub", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, id: rows[0].club_id}); 
              } else {
                res.send("no rows");
              }
            }  
          });
        }else{
          res.send("You must be a committee member in order to access this page");
        }  
      });  
     }else{
      res.send("Please log in!");
    }     
  });

  router.post("/editclub/:id", function(req, res, next) {
    response = {
      club_name:req.body.club_name,
      sport:req.body.sport,
      club_email:req.body.club_email
    };
    if(req.session.userid > 0){
      db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.session.userid, req.params.id], function(err, rows){
        if(rows[0].on_committee == 'TRUE'){
          db.run("UPDATE club SET club_name = ?, sport = ?, club_email = ?", [response.club_name, response.sport, response.club_email], function(err, result){   
            if (err) { 
              console.log("error:" + err);
              res.send("error");
              return next(err); 
            }
            res.send(JSON.stringify({success: true, club_name: response.club_name, sport: response.sport, club_email: response.club_email}));
          });
        }else{
          res.send("You must be a committee member in order to access this page");
        }  
      });  
    }else{
      res.send("Please log in!");
    }      
  });
};





