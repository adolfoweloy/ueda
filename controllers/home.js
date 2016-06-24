var express = require('express'),
  router = express.Router();
  postService = require(__dirname + '/../services/post'),
  fs = require('fs');

router.get('/', function(req, res) {
	res.render('home', {linksPost: postService.linksPost, posts: postService.posts});
});

module.exports = router;
