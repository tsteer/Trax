module.exports = function(router, db, apiToken, querystring) {

  router.get("/newsfeed/:id/:club_id/:post_id/editpost", function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.all("select * from newspost where post_id = ?", [req.params.post_id], function(err, rows) {
        if (err) {
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if (req.query.json) {      
          if (rows.length > 0) {
            res.send(JSON.stringify({success: true, id: req.params.id, club_id: req.params.club_id, post_id: req.params.post_id, post_text: rows[0].post_text})); 
          } else{
            res.send(JSON.stringify({success: false, error: "no rows"}));
          }   
        } else {
          if (rows.length > 0) { 
          	res.render("editpost", {id: req.params.id, club_id: req.params.club_id, post_id: req.params.post_id, post_text: rows[0].post_text}); 
          } else {
            res.send("no rows");
          }
        }  
      });
    } else{
      res.send("Please log in!");
    };
  });

  router.post("/newsfeed/:id/:club_id/:post_id/editpost", function(req, res, next) { 
    response = {
      post_text:req.body.post_text
    };
    if(req.session.userid == req.params.id){
      db.run("UPDATE newspost SET post_text = ? WHERE post_id = ?", [response.post_text, req.params.post_id], function(err, result){   
        if (err) { 
          return next(err); 
        }else{
          res.render('postedited', {id: req.params.id, club_id: req.params.club_id, post_id: req.params.post_id});
        }
      });
    }else{
      res.send("Please log in!");
    };  
  });

  router.get('/newsfeed/:id/:club_id/:post_id/deletepost', function(req, res){
    res.render('deletepost', {id: req.params.id, club_id: req.params.club_id, post_id: req.params.post_id});
  });
};