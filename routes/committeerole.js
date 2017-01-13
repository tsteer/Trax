 module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/addcommittee/:membership_id/committeerole', function(req, res, next) {
    if(req.session.userid == req.params.id){
      res.render("committeerole", {membership_id: req.params.membership_id, id: req.params.id, club_id: req.params.club_id});
    }else{
      res.send("Please log in");
    };   
  });  

  router.post("/committee/:id/:club_id/addcommittee/:membership_id/committeerole", function(req, res, next) {
    response = {
      committee_role:req.body.committee_role
    };
    if(req.session.userid == req.params.id){
      db.run("UPDATE join_club SET on_committee = ?, committee_role = ? WHERE membership_id = ?", ['TRUE', response.committee_role, req.params.membership_id], function(err, result){   
        if (err) { /* add new committee member, with committee role entered */
          console.log("error:" + err);
          res.send("error");
          return next(err); 
        }else{
          res.render("committeeadded", {membership_id: req.params.membership_id, id: req.params.id, club_id: req.params.club_id});
        };
      });
    }else{
      res.send("Please log in");
    };    
  }); 
}; 