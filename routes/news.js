module.exports = function(router, db, apiToken, querystring) {

  router.get('/news/', function(req, res, next) {
    res.render('news', { title: 'Express' });
  });
};