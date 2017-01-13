module.exports = function(router, db, apiToken, querystring) {

  router.get('/newsfeed/:id/:club_id/:post_id/postdeleted', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.run("DELETE from newspost WHERE post_id = ?", [req.params.post_id], function(err, rows){
        if (err) { 
          return next(err); 
        } else{
          res.render('postdeleted', { id: req.params.id, club_id: req.params.club_id, post_id: req.params.post_id});
        }
      }); 
    } else{
      res.render('login');
    }; 
  });   
};  

