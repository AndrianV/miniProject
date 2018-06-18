const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MINUTES = 1;
const EXPIRES = 60  * MINUTES ;

const PositionSchema = new Schema({
  //Make sure that next line reflects your User-model
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  created: { type: Date, expires: EXPIRES, default: Date.now },
  loc: {
  'type': { type: String, enum: "Point", default: "Point" },
  coordinates: { type: [Number] }
  }
})

module.exports = mongoose.model('Position', PositionSchema);

