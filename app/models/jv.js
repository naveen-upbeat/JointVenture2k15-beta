// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('MD5');

// create a User Schema
var userSchema = new Schema({
  name: String
});

// custom method to encrypt the password field
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.hashPwd = function() {
  // convert password to hash
  var hash = md5(this.password);
  this.password = hash; 
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
  'emps' : mongoose.model('emps', empSchema)
}
// make this available to our users in our Node applications
module.exports = dbSchemas;