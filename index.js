var express = require('express'),
	app = express();

app.get('/', function(req, res){
	res.send('Hello Ueda!');
});

app.listen(3000,function(){
	console.info('Started');
});
