// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('MD5');

//UserTypes Schema
var userTypesSchema = new Schema({
	usertype:String,
	usertype_label:String
});

// create a User Schema
var userSchema = new Schema({
  name: String,
  password: String,
  password_hash: String,
  email: {type: String, match : /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/},
  create_date:{ type: Date, default: Date.now },
  mobile: {type: String, maxlength: 9},
  alertnate_mobile: [{ type: String, maxlength:9}],
  usertype: String
});

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
  fname: String,
  lname: String
});

// the schemas is useless so far
// we need to create a model using it
var dbSchemas = {
  'users' : mongoose.model('users', userSchema),
  'emps' : mongoose.model('emps', empSchema),
  'usertypes': mongoose.model('usertypes',userTypesSchema)
}
// make this available to our users in our Node applications
module.exports = dbSchemas;