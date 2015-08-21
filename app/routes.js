    var dbSchemas = require('./models/jv')
    var md5 = require('MD5');
    var mongo = require('mongoose')
    var fs = require('fs');
    var path = require('path');
    module.exports = function(app) {
        // server routes ===========================================================
        // handle things like api calls
        // Creating a Sample Emp
        app.get('/api/createEmp', function(req, res) {

            var newEmp = dbSchemas.emps({
                // create a user using schema
                fname: 'amit',
                lname: 'dwivedi'
            });

            // save the user
            newEmp.save(function(err) {
                if (err) throw err;

                console.log('Emp created!');
                res.send('Emp Created');
            });
        });

        app.get('/api/getEmp', function(req, res) {

            dbSchemas.emps.find({}, function(err, emplist) {
                // get the Emp
                if (err) throw err;
                res.json(emplist);
            });
        });

        // Authenticating a User
        app.post('/api/logincheck', function(req, res) {
            //res.send('UserName:' + req.param('username') + ' Password: '+req.param('password'));
            console.log(req.body);
            dbSchemas.users.find({
                name: req.body.username
            }, function(err, user) {
                if (err) throw err;
                // object of the user
                console.log(user);
                res.json(user);
            });

        });

        // Check user exists
        app.get('/api/checkemailid', function(req, res) {
            console.log(req);
            dbSchemas.users.find({
                email: req.query.email || req.params.email
            }, function(err, user) {
                if (err) throw err;
                // object of the user
                //console.log(user);
                res.json(user);
            });

        });

        // Get User types
        app.get('/api/getusertypes', function(req, res) {
            dbSchemas.usertypes.find({}, function(err, usertypeslist) {
                // get the Emp
                if (err) throw err;
                res.json(usertypeslist);
            });
        });

        // add a new user
        app.post('/api/adduser', function(req, res) {
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

        // Getting all the css used for the application
        app.get('/api/getcss/', function(req, res) {

            function getFiles(srcpath) {
                return fs.readdirSync(srcpath).filter(function(file) {
                    return fs.statSync(path.join(srcpath, file)).isFile();
                });
            }
            var callbackfn = req.query.callback,
                path2 = path.join(__dirname, '../.', '/public/assets/css/compiled/'),
                cssString = "",
                arrFileNames = getFiles(path2),
                output = [];

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
