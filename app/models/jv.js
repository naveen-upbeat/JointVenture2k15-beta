// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('MD5');

//UserTypes Schema
var userTypeSchema = new Schema({
	id: String,
	usertype_label: String
}, {collection: 'USERTYPE'});

// create a User Schema
var userSchema = new Schema({
  last_name: String,
  first_name: String,
  password: String,
  password_hash: String,
  email: {type: String, match : /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/},
  create_date:{ type: Date, default: Date.now },
  mobile: {type: String, maxlength: 9},
  alertnate_mobile: [{ type: String, maxlength:9}],
  usertype: String
},{collection: 'USER'});

// custom method to encrypt the password field
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.hashPwd = function() {
  // convert password to hash
  var hash = md5(this.password + this.create_date.toString());
  this.password_hash = hash; 
  return hash;
};

// Creating a venture schema
var empSchema = new Schema({
  first_name: String,
  last_name: String
});

// City lookup schema
var lookup_citySchema = new Schema({
  city_name: String,
  city_label: String
},{collection: 'LOOKUP_CITY'});

// the schemas are useless so far
// we need to create a mongoose model using it
var dbSchemas = {
  'USERTYPE': mongoose.model('USERTYPE', userTypeSchema),
  'USER' : mongoose.model('USER', userSchema),
  'EMP' : mongoose.model('EMP', empSchema),
  'LOOKUP_CITY': mongoose.model('LOOKUP_CITY',lookup_citySchema)
}
// make this available to our routes in our Node applications
module.exports = dbSchemas;