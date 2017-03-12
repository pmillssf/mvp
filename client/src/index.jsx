import React from 'react';
import ReactDom from 'react-dom';
import Hexagon from 'react-hexagon';
import HexRow from './components/hexRow.jsx';
import HexBoard from './components/hexBoard.jsx'
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerOne: 'Red',
			playerTwo: 'Blue',
			startGame: false
		}
		this.playerOneChange = this.playerOneChange.bind(this);
		this.playerTwoChange = this.playerTwoChange.bind(this);
		this.renderGame = this.renderGame.bind(this);
		this.addPlayersToDataBase = this.addPlayersToDataBase.bind(this);
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

	addPlayersToDataBase(username) {
		console.log(username);
		$.ajax({
			url: 'http://localhost:3000/users?username=' + username,
			method: 'GET',
			success: (data) => {
				if (data[0] === undefined) {
					console.log('post-req', username)

					$.ajax({
						url: 'http://localhost:3000/user',
						method: 'POST',
						data: JSON.stringify({"username": username}),
						headers: {'Content-Type': 'application/json'},
						success: function() {
							console.log('posted');
						},
						error: function(error) {
							console.log(error);
						}
					})
				}
			},
			error: function(error) {
				console.log(error)
			}
		})
	}

	renderGame() {
		this.addPlayersToDataBase(this.state.playerOne);
		this.addPlayersToDataBase(this.state.playerTwo);
		this.setState({
			startGame: !this.state.startGame
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
				<button onClick={this.renderGame}>New Game</button>
				<button>Load Game</button>
			</div>
			{this.state.startGame ? <HexBoard playerOne={this.state.playerOne} playerTwo = {this.state.playerTwo}/> : ''}
		</div>
	}
}

ReactDom.render(<App/>, document.getElementById('app'));