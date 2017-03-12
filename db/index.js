var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hex'
});

connection.connect();

function getUsername(username, callback) {
	connection.query('SELECT users.username, users.wins FROM users WHERE users.username = ?', [username], function(err, results) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, results);
		}
	});
}

function createUser(username, callback) {
	connection.query('insert into users (username, wins) values (?, 0)', [username], function(err, results) {
		console.log(err);
		if (err) {
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
}


module.exports.getUsername = getUsername;
module.exports.createUser = createUser;