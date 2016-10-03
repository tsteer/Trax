module.exports = function(router, db){

router.get('/edituser', function(req, res, next) {
  res.render('edituser', { title: 'Express' });
});
};