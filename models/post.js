"use strict";

var crypto = require('crypto'),
	marked = require('marked'),
	Link = require(__dirname + '/link');

class Post {
	constructor(data, filename) {
		this._id = crypto.createHash('md5').update(data).digest('hex');
		let markdown = marked(data);
		this._file = filename.split('.')[0];
		let content = markdown.split('\n');
		this._title = content[0].replace(/(<([^>]+)>)/ig,"");
		this._content = content.splice(1, content.length).join("");
	}

	get id() {
		return this._id;
	}

	get content() {
		return this._content;
	}

	get file() {
		return this._file;
	}

	get title() {
		return this._title;
	}

	get link() {
		return new Link('/' + this._file + '.html', this._title);
	}
}

module.exports = Post;
