import React from 'react';

export default function LeaderBoard(props) {
	return (
		<table>
			<tbody>
			<tr>
				<th>Rank</th>
				<th>Name</th>
				<th>Record</th>
			</tr>
			{props.leaders.map((leader, i) => 
				<tr>
					<td>{i + 1}</td>
					<td>{leader.username}</td>
					<td>{leader.wins}</td>
				</tr>
				)}
			</tbody>
		</table>
		)
}