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
