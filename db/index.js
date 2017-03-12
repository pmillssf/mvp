var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hex'
});

connection.connect();

function getUsername(username, callback) {
	connection.query('SELECT users.username, users.wins FROM users WHERE users.username = ?', [username], function (err, results) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, results);
		}
	});
}

function createUser(username, callback) {
	connection.query('insert into users (username, wins) values (?, 0)', [username], function (err, results) {
		console.log(err);
		if (err) {
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
}

function getGames(player1, player2, callback) {
	console.log('player1', player1, 'player2', player1);
	connection.query('SELECT * from savedgames where playerone = ? AND playertwo = ?', [player1, player2], function (err, results) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, results);
		}
	});
}

function saveGame(gameObj, callback) {
	connection.query('insert into savedgames (playerone, playertwo, gamename, gamestate, savedate) values (?, ?, ?, ?, ?)',
	 [gameObj.playerone, gameObj.playertwo, gameObj.gamename, gameObj.gamestate, gameObj.date], function (err, results) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, results);
		}
	 });
}


module.exports.getUsername = getUsername;
module.exports.createUser = createUser;
module.exports.getGames = getGames;
module.exports.saveGame = saveGame;