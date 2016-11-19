module.exports = function(router, db, apiToken, querystring) {

  router.get('/deleteusercheck/:id', function(req, res, next) {
    res.render('deleteusercheck', {id: req.session.id});
  });
 }; 