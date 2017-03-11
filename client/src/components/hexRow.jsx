import React from 'react';
import ReactDom from 'react-dom';
import Hexagon from 'react-hexagon';

function HexRow(props) {
	return <div>
			<Hexagon style={{stroke: '#42873f'}} className="hex1"/>
			<Hexagon style={{stroke: '#42873f'}} className="hex2"/>
			<Hexagon style={{stroke: '#42873f'}} className="hex3"/>
	</div>
}