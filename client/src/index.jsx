import React from 'react';
import ReactDom from 'react-dom';
import Hexagon from 'react-hexagon';
import HexRow from './components/hexRow.jsx';
import HexBoard from './components/hexBoard.jsx'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerOne: 'Red',
			playerTwo: 'Blue',
		}
		this.playerOneChange = this.playerOneChange.bind(this);
		this.playerTwoChange = this.playerTwoChange.bind(this);
	}
	playerOneChange(e) {
		this.setState({
			playerOne: e.target.value
		});
	}
	playerTwoChange(e) {
		this.setState({
			playerTwo: e.target.value
		})
	}
	render() {
		return <div>
			<h1>Welcome</h1>
			<h3>Game Rules</h3>
			<div>
				<input value={this.state.playerOne} onChange={this.playerOneChange} maxLength={10}></input>
				<input value={this.state.playerTwo} onChange={this.playerTwoChange} maxLength={10}></input>
			</div>
			<div>
				<button>New Game</button>
				<button>Load Game</button>
			</div>
			<HexBoard />
		</div>
	}
}

ReactDom.render(<App/>, document.getElementById('app'));