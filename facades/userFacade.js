const User = require('../models/user');


function addUser(firstName, lastName, userName, password, email) {
  const pass = "fasdfasdf" + password;
  const userInfo = { firstName, lastName, userName, pass, email };
  const user = new User(userInfo);
  return user.save();
}

function getAllUsers() {
  return User.find({ }).exec();
}

function findByUsername(userName) {
  return User.findOne({ userName }).exec();
}

// function addLocationBlog(info, author, longitude, latitude) {
//   const LocationBlogInfo = { info, pos: { longitude, latitude }, author };
//   const newLocationBlog = new LocationBlog(LocationBlogInfo);
//   return newLocationBlog.save();
// }

function findById(userId){
  return User.findById(userId).exec();
}

module.exports = {
  addUser,
  getAllUsers,
  findByUsername
}