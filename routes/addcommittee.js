module.exports = function(router, db, apiToken, querystring) {

  router.get("/committee/:id/:club_id/addcommittee", function(req, res, next) {
    if(req.session.userid == req.params.id){
      db.all("select on_committee from join_club where holder_id = ? and club_holder_id = ?", [req.params.id, req.params.club_id], function(err, rows) {
        if(rows[0].on_committee == 'TRUE'){ /* check user is on committee for club */
          db.all("select * from join_club left join person on join_club.holder_id = person.id where join_club.club_holder_id = ?", [req.params.club_id], function(err, rows) {
            if (err) { /* select all club members */
              console.log("error:" + err);
              res.send("error");
              return;
            }
            if (rows.length > 0) {
              var member = [];
              for (var j = 0; j < rows.length; j++){ /*store club member info as array of objects, to be passed to EJS */
                member[j] = {membership_id: rows[j].membership_id, first_name: rows[j].first_name, last_name: rows[j].last_name, email: rows[j].email};
              };  
              res.render("addcommittee", {holder_id: rows[0].holder_id, id: req.params.id, club_id: req.params.club_id, member: member}); 
            } else {
              res.render('login');
            }
          });
        }else{
          res.render('login');
        };  
      });
    }else{
      res.render('login');
    }; 
  });
};