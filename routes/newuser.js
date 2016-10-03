module.exports = function(router, db){

/* GET home page. */
router.get('/newuser', function(req, res, next) {
  res.render('newuser', { title: 'Express' });
});

router.post('/newuser', function(req, res, next) {
  response = {
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    dob:req.body.dob,
    address:req.body.address,
    email:req.body.email,
    telephone:req.body.telephone,
    year:req.body.year
  };
  var stmt = db.run("INSERT INTO person VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)", [response.first_name, response.last_name, response.dob, response.address, response.email, response.telephone, response.year]);
  console.log(response);
  res.end(JSON.stringify(response));
});

};