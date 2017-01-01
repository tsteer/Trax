module.exports = function(router, db, apiToken, querystring) {

  router.get('/nouser', function(req, res, next) {
    res.render('nouser');    
  });
}; 