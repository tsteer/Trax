module.exports = function(router, db, apiToken, querystring) {

  router.get("/committee/:id/:club_id/viewclub", function(req, res) {
    var members_list = [];
    var members = {};
    if (req.query.json) {
      var token = req.get('X-Auth-Token');
      var valid = apiToken.isTokenValid(token);
      if (valid) {
        db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.params.id, req.params.club_id], function(err, rows){
          if (err) {
            res.send("error");
            return;
          }
          if(rows[0].on_committee == 'TRUE'){ /* check user is committee member */
            db.all("SELECT * FROM join_club INNER JOIN person ON person.id = join_club.holder_id WHERE join_club.club_holder_id = ?", 
              [req.params.club_id], function(err, rows) { /* select all club members */
              if (err) {
                res.send("error");
                return;
              }
              if (rows.length > 0) {
                rows.forEach(function(row){ /* store each member data as object, add to array of all members */
                  members = {id: row.id, first_name: row.first_name, last_name: row.last_name, dob: row.dob, address: row.address, 
                    email: row.email, telephone: row.telephone, year: row.year, committee_role: row.committee_role};
                  members_list.push(members);
                });
                res.send(JSON.stringify({success: true, members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id}));
              } else{
                res.send(JSON.stringify({success: false, error: "no rows"})); 
              };  
            }); 
          }else{
            res.send("You must be a committee member in order to access this page");
          }; 
        });  
      }else{
        res.send(JSON.stringify({success: false, error: "login"}));
      };
    }
    else if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.params.id, req.params.club_id], function(err, rows){
        if (err) {
          res.send("error");
          return;
        }
        if(rows[0].on_committee == 'TRUE'){
          db.all("SELECT * FROM join_club INNER JOIN person ON person.id = join_club.holder_id WHERE join_club.club_holder_id = ?", [req.params.club_id], function(err, rows) {
            if (err) {
              console.log("error:" + err);
              res.send("error");
              return;
            }
            if (rows.length > 0) {
              rows.forEach(function(row){
                members = {id: row.id, first_name: row.first_name, last_name: row.last_name, dob: row.dob, address: row.address, email: row.email, telephone: row.telephone, year: row.year, committee_role: row.committee_role};
                members_list.push(members);
              });
              res.render("viewclub", {members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id}); 
            } else{
              res.render('noclubs', {id: req.params.id});
            };  
          }); 
        }else{
          res.render('nocommittee', {id: req.params.id});
        }; 
      });  
    }else{
      res.render('login');
    };   
  });
};