const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  // Login data
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  displayName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  // Profile Data
  sportsInterests: [{ type: String }],
  skillLevels: [{ type: String }],
  preferredSportsActivities: [{ type: String }],
  location: { type: String },
});
 
const User = mongoose.model('User', userSchema);

module.exports = User;
