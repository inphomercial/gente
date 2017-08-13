import React, { Component} from 'react';

import Log from '../components/Log';

class LogsContainer extends Component {

	buildLog() {
		const {logs} = this.props;

		return logs.map(function(log, i) {
			return <Log key={i} text={log} />;
		});
	}

	render() {
		if (!this.props.logs) { return null }

		let listItems = this.buildLog();

		return (
			<div className="LogsContainer">
				<ul>
					{ listItems }
				</ul>
			</div>
		)
	}
}

export default LogsContainer;
