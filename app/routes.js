    var dbSchemas = require('./models/jv')
    var md5 = require('MD5');
    var mongo = require('mongoose')
    var fs = require('fs');
    var path = require('path');
    module.exports = function(app) {
        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        app.get('/api/createSampleUser', function(req, res) {

            // get the user starlord55            
            var newuser = dbSchemas.users({
                // create a user using schema
                name: 'amit'
            });

            // save the user
            newuser.save(function(err) {
                if (err) throw err;

                console.log('User created!');
                res.send('User Created');
            });
        });
        app.get('/api/createEmp', function(req, res) {

            // get the user starlord55            
            var newuser2 = dbSchemas.emp({
                // create a user using schema
                fname: 'amit',
                lname:'dwivedi'
            });

            // save the user
            newuser2.save(function(err) {
                if (err) throw err;

                console.log('Emp created!');
                res.send('Emp Created');
            });
        });

        app.post('/api/logincheck', function(req, res) {
            //res.send('UserName:' + req.param('username') + ' Password: '+req.param('password'));
            console.log(req.body);
            User.find({
            name: req.body.username
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

        app.get('/api/getcss/', function(req, res) {

            function getFiles(srcpath) {
                return fs.readdirSync(srcpath).filter(function(file) {
                    return fs.statSync(path.join(srcpath, file)).isFile();
                });
            }
            var callbackfn = req.query.callback;
            var path2 = path.join(__dirname, '../.', '/public/assets/css/compiled/'),
                cssString = "",
                arrFileNames = getFiles(path2);
            var output = [];
            for (var i = 0; i < arrFileNames.length; i++) {
                var print = {
                    "filename": arrFileNames[i]
                };
                output.push(print);
            }
            output = JSON.stringify(output);
            var myjson = '{"status" : "success","data" : ' + output + ' }';
            res.send(callbackfn + '(' + myjson + ')');
        });
        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html');
        });
    }
