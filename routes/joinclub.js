module.exports = function(router, db){

  router.get("/joinclub/:id", function(req, res, next) {
    if(req.session.userid == req.params.id){
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
            if (err) { /* display list of all clubs on TRAX */
              console.log("error:" + err);
              res.send("error");
              return;
            }else{
                rows.forEach(function(row){
                clubs.push(row.club_name);
              });
              if (req.query.json) { /* must be updated for further mobile development - mobile token must be validated in order to complete this request */
                res.send(JSON.stringify({success: true, first_name: first_name, id: id, clubs: clubs}));
              } else{
                res.render("joinclub", {first_name: first_name, id: id, clubs: clubs}); 
              }  
            };           
          }); 
        } else {
          if (req.query.json) { /* must be updated for further mobile development - mobile token must be validated in order to complete this request */
            res.send(JSON.stringify({success: false, error: "no rows"}));
          } else{
            res.render('login');
          };    
        };
      });
    } else{
      res.render('login');
    };    
  });

  router.post("/joinclub/:id", function(req, res, next){
    response = {
      clubs:req.body.clubs
    };
    if(req.session.userid == req.params.id){
      db.all("select club_id from club WHERE club.club_name = ?", [response.clubs], function(err, rows) {
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) {
          var club_id = rows[0].club_id;
          db.all("select * from join_club WHERE club_holder_id = ? and holder_id = ?", [club_id, req.params.id], function(err, rows) {
            if (err) {
              console.log("error:" + err);
              res.send("error");
              return;
            }
            if(rows.length > 0){ /* check user is not already member of club */
              res.render('currentmember', {id: req.params.id});
            }else{
              var stmt = db.run("INSERT INTO join_club (membership_id, holder_id, club_holder_id, on_committee) VALUES (NULL, ?, ?, ?)", [req.params.id, club_id, 'FALSE'], function(err, result){   
                if (err) { /* add member to club */
                  return next(err); 
                }else{
                  res.render('clubjoined', {success: true, id: req.params.id, club_holder_id: club_id, on_committee: false});
                };
              });  
            };
          });
        }else{
          res.render('noclubs', {id: req.params.id});
        };
      });
    }else{
      res.render('login');
    };    
  });
};
