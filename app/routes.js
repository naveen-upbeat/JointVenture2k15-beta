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
    var https = require('https');
    module.exports = function(app) {
        var sess;
        app.use(session({
            secret: 'ssshhhhh2',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
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
            var status_locked;
            dbSchemas.STATUS.find({
                'status_label': 'user_locked'
            }, function(err, status) {
                status_locked = status[0].id;
            });
            var fn_increment_invalid_login_attempt = function(id) {
                dbSchemas.USER.update({
                    id: id
                }, {
                    $inc: {
                        login_attempt: 1
                    }
                }, function(err, user) {

                });
            }
            dbSchemas.USER.find({
                email: req.body.username
            }, function(err, user) {
                if (err) throw err;
                //console.log(user[0].password_hash);
                // object of the user
                if (user.length > 0) {
                    if (user[0].login_attempt < 5) {
                        var passwordHash = md5(req.body.password + user[0].create_date.getTime());
                        //console.log('password',req.body.password,'text',req.body.password + user[0].create_date.getTime(),'hash',passwordHash);
                        //console.log('success');
                        //console.log(user2);
                        if (user[0].password_hash === passwordHash) {
                            sess.user_data = user[0];
                            res.json(user);
                        } else {
                            fn_increment_invalid_login_attempt(user[0].id);
                            res.json({
                                'error': 'invalid_login',
                                'error_text': 'You have ' + (5 - user[0].login_attempt) + ' attempts, before your account gets locked'
                            });
                        }
                    } else {
                        dbSchemas.USER.update({
                                id: user[0].id
                            }, {
                                $set: {
                                    status: status_locked
                                }
                            },
                            function(err, user) {

                            });

                        res.json({
                            'error': 'account_locked',
                            'error_text': 'You have locked your account. Please reset password or call technical support for more assistance'
                        });
                    }
                } else {
                    res.json({
                        'error': 'invalid_user',
                        'error_text': 'Couldnot verify credentials. Please dont try to hack!'
                    });
                }
            });
        });

        // Check user exists
        app.get('/api/check_email_exists', function(req, res) {
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
        app.post('/api/register_user', function(req, res) {
            var user_details = req.body,
                create_date = new Date().getTime();
            var status_user_created;
            dbSchemas.STATUS.find({
                'status_label': 'user_created'
            }, function(err, row) {
                if (err) throw err;
                console.log(row);
                status_user_created = row[0].id;
            });

            var activation_code = md5(user_details.email + create_date);

            var new_user = new dbSchemas.USER({
                create_date: create_date,
                id: user_details.email,
                first_name: user_details.first_name,
                last_name: user_details.last_name,
                email: user_details.email,
                password: md5(user_details.password + create_date),
                city: user_details.city,
                mobile: user_details.mobile,
                usertype: user_details.usertype,
                activation_code: activation_code,
                status: status_user_created
            });
            new_user.save(function(err, user) {
                if (err) throw err;
                // object of the user
                //console.log(user);
                var userEmail = user_details.email;

                transporter.sendMail({
                    from: 'techcompeers@gmail.com',
                    to: userEmail,
                    subject: 'Activate User | JointVenture2k15',
                    html: 'You have recently registered with us. It is recommended to verify your email id. Please click this link \
                        <a href="' + req.get('host') + '/api/activate_user?activation_code=' + activation_code + '">Here<a>. Thank you!'
                }, function(err2, info) {
                    //console.log('email sent');
                    if(err2) throw err2;
                });
                res.json(user);
            });

        });

        // add a new user
        app.get('/api/activate_user', function(req, res) {
            var user_details = req.body,
                create_date = new Date().getTime();

            dbSchemas.USER.find({
                create_date: create_date,
                id: user_details.email,
                first_name: user_details.first_name,
                last_name: user_details.last_name,
                email: user_details.email,
                password: user_details.password,
                city: user_details.city,
                mobile: user_details.mobile,
                usertype: user_details.usertype

            });
            new_user.save(function(err, user) {
                if (err) throw err;
                // object of the user
                //console.log(user);
                res.json(user);
            });

        });

        app.post('/api/list_sell', function(req, res) {

            function putImage(image_url) {
                var postheaders = {
                    'Content-Type': 'text/plain',
                    'Authorization': 'Uploadcare.Simple 9892b9acceb2acadf4a9:9515dd736cc158915b10'
                };

                console.log(image_url.substr(image_url.indexOf('.com/') + 4));
                // the post options
                var optionspost = {
                    host: 'api.uploadcare.com',
                    port: 443,
                    path: '/files/' + image_url.substr(image_url.indexOf('.com/') + 4) + 'storage/',
                    method: 'PUT',
                    headers: postheaders
                };

                // do the POST call
                var reqPost = https.request(optionspost, function(res) {
                    console.log("statusCode: ", res.statusCode);
                    // uncomment it for header details
                    //  console.log("headers: ", res.headers);

                    res.on('data', function(d) {
                        console.info('POST result:\n');
                        //process.stdout.write(d);
                        console.info('\n\nPOST completed');
                    });
                });

                // write the json data
                //reqPost.write(jsonObject);
                reqPost.end();
                reqPost.on('error', function(e) {
                    console.error(e);
                });

            }
            var property_details = req.body,
                create_date = new Date().getTime();

            for (var i = 0; i < property_details.image_url.length; i++) {
                putImage(property_details.image_url[i]);
            }


            var list_new_sell = new dbSchemas.VENTURE({
                image_url: property_details.image_url,
                user_details: {
                    usertype: property_details.user_details.usertype,
                    email: property_details.user_details.email,
                    mobile: property_details.user_details.mobile,
                    alternate_mobile: property_details.user_details.alternate_mobile,
                },
                address: property_details.address,
                city: property_details.city,
                price_unit: property_details.price_unit,
                price: property_details.price,
                is_negotiable: property_details.is_negotiable,
                area_unit: property_details.area_unit,
                built_area: property_details.built_area,
                possession_type: property_details.possession_type,
                possession_details: property_details.possession_details,
                property_description: property_details.property_description,
                status: property_details.status,
                near_by: property_details.near_by
            });
            list_new_sell.save(function(err, sell) {
                if (err) throw err;
                // object of the user
                //console.log(user);
                res.json(sell);
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

        app.post('/api/reset_password_email', function(req, res) {
            var userEmail = req.body.username;

            transporter.sendMail({
                from: 'techcompeers@gmail.com',
                to: userEmail,
                subject: 'Password Reset | JointVenture2k15',
                text: 'You forgot your password. Please reset your password by clicking here.'
            }, function(err, info) {
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
