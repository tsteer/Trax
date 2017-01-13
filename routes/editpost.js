module.exports = function(router, db, apiToken, querystring) {

  router.get("/newsfeed/:id/:club_id/:post_id/editpost", function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.all("select holder_id from newspost where post_id = ?", [req.params.post_id], function(err, rows) {
        if (err) { /* find user that posted id */
          console.log("error:" + err);
          res.send("error");
          return;
        }
        if(rows[0].holder_id == req.params.id){ /* if post was made by current user, select post data and direct to edit page */
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
                res.render('noposts', {club_id: req.params.club_id, id: req.params.id});
              };
            };  
          });
        }else{ /* if post was made by different user, direct them to page telling user they have no access to edit this post */
          res.render('noeditpost', {id: req.params.id, club_id: req.params.club_id, post_id: req.params.post_id});
        };
      });   
    } else{
      res.render('login');
    };
  });

  router.post("/newsfeed/:id/:club_id/:post_id/editpost", function(req, res, next) { 
    response = {
      post_text:req.body.post_text
    };
    if(req.session.userid == req.params.id){
      db.run("UPDATE newspost SET post_text = ? WHERE post_id = ?", [response.post_text, req.params.post_id], function(err, result){   
        if (err) { /* update post with new test entered */
          return next(err); 
        }else{
          res.render('postedited', {id: req.params.id, club_id: req.params.club_id, post_id: req.params.post_id});
        };
      });
    }else{
      res.render('login');
    };  
  });

  router.get('/newsfeed/:id/:club_id/:post_id/deletepost', function(req, res){
    if(req.session.userid == req.params.id){
      res.render('deletepost', {id: req.params.id, club_id: req.params.club_id, post_id: req.params.post_id});
    }else{
      res.render('login');
    }; 
  });
};