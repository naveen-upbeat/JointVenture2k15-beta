// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('md5');

//Status Schema
var statusSchema = new Schema({
    id: String,
    status_label: String,
    status_code: Number
}, {
    collection: 'STATUS'
});


//UserTypes Schema
var userTypeSchema = new Schema({
    id: String,
    usertype_label: String
}, {
    collection: 'USERTYPE'
});

// create a User Schema
var userSchema = new Schema({
    id: String,
    last_name: String,
    first_name: String,
    password: String,
    password_hash: String,
    email: {
        type: String

    },
    create_date: {
        type: Date,
        default: Date.now
    },
    mobile: {
        type: String,
        maxlength: 10
    },
    alertnate_mobile: {
        type: String,
        maxlength: 10
    },
    usertype: String,
    activation_code: String,
    status: Number,
    login_attempt : {
        type: Number,
        default : 0
    }
}, {
    collection: 'USER'
});

// custom method to encrypt the password field
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
// userSchema.methods.hashPwd = function() {
//     // convert password to hash
//     var hash = md5(this.password + this.create_date.toString());
//     this.password_hash = hash;
//     this.password = 'passwordhashed';
//     return hash;
// };

// City lookup schema
var lookup_citySchema = new Schema({
    city_name: String,
    city_label: String
}, {
    collection: 'LOOKUP_CITY'
});

// Venture schema
var ventureSchema = new Schema({
    'image_url': Array,
    'user_details': {
        'usertype': String,
        'email': String,
        'mobile': String,
        'alternate_mobile': String
    },
    'address': String,
    'city': String,
    'price_unit': String,
    'price': String,
    'is_negotiable': Boolean,
    'area_unit': String,
    'built_area': String,
    'possession_type': String,
    'possession_details': String,
    'property_description': String,
    'status': String,
    'near_by': String
}, {
    collection: 'VENTURE'
});


// the schemas are useless so far
// we need to create a mongoose model using it
var dbSchemas = {
        'STATUS': mongoose.model('STATUS', statusSchema),
        'USERTYPE': mongoose.model('USERTYPE', userTypeSchema),
        'USER': mongoose.model('USER', userSchema),
        'VENTURE': mongoose.model('VENTURE', ventureSchema),
        'LOOKUP_CITY': mongoose.model('LOOKUP_CITY', lookup_citySchema)
    }
    // make this available to our routes in our Node applications
module.exports = dbSchemas;
