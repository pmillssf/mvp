import React from 'react';
import ReactDom from 'react-dom';
import Hexagon from 'react-hexagon';
import Hex from './hex.jsx';

export default function HexRow(props) {
	return <div> {this.props.hexs.map((hex) => 
		<Hex style={{stroke: '#42873f'}} className="hex1"/>
		)}
	</div>
}

