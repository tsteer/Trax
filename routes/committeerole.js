 module.exports = function(router, db, apiToken, querystring) {

    router.get('/committee/:id/:club_id/addcommittee/:membership_id/committeerole', function(req, res, next) {
      res.render("committeerole", {membership_id: req.params.membership_id, id: req.params.id, club_id: req.params.club_id});
    });  


 router.post("/committee/:id/:club_id/addcommittee/:membership_id/committeerole", function(req, res, next) {
    response = {
      committee_role:req.body.committee_role
    };
    if(req.session.userid == req.params.id){
      db.run("UPDATE join_club SET on_committee = ?, committee_role = ? WHERE membership_id = ?", ['TRUE', response.committee_role, req.params.membership_id], function(err, result){   
        if (err) { 
          console.log("error:" + err);
          res.send("error");
          return next(err); 
        }else{
          res.render("committeeadded", {membership_id: req.params.membership_id, id: req.params.id, club_id: req.params.club_id});
        };
      // res.send(JSON.stringify({success: true, membership_id: response.membership_id, committee_role: response.committee_role}));
      });
    } else{
      res.send("Please log in");
    };    
  }); 
}; 