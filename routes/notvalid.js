module.exports = function(router, db, apiToken, querystring) {

  router.get('/newuser/notvalid', function(req, res, next) {
    res.render('notvalid');     
  });
}; 