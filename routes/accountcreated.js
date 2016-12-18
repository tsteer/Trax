module.exports = function(router, db, apiToken, querystring) {

  router.get('/accountcreated', function(req, res, next) {
    res.render('accountcreated');
  });		
};  

