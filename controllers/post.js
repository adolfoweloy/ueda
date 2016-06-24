var express = require('express'),
  router = express.Router();
  postService = require(__dirname + '/../services/post'),
  fs = require('fs');

router.get('/:file.html', function(req, res, next){
	var post = postService.posts[req.params.file];
	if(!post) {
		var post = postService.loadPost(req.params.file + '.md');
		if (!post) {
			res.render('404', {linksPost: postService.linksPost});
			return;
		}
	}
	next();
});

router.get('/:file.html', function(req, res){
	var post = postService.posts[req.params.file],
		data = {linksPost: postService.linksPost, post: post};
	if (post) {
		res.render('article', data);
		return;
	}
});

module.exports = router;
