module.exports = function(router, db, apiToken, querystring, security) {
  
  router.get('/', function(req, res, next) {
    res.render('index');
  });
};
