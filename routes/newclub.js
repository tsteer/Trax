module.exports = function(router, db, apiToken, querystring) {

  router.get('/newclub/:id', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      res.render('newclub', {id: req.params.id});
    }else{
      res.render('login');
    };
  });

  router.post('/newclub/:id', function(req, res, next) {
    var club_id_entered;
    response = {
      club_name:req.body.club_name,
      sport:req.body.sport,
      club_email:req.body.club_email
    };
    if (req.query.json) {
      var token = req.get('X-Auth-Token');
      var valid = apiToken.isTokenValid(token);
      if (valid) { /* cehck valid mobile token */
        db.run("BEGIN TRANSACTION");
        var stmt = db.run("INSERT INTO club VALUES (NULL, ?, ?, ?)", [response.club_name, response.sport, response.club_email], function(err, rows) {
          if (err) { /* create new club using inputted data */
            db.run("ROLLBACK"); 
            console.log("error:" + err);
            res.send("error");
            return;
          }else{
            club_id_entered = this.lastID;
              var stmt = db.run("INSERT INTO join_club (membership_id, holder_id, club_holder_id, on_committee, committee_role) VALUES (NULL, ?, ?, ?, ?)", [req.params.id, this.lastID, 'TRUE', 'President'], function(err, result){ 
              if (err) { /* add user as club member and president of committee */
                db.run("ROLLBACK"); 
                console.log("error:" + err);
                res.send("error");
                return;
              }else{
                var stmt = db.run("INSERT INTO newsfeed VALUES (NULL, ?)", [club_id_entered], function(err, result){ 
                  if (err) { /* create newsfeed for club */
                    db.run("ROLLBACK"); 
                    console.log("error:" + err);
                    res.send("error");
                    return;
                  }else{
                    db.run("COMMIT TRANSACTION");
                    res.send(JSON.stringify({success: true})); /* return object to mobile application */
                  };
                });
              };    
            }); 
          };
        });
      }else{
        res.send(JSON.stringify({success: false, error: "login"}));
      };
    }  
    else if(req.session.userid == req.params.id){ /* check valid web session */
      db.run("BEGIN TRANSACTION");
      var stmt = db.run("INSERT INTO club VALUES (NULL, ?, ?, ?)", [response.club_name, response.sport, response.club_email], function(err, rows) {
        if (err) {
          db.run("ROLLBACK"); 
          console.log("error:" + err);
          res.send("error 1");
          return;
        }else{
          club_id_entered = this.lastID;
            var stmt = db.run("INSERT INTO join_club (membership_id, holder_id, club_holder_id, on_committee, committee_role) VALUES (NULL, ?, ?, ?, ?)", [req.params.id, this.lastID, 'TRUE', 'President'], function(err, result){ 
            if (err) {
              db.run("ROLLBACK"); 
              console.log("error:" + err);
              res.send("error");
              return;
            }else{
              var stmt = db.run("INSERT INTO newsfeed VALUES (NULL, ?)", [club_id_entered], function(err, result){ 
                if (err) {
                  db.run("ROLLBACK"); 
                  console.log("error:" + err);
                  res.send("error");
                  return;
                }else{
                  db.run("COMMIT TRANSACTION");
                  res.render('clubadded', {id: req.params.id});
                };
              });
            };    
          }); 
        };
      });
    }else{
      res.render('login');
    };  
  });  
};