const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  type: String,
  company: String,
  companyUrl : String
});

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  userName : { type: String, required: true, unique: true },
  password : { type: String, required: true },
  email: { type: String, required: true },
  job: [JobSchema],
  created : { type: Date, default: Date.now },
  lastUpdated : Date
});

const User = mongoose.model('User', UserSchema);

module.exports =  User;