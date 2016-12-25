module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics/:team_id/addevent/:event_id/eventdetails/eventmembersadded', function(req, res, next) {
 		if(req.session.userid == req.params.id){ 
 			console.log("test3");
      res.render('eventmembersadded', { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id});
    } else{
			res.render('login');
    };     
  });

}; 