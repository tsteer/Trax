module.exports = function(router, db) {

  router.get("/people/:id", function(req, res) {
    db.all("select * from person where id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (req.query.json) {
        if (rows.length > 0) {
          res.send(JSON.stringify({success: true, first_name: rows[0].first_name, last_name: rows[0].last_name, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year}));
        } else {
          res.send(JSON.stringify({success: false, error: "no rows"}));
        }
      } else {
        if (rows.length > 0) {
          res.render("people", {first_name: rows[0].first_name, last_name: rows[0].last_name, dob: rows[0].dob, address: rows[0].address, email: rows[0].email, telephone: rows[0].telephone, year: rows[0].year});
        } else {
          res.send("no rows");
        }
      }
    });
  });
};