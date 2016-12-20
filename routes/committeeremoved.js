module.exports = function(router, db, apiToken, querystring) {
  router.get('/editclub/:id/:club_id/committeeremoved', function(req, res, next) {
    if(req.session.userid == req.params.id){
      db.run("UPDATE join_club SET on_committee = ?, committee_role = ? WHERE holder_id = ? and club_holder_id = ?", ['FALSE', null, req.params.id, req.params.club_id], function(err, result){   
        if (err) { 
          console.log("error:" + err);
          res.send("error");
          return next(err); 
        }else{
              console.log("remove check 2");
          res.render('committeeremoved', {id: req.params.id, club_id: req.params.club_id});
        };  
      });
    }else{
      res.render('login');
    }
  });  
}; 