module.exports = function(router, db, apiToken, querystring, security) {
  
  router.get('/', function(req, res, next) { /* front page of web application */
    res.render('index');
  });
};
