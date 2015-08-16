/*// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Nerd', {
	name : {type : String, default: ''}
});

*/
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('MD5');

// create a schema
var userSchema = new Schema({
  name: String
});

var empSchema = new Schema({
  fname: String,
  lname: String
});



// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.hashPwd = function() {
  // convert password to hash
  var hash = md5(this.password);
  //this.password = this.password; 
  return hash;
};

// the schema is useless so far
// we need to create a model using it
var users = mongoose.model('users', userSchema);
var emp = mongoose.model('emp', userSchema);


var dbSchemas = {
  users: users,
  emp: emp
}
// make this available to our users in our Node applications
module.exports = dbSchemas;