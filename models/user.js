const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JobSchema = new Schema({
  type: String,
  company: String,
  companyUrl : String
});

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username : { type: String, required: true, unique: true, minlength: 3 },
  password : { type: String, required: true, minlength: 8 },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    minlength: 1, 
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  job: [JobSchema],
  created : { type: Date, default: Date.now },
  lastUpdated : Date,
  tokens: [{
    access: { type: String, required: true },
    token: { type: String, required: true }
  }]
});

UserSchema.methods.toJSON = function () {
  const user = this;
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{ access, token }]);

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
}

UserSchema.pre('save', function(next){
  const user = this;

  if(user.isModified('password')){
    //user.password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports =  User;