const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Load Location Model
require('../models/locationBlog');
const LocationBlog = mongoose.model('LocationBlog');

//Locations Blog index page
router.get('/', (req, res) => {
  LocationBlog.find({})
    .sort({ created: 'desc' })
    .then(locations => {
      res.render('locations/index', { locations });
    });
});

//About Location Form
router.get('/add', (req, res) => {
  res.render('locations/add');
});

//Edit Location Form
router.get('/edit/:id', (req, res) => {
  LocationBlog.findOne({
    _id: req.params.id
  })
  .then(location => {
    res.render('locations/edit', { location });
  });
});

//Process Form
router.post('/', (req, res) => {
  let errors = [];
  if(!req.body.title){
    errors.push({ text:'Please add a title' });
  }
  if(!req.body.details){
    errors.push({ text:'Please add some details' });
  }
  if(errors.length > 0){
    res.render('locations/add', {
      errors: errors,
      title: req.body.title,
      info: req.body.details,
      pos: {
        longitude: req.body.longitude,
        latitude: req.body.latitude
      }
    });
  } else {
    const newLocationDetails = {
      title: req.body.title,
      info: req.body.details,
      pos: {
        longitude: req.body.longitude,
        latitude: req.body.latitude
      }
    }
    new LocationBlog(newLocationDetails)
      .save()
      .then( () => {
        req.flash('success_msg', 'Location added');
        res.redirect('/locations');
      })
  }
});

//Edit Form process
router.put('/:id', (req, res) => {
  LocationBlog.findOne({
    _id: req.params.id
  })
  .then(location => {
    //new values
    location.title = req.body.title;
    location.info = req.body.info;

    location.save()
      .then(() => {
        req.flash('success_msg', 'Location info updated')
        res.redirect('/locations');
      });
  });
});

//Delete Location
router.delete('/:id', (req, res) => {
  LocationBlog.remove({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Location removed')
      res.redirect('/locations');
    });
});

module.exports = router;