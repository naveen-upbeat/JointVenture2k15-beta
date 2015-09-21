    var dbSchemas = require('./models/jv')
    var recaptcha_async = require('recaptcha-async');
    var recaptcha = new recaptcha_async.reCaptcha();
    var session = require('express-session');
    var md5 = require('md5');
    var mongo = require('mongoose')
    var fs = require('fs');
    var path = require('path');
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'techcompeers@gmail.com',
            pass: 'techCompeers2k15'
        }
    });
    module.exports = function(app) {
        var sess;
        app.use(session({
            secret: 'ssshhhhh'
        }));
        // server routes ===========================================================
        // handle things like api calls
        
        app.get('/api/getcities', function(req, res) {
            //console.log('getting cities',dbSchemas.LOOKUP_CITY);
            dbSchemas.LOOKUP_CITY.find({}, function(err, citylist) {
                // get the Emp
                if (err) throw err;
                console.log(citylist);
                res.json(citylist);
            });
        });

        app.get('/api/get_usersession_data', function(req, res) {
            res.json(req.session);
        });

        app.get('/api/logoutuser', function(req, res) {
            sess = req.session;
            sess.user_data = {};
            res.json(sess);
        });

        // Authenticating a User
        app.post('/api/verifyuser', function(req, res) {
            sess = req.session;
            //res.send('UserName:' + req.param('username') + ' Password: '+req.param('password'));
            //console.log(req.body);
            dbSchemas.USER.find({
                email: req.body.username
            }, function(err, user) {
                if (err) throw err;
                //console.log(user[0].password_hash);
                // object of the user
                if (user.length > 0) {
                    var passwordHash = md5(req.body.password + user[0].create_date.getTime());
                    //console.log('password',req.body.password,'text',req.body.password + user[0].create_date.getTime(),'hash',passwordHash);
                    //console.log('success');
                    //console.log(user2);
                    if (user[0].password_hash === passwordHash) {
                        sess.user_data = user[0];
                        res.json(user);
                    } else {
                        res.json([]);
                    }
                } else {
                    res.json([]);
                }
            });
        });

        // Check user exists
        app.get('/api/checkemailid', function(req, res) {
            //console.log(req);
            dbSchemas.USER.find({
                email: req.query.email || req.params.email
            }, function(err, user) {
                if (err) throw err;
                // object of the user
                //console.log(user);
                res.json(user);
            });

        });
        // Get md5 of text passed
        app.get('/api/md5', function(req, res) {
            var md5Text = md5(req.param('md5'));
            //console.log(md5Text);
            res.send(md5Text)
        });

        // Get User types
        app.get('/api/getusertypes', function(req, res) {
            dbSchemas.USERTYPE.find({}, function(err, usertypeslist) {
                // get the Emp
                if (err) throw err;
                res.json(usertypeslist);
            });
        });

        // add a new user
        app.post('/api/adduser', function(req, res) {
            //res.send('UserName:' + req.param('username') + ' Password: '+req.param('password'));
            //console.log(req.body);
            User.find({
                name: req.body.username
            }, function(err, user) {
                if (err) throw err;
                // object of the user
                //console.log(user);
                res.json(user);
            });

        });

        // Get User types
        app.post('/api/get_jointventure_results', function(req, res) {
            var result_criteria = req.body;


            dbSchemas.VENTURE.find({}, function(err, usertypeslist) {
                // get the Emp
                if (err) throw err;
                res.json(usertypeslist);
            });
        });


        app.post('/api/sendmail', function(req, res) {
            var userEmail = req.body.username;

            transporter.sendMail({
                from: 'techcompeers@gmail.com',
                to: userEmail,
                subject: 'Password Reset | JointVenture2k15',
                text: 'You forgot your password. Please reset your password by clicking here.'
            }, function(err, info){
                //console.log('email sent');
                //console.log(err,info);
            });

            res.send(transporter);

        });

        app.get('/api/captcha', function(req, res) {

            mypublickey = '6LdQ_QsTAAAAAM8IyCCqBrm8LMQVYkcZzZ0mQe_q';
            myprivatekey = '6LdQ_QsTAAAAAGA7JDUv3UNyzvfv3bFceoFfpfBS';

            recaptcha.on('data', function(res) {
                if (res.is_valid)
                    html = "valid answer";
                else
                    html = recaptcha.getCaptchaHtml(mypublickey, res.error);
            });

            recaptcha.checkAnswer(myprivatekey,
                req.connection.remoteAddress,
                req.body.recaptcha_challenge_field,
                req.body.recaptcha_response_field);
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
