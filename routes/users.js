const express = require('express');
const router = express.Router();

//User Login Route
router.get('/login', (req, res) => {
  res.render('login');
});

//User Register Route
router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;