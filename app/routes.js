    var User = require('./models/jv')
    var md5 = require('MD5');
    module.exports = function(app) {
        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.get('/api/getUser', function(req, res) {

            // get the user starlord55
            User.find({
                username: req.param('username')
                
            }, function(err, user) {
                if (err) throw err;
                // object of the user
                console.log(user);
                res.json(user);
            });
        });

        app.get('/api/insertDummy', function(req, res) {

            // get the user starlord55
            var newuser = User({
                // create a schema
                name: 'Dummy name 1',
                username: 'Dummy1',
                password: 'mypassword',
                admin: true,
                location: "bangalore",
                meta: {
                    age: 30,
                    website: "www.locahost.com",
                    address: "localhost"
                },
                created_at: new Date(),
                updated_at: new Date()
            });


            // save the user
            newuser.save(function(err) {
                if (err) throw err;

                console.log('User created!');
                res.send('User Created');
            });
        }, function(err, user) {
            if (err) throw err;

            // object of the user
            console.log(user);

        });

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html');
        });
    }
