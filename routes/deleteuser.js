
module.exports = function(router, db) {

/*
router.get('/', function(req, res, next) {
  res.render('deleteuser', { title: 'Express', people: [ ] //CHANGE THIS
  });
}); 
*/

router.get('/deleteuser', function(req, res, next){
	db.run("DELETE from person WHERE first_name = ?", ["test2"], function(err, rows){
		if (err) {
			console.log("error in delete: " + err);
		}
	});
	console.log("done"); 
	res.send("We deleted a user");
});

};
