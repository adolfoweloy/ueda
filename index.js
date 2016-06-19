var express = require('express'),
	app = express(),
	compression = require('compression'),
	crypto = require('crypto'),
	exphbs = require('express-handlebars'),
	marked = require('marked'),
	Link = require('./models/link'),
	Post = require('./models/post'),
	fs = require('fs');

var hbs = exphbs.create({
	helpers: require('handlebars-helpers')() 
});

app.engine('html', exphbs());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(compression());

app.use('/static', express.static('static'));

var posts = {},
	links = [],
	articlesFolder = __dirname + '/articles/';

var loadPost = function(filename){
	var postPath = articlesFolder + filename;
	//try {
		if (fs.statSync(postPath)) {
			var data = fs.readFileSync(postPath, 'utf-8');
			
			if (data) {
				var post = new Post(data, filename);
				posts[post.file] = post;

				links.push(post);
				return post;
			}
		}
	//} catch(err) {
//		return null;
//	}
};

fs.readdir(articlesFolder, function(err, filenames){
	if (err) {
		return console.error(err);
	}
	filenames.forEach(function(filename){
		loadPost(filename);
	});
});

app.get('/', function(req, res){
	var data = {links: links, posts: posts};
	res.render('index', data);
});

app.get('/:file.html', function(req, res, next){
	var post = posts[req.params.file];
	if(!post) {
		var post = loadPost(req.params.file + '.md');
		if (!post) {
			res.render('404', {links: links});
			return;
		}
	}
	next();
});

app.get('/:file.html', function(req, res){
	var post = posts[req.params.file]
		data = {links: links, post: post};
	if (post) {
		res.render('article', data);
		return;
	}
});

app.listen(3000,function(){
	console.info('Started');
});
