import React from 'react';
import ReactDom from 'react-dom';
import Hexagon from 'react-hexagon';
import HexBoard from './components/hexBoard.jsx'
import LeaderBoard from './components/leaderBoard.jsx'
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerOne: 'Red',
			playerTwo: 'Blue',
			startGame: false, 
			leaderBoard: false,
			leaders: [],
		}
		this.playerOneChange = this.playerOneChange.bind(this);
		this.playerTwoChange = this.playerTwoChange.bind(this);
		this.renderGame = this.renderGame.bind(this);
		this.addPlayersToDataBase = this.addPlayersToDataBase.bind(this);
		this.renderLeaderBoard = this.renderLeaderBoard.bind(this);
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
		$.ajax({
			url: 'http://localhost:3000/users?username=' + username,
			method: 'GET',
			success: (data) => {
				if (data[0] === undefined) {
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

	renderLeaderBoard() {
		var context = this;
		$.ajax({
			url: 'http://localhost:3000/leaders',
			method: 'GET',
			success: (data) => {
				context.setState({
					leaders: data.slice(0, 10)
				})
			},
			error: function(error) {
				console.log(error)
			}
		});
		this.setState({
			leaderBoard: !this.state.leaderBoard
		})

	}
	render() {
		return <div>
			<h1>Hex!</h1>
			<h3>How To Play:</h3>
			<p>
			Hex is a two person game, so grab a buddy! Players alternate clicking on unoccupied hexagons (the green ones) to try and link their sides of the board in an unbroken chain. 
			Red is trying to connect the top side with the bottom side. Blue is trying to connect the left side with the right side. Red plays first. Good Luck!
			</p>
			<h3>Ready To Play?</h3>
			<p>
			Be sure to add your usernames to save your win records. Click on New Game to start or Leader Board to see the Hex Masters!
			</p>
			<div> Player One:
				<input value={this.state.playerOne} onChange={this.playerOneChange} maxLength={10}></input>
			 Player Two:
				<input value={this.state.playerTwo} onChange={this.playerTwoChange} maxLength={10}></input>
			</div>
			<div>
				<button onClick={this.renderGame}>New Game</button>
				<button onClick={this.renderLeaderBoard}>Leader Board</button>
			</div>
			{this.state.startGame ? <HexBoard playerOne={this.state.playerOne} playerTwo = {this.state.playerTwo}/> : ''}
			{this.state.leaderBoard ? <LeaderBoard leaders = {this.state.leaders}/> : ''}

		</div>
	}
}

ReactDom.render(<App/>, document.getElementById('app'));