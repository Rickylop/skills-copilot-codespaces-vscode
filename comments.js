//create web server for comments
// Date: 03/28/2019
// Programmer: Phil Graham III

// dependencies
var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Use body parser
router.use(bodyParser.urlencoded({ extended: true }));

// Use method override
router.use(methodOverride('_method'));

// GET request to comments
router.get('/', function (req, res) {
  db.Comment.findAll().then(function (comments) {
    res.render('comments/index', { comments: comments });
  }).catch(function (err) {
    console.log(err);
    res.render('404');
  });
});

// GET request to comments/new
router.get('/new', function (req, res) {
  res.render('comments/new');
});

// POST request to comments
router.post('/', function (req, res) {
  db.Comment.create({
    name: req.body.name,
    comment: req.body.comment
  }).then(function (comment) {
    res.redirect('/comments');
  }).catch(function (err) {
    console.log(err);
    res.render('404');
  });
});

// GET request to comments/:id
router.get('/:id', function (req, res) {
  db.Comment.findById(req.params.id).then(function (comment) {
    res.render('comments/show', { comment: comment });
  }).catch(function (err) {
    console.log(err);
    res.render('404');
  });
});

// GET request to comments/:id/edit
router.get('/:id/edit', function (req, res) {
  db.Comment.findById(req.params.id).then(function (comment) {
    res.render('comments/edit', { comment: comment });
  }).catch(function (err) {
    console.log(err);
    res.render('404');
  });
});

// PUT request to comments/:id
router.put('/:id', function (req, res) {
  db.Comment.update({
    name: req.body.name,
    comment: req.body.comment
  }, {
      where: {
        id: req.params.id
      }
    }).then(function (comment) {
      res.redirect('/comments');
    }).catch(function (err) {
      console.log(err);
      res.render('404');
    });
});

// DELETE request to comments/:id
router.delete('/:id', function (req, res) {
  db.Comment.destroy({
    where: {
      id: req.params.id