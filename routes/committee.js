module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id', function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.all("select * from join_club left join club on club.club_id = join_club.club_holder_id WHERE join_club.holder_id = ? and join_club.on_committee = ?", [req.params.id, 'TRUE'], function(err, rows) {
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
            res.render('committee', {clubs: clubs, id: req.params.id}); 
          }       
        }else {
          if (req.query.json) {
            res.send(JSON.stringify({success: false, error: "no rows"}));
          }else{
            res.render('nocommittee', { id: req.params.id});
          }    
        }; 
      }); 
    }else{
      res.render('login');
    };   
  });		

  router.get("/committee/:id/:club_id", function(req, res, next) {
    if(req.session.userid == req.params.id){ 
      db.all("select * from club WHERE club_id = ?", [req.params.club_id], function(err, rows) {
        if (err) {
          console.log("error:" + err);
          res.send("error");
           return;
        }
        if (rows.length > 0) {
          res.render("committeeview", {club_name: rows[0].club_name, club_id: req.params.club_id, id: req.params.id});
        }else{
          res.render('nocommittee', { id: req.params.id});
        };
      });  
    }else{
      res.render('login');
    }; 
  });
};  