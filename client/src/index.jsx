import React from 'react';
import ReactDom from 'react-dom';
import Hexagon from 'react-hexagon';
import HexRow from './components/hexRow.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div>
			<h1>Welcome</h1>
			<h3>Game Rules</h3>
			<div>
				<input value='Username_1'></input>
				<input value='Username_2'></input>
				<button>start game</button>
				<button>Load save</button>
			</div>
			<div>
				<div>
					<div>Player Turn <button>save</button></div>
				</div>
				<div>HexRow_1</div>
				<div>HexRow_2</div>
				<div>HexRow_3</div>
				<div>HexRow_4</div>
				<div>HexRow_5</div>
			</div>
		</div>
	}
}

ReactDom.render(<App/>, document.getElementById('app'));