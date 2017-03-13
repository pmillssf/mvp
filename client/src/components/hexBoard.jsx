import React from 'react';
import Hexagon from 'react-hexagon';
import $ from 'jquery';

export default class HexBoard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hexBoard: [], 
			currentTurn: 'Red',
			hexRow_1: [],
			hexRow_2: [],
			hexRow_3: [],
			hexRow_4: [],
			hexRow_5: [],
			hexRow_6: [],
			hexRow_7: [], 
			hexRow_8: [], 
			hexRow_9: [], 
			hexRow_10: [],
			hexRow_11: [],   
		}
		this.intitalizeBoad = this.initalizeBoard.bind(this);
		this.hexClicked = this.hexClicked.bind(this);
		this.redWinCondition = this.redWinCondition.bind(this);
		this.blueWinCondition = this.blueWinCondition.bind(this);
		this.declareWinner = this.declareWinner.bind(this);
		this.saveGame = this.saveGame.bind(this);
		this.recordWin = this.recordWin.bind(this);
	}

	componentDidMount() {
		this.initalizeBoard();
	}

	initalizeBoard() {
		// create the HexPiece object for capture status and
		// relations to other pieces
		class HexPiece {
			constructor(index) {
				this.index = index;
				this.capture = '#006400';
				this.topLeft;
				this.topRight
				this.left;
				this.right;
				this.bottomRight;
				this.bottomLeft;
			}
		}
		var initialHexBoard = [];
		// fill in the array with 25 hexPieces
		for (let i = 0; i < 121; i++) {
			initialHexBoard.push(new HexPiece(i+1));
		}

		// set up connections between hexPieces  
		for (let i = 0; i < 121; i++) {
			var k = i + 1;
			if ( (k >= 13 && k <= 21) || (k >= 24 && k <= 32) || (k >= 35 && k <= 43) || (k >= 46 && k <= 54) || (k >= 57 && k <= 65)
			 || (k >= 68 && k <= 76) || (k >= 79 && k <= 87) || (k >= 90 && k <= 98) || (k >= 101 && k <= 109) ) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 11];
				initialHexBoard[i].topRight = initialHexBoard[i - 10];
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 10];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 11];

			} else if ( k >= 2 && k <= 10) {
				initialHexBoard[i].topLeft = {capture: '#006400'};
				initialHexBoard[i].topRight = {capture: '#006400'};
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 10];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 11];

			} else if (k >= 112 && k <= 120) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 11];
				initialHexBoard[i].topRight = initialHexBoard[i - 10];
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = {capture: '#006400'};
				initialHexBoard[i].bottomRight = {capture: '#006400'};

			} else if (k === 12 || k === 23 || k === 34 || k === 45 || k === 56 || k === 67 || k === 78 || k === 89 || k === 100 ) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 11];
				initialHexBoard[i].topRight = initialHexBoard[i - 10];
				initialHexBoard[i].left = {capture: '#006400'};
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 11];
				initialHexBoard[i].bottomLeft = {capture: '#006400'};

			} else if (k === 22 || k === 33 || k === 44 || k === 55 || k === 66 || k === 77 || k === 88 || k === 99 || k === 110 ) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 11];
				initialHexBoard[i].topRight = {capture: '#006400'};
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = {capture: '#006400'};
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 10];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 11];

			} else if (k === 1) {
				initialHexBoard[i].topLeft = {capture: '#006400'};
				initialHexBoard[i].topRight = {capture: '#006400'};
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].left = {capture: '#006400'};
				initialHexBoard[i].bottomRight = initialHexBoard[i + 11];
				initialHexBoard[i].bottomLeft = {capture: '#006400'};

			} else if (k === 121) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 11];
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = {capture: '#006400'};
				initialHexBoard[i].topRight = {capture: '#006400'};
				initialHexBoard[i].bottomLeft = {capture: '#006400'};
				initialHexBoard[i].bottomRight = {capture: '#006400'};

			} else if (k === 111) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 11];
				initialHexBoard[i].topRight = initialHexBoard[i - 10];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = {capture: '#006400'};
				initialHexBoard[i].bottomRight = {capture: '#006400'};
				initialHexBoard[i].left = {capture: '#006400'};

			} else if (k === 11) {

				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 10];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 11];
				initialHexBoard[i].right = {capture: '#006400'};
				initialHexBoard[i].topRight = {capture: '#006400'};
				initialHexBoard[i].topLeft = {capture: '#006400'};
			}
		}

		this.setState({
			hexBoard: initialHexBoard,
			hexRow_1: initialHexBoard.slice(0, 11),
			hexRow_2: initialHexBoard.slice(11, 22),
			hexRow_3: initialHexBoard.slice(22, 33),
			hexRow_4: initialHexBoard.slice(33, 44),
			hexRow_5: initialHexBoard.slice(44, 55),
			hexRow_6: initialHexBoard.slice(55, 66),
			hexRow_7: initialHexBoard.slice(66, 77),
			hexRow_8: initialHexBoard.slice(77, 88),
			hexRow_9: initialHexBoard.slice(88, 99),
			hexRow_10: initialHexBoard.slice(99, 110),
			hexRow_11: initialHexBoard.slice(110, 121)
		});
	}

	redWinCondition() {
		//set an array of red top hexs
		var redTop = this.state.hexBoard.slice(0, 11);
		// loop over the top array
		for (let i = 0; i < redTop.length; i++) {
			// if redtop[i].capture === 'red'
			if (redTop[i].capture === 'Red') {
				// define queue array
				var queue = [];
				// queue.push(redtop[i])
				queue.push(redTop[i]);
				// set visitedHexs = {}
				var visitedHexs = {
					0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 
					10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 
					19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 
					28: false, 29: false, 30: false, 31: false, 32: false, 33: false, 34: false, 35: false, 36: false, 
					37: false, 38: false, 39: false, 40: false, 41: false, 42: false, 43: false, 44: false, 45: false, 
					46: false, 47: false, 48: false, 49: false, 50: false, 51: false, 52: false, 53: false, 54: false, 
					55: false, 56: false, 57: false, 58: false, 59: false, 60: false, 61: false, 62: false, 63: false, 
					64: false, 65: false, 66: false, 67: false, 68: false, 69: false, 70: false, 71: false, 72: false, 
					73: false, 74: false, 75: false, 76: false, 77: false, 78: false, 79: false, 80: false, 81: false, 
					82: false, 83: false, 84: false, 85: false, 86: false, 87: false, 88: false, 89: false, 90: false, 
					91: false, 92: false, 93: false, 94: false, 95: false, 96: false, 97: false, 98: false, 99: false, 
					100: false, 101: false, 102: false, 103: false, 104: false, 105: false, 106: false, 107: false, 
					108: false, 109: false, 110: false, 111: false, 112: false, 113: false, 114: false, 115: false, 
					116: false, 117: false, 118: false, 119: false, 120: false, 121: false };
				// while (queue.length > 0)
				while (queue.length > 0) {
				  // set currentHex = queue.shift()
				  var currentHex = queue.shift();
				  // vistedHexs[currentHex.index] = true
				  visitedHexs[currentHex.index] = true;
				  // if currentHex.index === 21 || 22 || 23 || 24 || 25
				  if (currentHex.index >= 111 && currentHex.index <= 121) {
				   // return true
				   	this.recordWin();
				    this.declareWinner();
				  	return true;
				  } else {

				  	if (currentHex.left.capture === 'Red' && visitedHexs[currentHex.left.index] === false) {
				  	 queue.push(currentHex.left);
				  	 } 
				  	if (currentHex.right.capture === 'Red' && visitedHexs[currentHex.right.index] === false) {
				  	 queue.push(currentHex.right);
				  	}
				  	if (currentHex.topLeft.capture === 'Red' && visitedHexs[currentHex.topLeft.index] === false) {
				  	 queue.push(currentHex.topLeft);
				  	}
				  	if (currentHex.topRight.capture === 'Red' && visitedHexs[currentHex.topRight.index] === false) {
				  	 queue.push(currentHex.topRight);
				  	}
				  	if (currentHex.bottomLeft.capture === 'Red' && visitedHexs[currentHex.bottomLeft.index] === false) {
				  	 queue.push(currentHex.bottomLeft);
				  	}
				  	if (currentHex.bottomRight.capture === 'Red' && visitedHexs[currentHex.bottomRight.index] === false) {
				  	 queue.push(currentHex.bottomRight);
				  	}
				  }
				}
			}
		}
		// return false
		return false;
	}

	blueWinCondition() {
		//set an array of red top hexs
		var blueSide = [];
		blueSide.push(this.state.hexBoard[0]);
		blueSide.push(this.state.hexBoard[11]);
		blueSide.push(this.state.hexBoard[22]);
		blueSide.push(this.state.hexBoard[33]);
		blueSide.push(this.state.hexBoard[44]);
		blueSide.push(this.state.hexBoard[55]);
		blueSide.push(this.state.hexBoard[66]);
		blueSide.push(this.state.hexBoard[77]);
		blueSide.push(this.state.hexBoard[88]);
		blueSide.push(this.state.hexBoard[99]);
		blueSide.push(this.state.hexBoard[110]);
		// loop over the top array
		for (let i = 0; i < blueSide.length; i++) {
			// if redtop[i].capture === 'red'
			if (blueSide[i].capture === 'Blue') {
				// define queue array
				var queue = [];
				// queue.push(redtop[i])
				queue.push(blueSide[i]);
				// set visitedHexs = {}
				var visitedHexs = {
					0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 
					10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 
					19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 
					28: false, 29: false, 30: false, 31: false, 32: false, 33: false, 34: false, 35: false, 36: false, 
					37: false, 38: false, 39: false, 40: false, 41: false, 42: false, 43: false, 44: false, 45: false, 
					46: false, 47: false, 48: false, 49: false, 50: false, 51: false, 52: false, 53: false, 54: false, 
					55: false, 56: false, 57: false, 58: false, 59: false, 60: false, 61: false, 62: false, 63: false, 
					64: false, 65: false, 66: false, 67: false, 68: false, 69: false, 70: false, 71: false, 72: false, 
					73: false, 74: false, 75: false, 76: false, 77: false, 78: false, 79: false, 80: false, 81: false, 
					82: false, 83: false, 84: false, 85: false, 86: false, 87: false, 88: false, 89: false, 90: false, 
					91: false, 92: false, 93: false, 94: false, 95: false, 96: false, 97: false, 98: false, 99: false, 
					100: false, 101: false, 102: false, 103: false, 104: false, 105: false, 106: false, 107: false, 
					108: false, 109: false, 110: false, 111: false, 112: false, 113: false, 114: false, 115: false, 
					116: false, 117: false, 118: false, 119: false, 120: false, 121: false };
				// while (queue.length > 0)
				while (queue.length > 0) {
				  // set currentHex = queue.shift()
				  var currentHex = queue.shift();
				  // vistedHexs[currentHex.index] = true
				  visitedHexs[currentHex.index] = true;
				  // if currentHex.index === 21 || 22 || 23 || 24 || 25
				  if ((currentHex.index % 11) === 0 ) {
				  	// return true
				  	this.recordWin();
				  	this.declareWinner();
				  	return true;
				  } else {

				  	if (currentHex.left.capture === 'Blue' && visitedHexs[currentHex.left.index] === false) {
				  	 queue.push(currentHex.left);
				  	 } 
				  	if (currentHex.right.capture === 'Blue' && visitedHexs[currentHex.right.index] === false) {
				  	 queue.push(currentHex.right);
				  	}
				  	if (currentHex.topLeft.capture === 'Blue' && visitedHexs[currentHex.topLeft.index] === false) {
				  	 queue.push(currentHex.topLeft);
				  	}
				  	if (currentHex.topRight.capture === 'Blue' && visitedHexs[currentHex.topRight.index] === false) {
				  	 queue.push(currentHex.topRight);
				  	}
				  	if (currentHex.bottomLeft.capture === 'Blue' && visitedHexs[currentHex.bottomLeft.index] === false) {
				  	 queue.push(currentHex.bottomLeft);
				  	}
				  	if (currentHex.bottomRight.capture === 'Blue' && visitedHexs[currentHex.bottomRight.index] === false) {
				  	 queue.push(currentHex.bottomRight);
				  	}
				  }
				}
			}
		}
		// return false
		return false;
	}	

	hexClicked(index) {
		if (this.state.hexBoard[index - 1].capture === '#006400') {
			var boardCopy = this.state.hexBoard.slice(0, 121);
			boardCopy[index - 1].capture = this.state.currentTurn;
			if (this.state.currentTurn === 'Red') {
				this.redWinCondition();
			} 

			if (this.state.currentTurn === 'Blue') {
				this.blueWinCondition();
			} 
			this.setState({hexboard: boardCopy, currentTurn: this.state.currentTurn === 'Red' ? 'Blue' : 'Red'});
		}
	}

	declareWinner() {
		var boardCopy = this.state.hexBoard.slice(0, 121);
		for (let i = 0; i < boardCopy.length; i++) {
			boardCopy[i].capture = this.state.currentTurn;
			this.setState({
				hexBoard: boardCopy
			})
		}
	}

	recordWin() {
		var username;
		if (this.state.currentTurn === 'Red') {
			username = this.props.playerOne;
		}
		if (this.state.currentTurn === 'Blue') {
			username = this.props.playerTwo;
		}
		$.ajax({
			url: 'http://localhost:3000/wins?username=' + username,
			method: 'GET',
			success: (data) => {
					console.log('post-req', username)
					var wins = data[0].wins + 1;
					$.ajax({
						url: 'http://localhost:3000/win',
						method: 'POST',
						data: JSON.stringify({"username": username, 'wins': wins}),
						headers: {'Content-Type': 'application/json'},
						success: function() {
							console.log('posted');
						},
						error: function(error) {
							console.log(error);
						}
					})
			},
			error: function(error) {
				console.log(error)
			}
		})
	}

	saveGame() {

	}

	render() {

		var context = this;
		return (
			<div>
				<h2 id="turn">It Is {this.state.currentTurn} Players Turn! </h2>
				<div id="board">
					<div id="row_1">
					  {this.state.hexRow_1.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_2">
					  {this.state.hexRow_2.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_3">
					  {this.state.hexRow_3.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_4">
					  {this.state.hexRow_4.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_5">
					  {this.state.hexRow_5.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_6">
					  {this.state.hexRow_6.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_7">
					  {this.state.hexRow_7.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_8">
					  {this.state.hexRow_8.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_9">
					  {this.state.hexRow_9.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_10">
					  {this.state.hexRow_10.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
					<div id="row_11">
					  {this.state.hexRow_11.map((hex) => <Hexagon style={{fill: hex.capture, stroke: '#000000', strokeWidth: 4}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
					</div>
				</div>
			</div>
			)
	}
}
