import React from 'react';
import HexRow from './components/hexRow.jsx';

export default class HexBoard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hexBoard: [], 
			currentTurn: 'Red', 
		}
		this.initalizeBoard.bind(this);
		this.hexClicked.bind(this);
	}

	initalizeBoard() {
		// create the HexPiece object for capture status and
		// relations to other pieces
		class HexPiece {
			constructor(index) {
				this.index = index;
				this.capture = 'no';
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
			initialHexBoard.push(new HexPiece(i));
		}

		// set up connections between hexPieces
		for (let i = 0; i < 25; i++) {

			if (i === 7 || 8 || 9 || 12 || 13 || 14 || 17 || 18 || 19) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].topRight = initialHexBoard[i - 4];
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 4];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];

			} else if ( i === 2 || 3 || 4) {

				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 4];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];

			} else if (i === 22 || 23 || 24) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].topRight = initialHexBoard[i - 4];
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].right = initialHexBoard[i + 1];

			} else if (i === 6 || 11 || 16) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].topRight = initialHexBoard[i - 4];
				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];

			} else if (i === 10 || 15 || 20) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 4];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];

			} else if (i === 1) {

				initialHexBoard[i].right = initialHexBoard[i + 1];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];

			} else if (i === 25) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].left = initialHexBoard[i - 1];

			} else if (i === 21) {

				initialHexBoard[i].topLeft = initialHexBoard[i - 5];
				initialHexBoard[i].topRight = initialHexBoard[i - 4];
				initialHexBoard[i].right = initialHexBoard[i + 1];

			} else if (i === 5) {

				initialHexBoard[i].left = initialHexBoard[i - 1];
				initialHexBoard[i].bottomLeft = initialHexBoard[i + 4];
				initialHexBoard[i].bottomRight = initialHexBoard[i + 5];
			}
		}

		this.setState({
			hexBoard: initialHexBoard
		});
	}

	redWinCondition() {
		//set an array of red top hexs
		var redTop = this.state.hexBoard.slice(0, 6);
		// loop over the top array
		for (let i = 0; i < redTop.length; i++) {
			// if redtop[i].capture === 'red'
			if (redTop[i].capture === 'red') {
				// define queue array
				var queue = [];
				// queue.push(redtop[i])
				queue.push(redTop[i]);
				// set visitedHexs = {}
				var visitedHexs = {};
				// while (queue.length > 0)
				while (queue.length > 0) {
				  // set currentHex = queue.shift()
				  var currentHex = queue.shift();
				  // vistedHexs[currentHex.index] = true
				  visitedHexs[currentHex.index] = true;
				  // if currentHex.index === 21 || 22 || 23 || 24 || 25
				  if (currentHex.index === 21 || 22 || 23 || 24 || 25) {
				   // return true
				  	return true;
				  } else {

				  	if (currentHex.left.capture === 'red' && vistedHexs[currentHex.left.index] === undefined) {
				  	 queue.push(currentHex.left);
				  	 } 
				  	if (currentHex.right.capture === 'red' && vistedHexs[currentHex.right.index] === undefined) {
				  	 queue.push(currentHex.right);
				  	}
				  	if (currentHex.topLeft.capture === 'red' && vistedHexs[currentHex.topLeft.index] === undefined) {
				  	 queue.push(currentHex.topLeft);
				  	}
				  	if (currentHex.topRight.capture === 'red' && vistedHexs[currentHex.topRight.index] === undefined) {
				  	 queue.push(currentHex.topRight);
				  	}
				  	if (currentHex.bottomLeft.capture === 'red' && vistedHexs[currentHex.bottomLeft.index] === undefined) {
				  	 queue.push(currentHex.bottomLeft);
				  	}
				  	if (currentHex.bottomRight.capture === 'red' && vistedHexs[currentHex.bottomRight.index] === undefined) {
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

	}


	render() {
		return (
			<div>
			<div>{this.state.currentTurn} Player</div>
			<HexRow hexs=[1, 2, 3, 4, 5] />
			<HexRow hexs=[6, 7, 8, 9, 10] />
			<HexRow hexs=[11, 12, 13, 14, 15] />
			<HexRow hexs=[16, 17, 18, 19, 20] />
			<HexRow hexs=[21, 22, 23, 24, 25] />

			</div>
			)
	}
}
