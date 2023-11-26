//create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsController = require('../controllers/comments_controller');
const passport = require('passport');

//route for creating comment
router.post('/create',passport.checkAuthentication,commentsController.create);

//route for deleting comment
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports = router;