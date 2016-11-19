module.exports = function(router, db, apiToken, querystring) {

  router.get("/addcommittee/:id", function(req, res, next) {

    db.all("select * from join_club where membership_id = ?", [req.params.id], function(err, rows) {
      if(req.session.userid == req.params.id){
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (rows.length > 0) {
          if(rows[0].on_committee == 'TRUE'){
           console.log("true" + rows[0].on_committee);
        	 res.render("addcommittee", {holder_id: rows[0].holder_id}); 
          }  else {
          res.send("You must be a committee member in order to access this page");
        }
        } else {
          res.send("No rows");
        }
      }else{
        res.send("Please log in");
      };  
    });
  });

  router.post("/addcommittee/:id", function(req, res, next) {
    response = {
      membership_id:req.body.membership_id,
      committee_role:req.body.committee_role
    };
    if(req.session.userid == req.params.id){
      db.run("UPDATE join_club SET on_committee = ?, committee_role = ? WHERE membership_id = ?", ['TRUE', response.committee_role, response.membership_id], function(err, result){   
        if (err) { 
          console.log("error:" + err);
          res.send("error");
          return next(err); 
        }else{
          res.render("committeeadded", {membership_id: response.membership_id, committee_role: response.committee_role});
        };
      // res.send(JSON.stringify({success: true, membership_id: response.membership_id, committee_role: response.committee_role}));
      });
    } else{
      res.send("Please log in");
    };    
  });
};



