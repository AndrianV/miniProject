const LocationBlog = require('../models/locationBlog');

function addLocationBlog(title, info, longitude, latitude) {
  return new LocationBlog({ title, info, pos: { longitude, latitude } }).save();
}

function getAllLocationBlogs() {
  return LocationBlog.find({ }).exec();
}

function editLocationBlog(id, info) {
	return LocationBlog.findByIdAndUpdate(id,  { info }, {new: true});
}

module.exports = {
  addLocationBlog,
  getAllLocationBlogs,
  editLocationBlog
}