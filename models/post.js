var crypto = require('crypto'),
	marked = require('marked'),
	Link = require(__dirname + '/link');

class Post extends Link {
	constructor(data, filename) {
		let id = crypto.createHash('md5').update(data).digest('hex');
		let file = filename.split('.')[0];
		let content = marked(data);
		let url = '/' + file + '.html';
		let title = content.split('\n')[0].replace(/(<([^>]+)>)/ig,"");
		super(id, url, title);
		this._content = content;
		this._file = file;

	}

	get content() {
		return this._content;
	}

	get file() {
		return this._file;
	}
}

module.exports = Post;
