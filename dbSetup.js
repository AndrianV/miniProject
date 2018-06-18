const mongoose = require('mongoose');
let connected = false;

let dbURI = "CONNECTION STRING FROM MLAB";
// "mongodb://localhost/local_db"

function setDbUri(uri) {
  dbURI = uri;
}

function connect() {
  if(!connected){
    return mongoose.connect(dbURI);
  }  
}

mongoose.connection.on('connected', () => {
  connected = true;  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error', (err) => {  
  console.log('Mongoose default connection error: ' + err);
}); 

module.exports = { connect, setDbUri };