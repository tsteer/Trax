module.exports = function(router, db, apiToken, querystring) {

  router.get('/newclub/:id', function(req, res, next) {
    res.render('newclub', {id: req.params.id});
  });

  router.post('/newclub/:id', function(req, res, next) {
    var club_id_entered;
    response = {
      club_name:req.body.club_name,
      sport:req.body.sport,
      club_email:req.body.club_email
    };
    var stmt = db.run("INSERT INTO club VALUES (NULL, ?, ?, ?)", [response.club_name, response.sport, response.club_email], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error 1");
        return;
      }else{
        club_id_entered = this.lastID;
          var stmt = db.run("INSERT INTO join_club (membership_id, holder_id, club_holder_id, on_committee, committee_role) VALUES (NULL, ?, ?, ?, ?)", [req.params.id, this.lastID, 'TRUE', 'President'], function(err, result){ 
          if (err) {
            console.log("error:" + err);
            res.send("error");
            return;
          }else{
            var stmt = db.run("INSERT INTO newsfeed VALUES (NULL, ?)", [club_id_entered], function(err, result){ 
              if (err) {
                console.log("error:" + err);
                res.send("error");
                return;
              }else{
                res.render('clubadded', {id: req.params.id});
              };
            });
          };    
        }); 
      };
    });
  });  
};