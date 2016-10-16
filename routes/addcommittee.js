module.exports = function(router, db) {

  router.get("/addcommittee/:id", function(req, res, next) {
    db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) {
      	res.render("addcommittee", {id: rows[0].id}); 
      } else {
        res.send("no rows");
      }
    });
  });

  router.post("/addcommittee/:id", function(req, res, next) {
    response = {
      membership_id:req.body.membership_id,
      committee_role:req.body.committee_role
    };
    db.run("UPDATE join_club SET on_committee = ?, committee_role = ? WHERE membership_id = ?", ['TRUE', response.committee_role, response.membership_id], function(err, result){   
      if (err) { 
        console.log("error:" + err);
        res.send("error");
        return next(err); 
      }
      res.render("committeeadded", {membership_id: response.membership_id, committee_role: response.committee_role});
    // res.send(JSON.stringify({success: true, membership_id: response.membership_id, committee_role: response.committee_role}));
    });
  });
};



