const expect = require('chai').expect;
const dbSetup = require('../dbSetup');

//change the DB with a remote one or ensure that MongoDB is running as a service
const TEST_DB_URI = "mongodb://localhost/test_uFacade";
const userFacade = require('../facades/userFacade');
const User = require('../models/user');

/* Connect to the TEST-DATABASE */
before((done) => {
   dbSetup.setDbUri(TEST_DB_URI);
   dbSetup.connect();
   done();  
})

/* Setup the database in a known state (2 users) before EACH test */
beforeEach((done) => {
  User.remove({ });
  //there will be an warning message, because userNames are not unique for beforeEach test, but they are the same
  Promise.all([
    new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "usrN1", password: "test", email: "k@w.dk" }).save(),
    new User({ firstName: "Hanne", lastName: "Wonnegut", userName: "usrN2", password: "test", email: "h@w.dk" }).save()
  ]);
  done();
})

describe("Testing the User Facade", () => {
   it("Should return 2 users", (done) => {
     userFacade.getAllUsers()
      .then((users) => { 
        expect(users.length).to.be.equal(2);
      });
      done();
   });

   it("Should Find Kurt Wonnegut", (done) => {
     userFacade.findByUsername("kurtW")
      .then((user) => {
        expect(user.firstName).to.be.equal("Kurt");
      })
     done();
   });

   it("Should add Peter Pan", (done) => {
     userFacade.addUser("Peter", "Pan", "peter", "testPass", "testEmail")
      .then((user) => {
        expect(user.firstName).to.be.equal("Peter");
      });
    
      userFacade.getAllUsers()
      .then((users) => { 
        expect(users.length).to.be.equal(2);
      });
     done();
   });
})
