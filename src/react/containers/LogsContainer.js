import React, { Component} from 'react';

import Log from '../components/Log';

class LogsContainer extends Component {

	buildLog() {
		const {logs} = this.props;

		return logs.map(function(log, i) {
			return <Log key={i} id={log.id} text={log.text} />;
		});
	}

	render() {
		if (!this.props.logs) { return null }

		let listItems = this.buildLog();

		return (
			<div className="columns is-centered">
				<div className="column is-narrow">
					<aside className="menu">
						<ul className="menu-list">
							{ listItems }
						</ul>
					</aside>
				</div>
			</div>
		)
	}
}

export default LogsContainer;
