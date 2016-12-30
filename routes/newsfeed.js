module.exports = function(router, db, apiToken, querystring) {

  router.get('/newsfeed/:id', function(req, res, next) {
     db.all("select * from join_club left join club on club.club_id = join_club.club_holder_id WHERE join_club.holder_id = ?", [req.params.id], function(err, rows) {
      if (err) {
        console.log("error:" + err);
        res.send("error");
        return;
      }
      if (rows.length > 0) {
        var clubs = [];
        var club = {};
        rows.forEach(function(row){
          club = {club_id: row.club_id, club_name: row.club_name};
          clubs.push(club);
        });
        if (req.query.json) {
          res.send(JSON.stringify({success: true, club: club, clubs: clubs}));
        } else{
          res.render('newsfeed', {clubs: clubs, id: req.params.id}); 
        }       
      } else {
        if (req.query.json) {
          res.send(JSON.stringify({success: false, error: "no rows"}));
        } else{
          res.render('noclubs', { id: req.params.id});
        }    
      }; 
     }); 
  });		


    router.get("/newsfeed/:id/:club_id", function(req, res, next) {
           db.all("select * from newspost left join newsfeed on newsfeed.newsfeed_id = newspost.newsfeed left join person on person.id = newspost.holder_id WHERE newsfeed.club_holder_id = ?", [req.params.club_id], function(err, rows) {
            if (err) {
              console.log("error:" + err);
              res.send("error");
              return;
            }else{
              var posts = [];
              var post = {};
              rows.forEach(function(row){
                post = {post_id: row.post_id, post_text: row.post_text, holder_id: row.holder_id, date: row.date, first_name: row.first_name, last_name: row.last_name};
                posts.push(post);
              });
              console.log(JSON.stringify(posts));  
              res.render("newsfeedposts", {club_id: req.params.club_id, id: req.params.id, posts:posts});
           }; 
          });  
        }); 


};  



