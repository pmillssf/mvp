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
	})
}

module.exports.getUsername = getUsername;