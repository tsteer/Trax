module.exports = function(router, db, apiToken, querystring) {

  router.get("/committee/:id/:club_id/editclub", function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.params.id, req.params.club_id], function(err, rows){
        if(rows[0].on_committee == 'TRUE'){ /* check user is committee member of given club */
          db.all("select * from club where club_id = ?", [req.params.id], function(err, rows) {
            if (err) { /* select club data to be displayed as placeholder on edit club form */
              console.log("error:" + err);
              res.send("error");
              return;
            }
            if (req.query.json) {
              if (rows.length > 0) {
                res.send(JSON.stringify({success: true, club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: req.params.club_id, id: req.params.id}));
              } else{
                res.send(JSON.stringify({success: false, error: "no rows"}));
              }  
            } else {    
              if (rows.length > 0) { 
              	res.render("editclub", {club_name: rows[0].club_name, sport: rows[0].sport, club_email: rows[0].club_email, club_id: req.params.club_id, id: req.params.id}); 
              } else {
                res.send("no rows");
              };
            };  
          });
        }else{
          res.send("You must be a committee member in order to access this page");
        };  
      });  
     }else{
      res.send("Please log in!");
    };     
  });

  router.post("/committee/:id/:club_id/editclub", function(req, res, next) {
    response = {
      club_name:req.body.club_name,
      sport:req.body.sport,
      club_email:req.body.club_email
    };
    if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.params.id, req.params.club_id], function(err, rows){
        if(rows[0].on_committee == 'TRUE'){ /* check user is committee member of given club */
          db.run("UPDATE club SET club_name = ?, sport = ?, club_email = ? where club_id = ?", [response.club_name, response.sport, response.club_email, req.params.club_id], function(err, result){   
            if (err) {  /* update club with responses entered on edit club form */
              console.log("error:" + err);
              res.send("error");
              return next(err); 
            }else{
              res.render('clubedited', {id: req.params.id, club_id: req.params.club_id});
            };
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