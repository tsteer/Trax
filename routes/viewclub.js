module.exports = function(router, db, apiToken, querystring) {

  router.get("/committee/:id/:club_id/viewclub", function(req, res) {
    var members_list = [];
    var members = {};
    if(req.session.userid == req.params.id){ 
      db.all("SELECT * FROM join_club WHERE holder_id = ? AND club_holder_id = ?", [req.params.id, req.params.club_id], function(err, rows){
        if(rows[0].on_committee == 'TRUE'){
            db.all("SELECT * FROM join_club INNER JOIN person ON person.id = join_club.holder_id WHERE join_club.club_holder_id = ?", [req.params.id], function(err, rows) {
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
                if (req.query.json) {
                  res.send(
                  JSON.stringify({success: true, members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id}));
                } else{
                  res.render("viewclub", {members: members, members_list: members_list, id: req.params.id, club_id: req.params.club_id});
                }  
              } else{
                if (req.query.json) {
                  res.send(JSON.stringify({success: false, error: "no rows"}));
                } else{
                  res.send("no rows");
                }  
              }  
            }); 
        }else{
          res.send("You must be a committee member in order to access this page");
        }; 
      });  
    }else{
      res.render('login');
    }   
  });
};