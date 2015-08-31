// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
    var recaptcha_async = require('recaptcha-async');
    var recaptcha = new recaptcha_async.reCaptcha();
    // configuration ===========================================

// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
    extended: true
})); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users



mypublickey = '6LdQ_QsTAAAAAM8IyCCqBrm8LMQVYkcZzZ0mQe_q';
myprivatekey = '6LdQ_QsTAAAAAGA7JDUv3UNyzvfv3bFceoFfpfBS';

recaptcha.on('data', function(res) {
    if (res.is_valid)
        html = "valid answer";
    else
        html = recaptcha.getCaptchaHtml(mypublickey, res.error);
});

// recaptcha.checkAnswer(myprivatekey,
//     req.connection.remoteAddress,
//     req.body.recaptcha_challenge_field,
//     req.body.recaptcha_response_field);
// model
//require('./app/models/jv')(app); // pass our application into our jv model

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Joint Venture is up on port - ' + port); // shoutout to the user
exports = module.exports = app; // expose app
