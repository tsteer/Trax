module.exports = function(router, db, apiToken, querystring) {

  router.get("/committee/:id/:club_id/statistics/:team_id/addevent/:event_id/memberattendance", function(req, res) {
  	if(req.session.userid == req.params.id){ 
    	res.render('memberattendance', , { id: req.params.id, club_id: req.params.club_id, team_id: req.params.team_id, event_id: req.params.event_id});
    }else{
    	res.render('login');
    };
  });
};