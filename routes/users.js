const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const {authenticate} = require('../middleware/authenticate');
const router = express.Router();

//Load User Model
require('../models/user');
const User = mongoose.model('User');

//User Login Route
router.get('/login', (req, res) => {
  //check if the user is logged in already
  // console.log('I want to login!');
  res.render('users/login');
});

router.post('/login', (req, res) => {
  //check and redirect if logged in
  const body = { email: req.body.email, password: req.body.password };
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).redirect('/users/dashboard');
    });
  }).catch((e) => {
    res.status(400).send(e);
  });
});


//User Register Route
router.get('/register', (req, res) => {
  //check if the user is logged in already
  res.render('users/register');
});

router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  let errors = [];
  const user = new User({ username, password, email });
  user.save()
    .then( () => {
      return user.generateAuthToken();
    }).then((token) => {
      req.flash('success_msg', `Successfull registration, ${user.username}, you can now log in.`);
      res.header('x-auth', token).redirect('/users/login');
    }).catch((e) => {
      console.log(e);
      errors.push({ text: 'Please provide a valid information' });
      res.status(400).render('users/register', { errors }); 
    });
});

router.get('/dashboard', authenticate, (req, res) => {
  res.send(req.user);
});

module.exports = router;