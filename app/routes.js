
module.exports = function(app) {
var md5 = require('MD5');

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/demo', function(req, res) {
		res.sendfile('./public/demo.html');
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});


	app.get('/api/getUser', function(req, res) {

	            // get the user starlord55
	            User.find({
	                username: req.param('username'),
	                password: md5(req.param('password')) 
	            }, function(err, user) {
	                if (err) throw err;

	                // object of the user
	                console.log(user);
	            });


	});
};