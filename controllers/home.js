var express = require('express'),
  router = express.Router();
  postService = require(__dirname + '/../services/post'),
  fs = require('fs');

if(Object.keys(postService.posts).length === 0) {
  postService.loadPosts(__dirname + '/../articles/');
}

router.get('/', function(req, res) {
	res.render('home', {linksPost: postService.linksPost, posts: postService.posts});
});

module.exports = router;
