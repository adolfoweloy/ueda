var express = require('express'),
	app = express(),
	compression = require('compression'),
	crypto = require('crypto'),
	exphbs = require('express-handlebars'),
	marked = require('marked'),
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
fs.readdir(articlesFolder, function(err, filenames){
	if (err) {
		return console.error(err);
	}
	filenames.forEach(function(filename){
		fs.readFile(articlesFolder + filename, 'utf-8', function(err, data){
			if (err) {
				return console.error(err);
			}
			var post = {};
			post.id = crypto.createHash('md5').update(data).digest('hex');
			post.content = marked(data);
			post.file = filename.split('.')[0];
			post.title = post.content.split('\n')[0].replace(/(<([^>]+)>)/ig,"");
			post.url = '/' + post.file + '.html';
			posts[post.file] = post;
			links.push({id: post.id, url: post.url, title: post.title});
		});
	});
});

app.get('/', function(req, res){
	var data = {links: links, posts: posts};
	res.render('index', data);
});

app.get('/:file.html', function(req, res){
	var post = posts[req.params.file]
		data = {links: links, post: post};
	if (post) {
		res.render('article', data);
		return;
	}
	res.render('404', {links: links});
});

app.listen(3000,function(){
	console.info('Started');
});
