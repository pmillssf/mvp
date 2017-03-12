import React from 'react';
import Hex from './hex.jsx';
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
			hexRow_5: [] 
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
				this.capture = 'green';
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
		for (let i = 0; i < 25; i++) {
			initialHexBoard.push(new HexPiece(i+1));
		}

		// set up connections between hexPieces  
		for (let i = 0; i < 25; i++) {
			var k = i + 1;
			if (k === 7 || k === 8 || k === 9 || k === 12 || k === 13 || k === 14 || k === 17 || k === 18 || k === 19) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].topRight = initialHexBoard[i - 4];
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 4];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];

			} else if ( k === 2 || k === 3 || k === 4) {
				initialHexBoard[i].topLeft = {capture: 'green'};
				initialHexBoard[i].topRight = {capture: 'green'};
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 4];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];

			} else if (k === 22 || k === 23 || k === 24) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].topRight = initialHexBoard[i - 4];
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = {capture: 'green'};
				initialHexBoard[i].bottomRight = {capture: 'green'};

			} else if (k === 6 || k === 11 || k === 16) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].topRight = initialHexBoard[i - 4];
				initialHexBoard[i].left = {capture: 'green'};
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];
				initialHexBoard[i].bottomLeft = {capture: 'green'};

			} else if (k === 10 || k === 15 || k === 20) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].topRight = {capture: 'green'};
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = {capture: 'green'};
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 4];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];

			} else if (k === 1) {
				initialHexBoard[i].topLeft = {capture: 'green'};
				initialHexBoard[i].topRight = {capture: 'green'};
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].left = {capture: 'green'};
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];
				initialHexBoard[i].bottomLeft = {capture: 'green'};

			} else if (k === 25) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = {capture: 'green'};
				initialHexBoard[i].topRight = {capture: 'green'};
				initialHexBoard[i].bottomLeft = {capture: 'green'};
				initialHexBoard[i].bottomRight = {capture: 'green'};

			} else if (k === 21) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].topRight = initialHexBoard[i - 4];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = {capture: 'green'};
				initialHexBoard[i].bottomRight = {capture: 'green'};
				initialHexBoard[i].left = {capture: 'green'};

			} else if (k === 5) {

				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 4];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];
				initialHexBoard[i].right = {capture: 'green'};
				initialHexBoard[i].topRight = {capture: 'green'};
				initialHexBoard[i].topLeft = {capture: 'green'};
			}
		}

		this.setState({
			hexBoard: initialHexBoard,
			hexRow_1: initialHexBoard.slice(0, 5),
			hexRow_2: initialHexBoard.slice(5, 10),
			hexRow_3: initialHexBoard.slice(10, 15),
			hexRow_4: initialHexBoard.slice(15, 20),
			hexRow_5: initialHexBoard.slice(20, 25)
		});
	}

	redWinCondition() {
		console.log('red check')
		//set an array of red top hexs
		var redTop = this.state.hexBoard.slice(0, 5);
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
					0: false, 1: false, 2: false, 3: false, 4: false,
					 5: false, 6: false, 7: false, 8: false, 9: false, 
					 10: false, 11: false, 12: false, 13: false, 14: false, 
					 15: false, 16: false, 17: false, 18: false, 19: false, 
					 20: false, 21: false, 22: false, 23: false, 24: false, 
					 25: false};
				// while (queue.length > 0)
				while (queue.length > 0) {
				  // set currentHex = queue.shift()
				  var currentHex = queue.shift();
				  // vistedHexs[currentHex.index] = true
				  visitedHexs[currentHex.index] = true;
				  // if currentHex.index === 21 || 22 || 23 || 24 || 25
				  if (currentHex.index === 21 || currentHex.index === 22 || currentHex.index ===  23 || currentHex.index === 24 || currentHex.index === 25) {
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
		console.log('keep trying');
		return false;
	}

	blueWinCondition() {
		//set an array of red top hexs
		var blueSide = [];
		blueSide.push(this.state.hexBoard[0]);
		blueSide.push(this.state.hexBoard[5]);
		blueSide.push(this.state.hexBoard[10]);
		blueSide.push(this.state.hexBoard[15]);
		blueSide.push(this.state.hexBoard[20]);
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
					0: false, 1: false, 2: false, 3: false, 4: false,
					 5: false, 6: false, 7: false, 8: false, 9: false, 
					 10: false, 11: false, 12: false, 13: false, 14: false, 
					 15: false, 16: false, 17: false, 18: false, 19: false, 
					 20: false, 21: false, 22: false, 23: false, 24: false, 
					 25: false};
				// while (queue.length > 0)
				while (queue.length > 0) {
				  // set currentHex = queue.shift()
				  var currentHex = queue.shift();
				  // vistedHexs[currentHex.index] = true
				  visitedHexs[currentHex.index] = true;
				  // if currentHex.index === 21 || 22 || 23 || 24 || 25
				  if (currentHex.index === 5 || currentHex.index === 10 || currentHex.index === 15 || currentHex.index === 20 || currentHex.index === 25) {
				  	// return true
				  	console.log('Blue true');
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
		console.log('keep trying blue');
		return false;
	}	

	hexClicked(index) {
		console.log('clicked', index);
		if (this.state.hexBoard[index - 1].capture === 'green') {
			var boardCopy = this.state.hexBoard.slice(0,25);
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
		var boardCopy = this.state.hexBoard.slice(0,25);
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
			<div>{this.state.currentTurn} Player</div>
			<div id="row_1">
			  {this.state.hexRow_1.map((hex) => <Hexagon style={{fill: hex.capture}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
			</div>
			<div id="row_2">
			  {this.state.hexRow_2.map((hex) => <Hexagon style={{fill: hex.capture}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
			</div>
			<div id="row_3">
			  {this.state.hexRow_3.map((hex) => <Hexagon style={{fill: hex.capture}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
			</div>
			<div id="row_4">
			  {this.state.hexRow_4.map((hex) => <Hexagon style={{fill: hex.capture}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
			</div>
			<div id="row_5">
			  {this.state.hexRow_5.map((hex) => <Hexagon style={{fill: hex.capture}} key={hex.index} onClick={context.hexClicked.bind(context, hex.index)}/>)}
			</div>
			</div>
			)
	}
}
