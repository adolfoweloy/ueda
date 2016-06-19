var express = require('express'),
	app = express(),
	compression = require('compression'),
	crypto = require('crypto'),
	exphbs = require('express-handlebars'),
	marked = require('marked'),
	postService = require('./services/post'),
	home = require('./controllers/home'),
	post = require('./controllers/post'),
	fs = require('fs');

var hbs = exphbs.create({
	helpers: require('handlebars-helpers')()
});

app.engine('html', exphbs());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(compression());

app.use('/static', express.static('static'));

app.get('/', home);
app.get('/:file.html', post);

app.listen(3000,function(){
	console.info('Started');
});
