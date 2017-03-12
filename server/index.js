var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var db = require('../db/index.js');
var url = require('url');

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/dist/')));


app.get('/users', function (req, res) {
	var username = url.parse(req.url).query.split('=')[1];
	console.log(username);
	db.getUsername(username, function(err, result) {
		if (err) {
			res.set({'content-type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' });
			res.status(400).send('Failed Query');
		} else {
			res.set({'content-type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' });
			res.status(200).send(JSON.stringify(result));
		}
	})
})

app.listen(3000, function() {
	console.log('App is listening on port 3000!');
});