const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationBlog = new Schema({
  title: { type: String, required: true },
  info: { type: String, required: true },
  img: String,
  pos : {
    longitude : { type: Number, required: true },
    latitude : { type: Number, required: true }
  },
  author: Schema.Types.ObjectId,
  likedBy: [Schema.Types.ObjectId],
  created:  { type: Date, default: Date.now },
  lastUpdated: Date
});

LocationBlog
.virtual("slug")
.get(function(){
  return "/locationblog/"+this._id;
})

LocationBlog.pre("save",function(next){
  this.lastUpdated = new Date();
  next();
})


module.exports = mongoose.model('LocationBlog', LocationBlog);