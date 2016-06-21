"use strict";

var Post = require(__dirname + '/../models/post'),
	fs = require('fs');

class PostService {
	constructor() {
		this._posts = {};
		this._linksPost = [];
	}

	get posts(){
		return this._posts;
	}

	get linksPost(){
		return this._linksPost;
	}

	loadPosts(folder) {
		let self = this;
		fs.readdir(folder, function(err, filenames){
			if (err) {
				return console.error(err);
			}
			filenames.forEach(function(filename){
				var post = self.loadPost(filename);
				self._posts[post.file] = post;
				self._linksPost.push(post);
				return self.posts;
			});
		});
	}

	loadPost(filename) {
		var postPath = __dirname + '/../articles/' + filename;
		try {
			if (fs.statSync(postPath)) {
				var data = fs.readFileSync(postPath, 'utf-8');

				if (data) {
					return new Post(data, filename);
				}
			}
		} catch(err) {
			console.log(err);
			return null;
		}
	}

}

module.exports = new PostService();
