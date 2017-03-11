var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '../client/dist/')));

app.listen(3000, function() {
	console.log('App is listening on port 3000!');
});