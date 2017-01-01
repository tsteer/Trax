module.exports = function(router, db, apiToken, querystring) {

  router.get('/committee/:id/:club_id/statistics/:team_id/attendancestatistics/noevents', function(req, res, next) {
  	if(req.session.userid == req.params.id){ 
    	res.render('noevents');   
    }else{
      res.render('login');
    }; 	  
  });
}; 