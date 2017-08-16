import React, { Component} from 'react';

import Log from '../components/Log';
import PersonComponent from '../components/PersonComponent';

class LogsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			family: null 
		}
	}

	buildLog() {
		const {logs} = this.props;

		return logs.map((log, i) => {
			return <Log key={i} id={log.id} text={log.text} onSelectPerson={() => this.selectFamily(log.id)} />;
		});
	}

	buildSelectedFamily() {
		return this.state.family ? this.state.family : null;
	}
	
	selectFamily(id) {
		const {world} = this.props;
		let family = world.findPersonAndImmediateFamily(id);
		console.log("family", family);

		this.setState({family: family});
	}

	render() {
		if (!this.props.logs) { return null }

		let listItems = this.buildLog();
		let family = this.buildSelectedFamily();

		return (
			<div className="columns">
				<div className="column is-one-quarter"></div>
				<div className="column is-one-quarter">
					<aside className="menu">
						<ul className="menu-list">
							{ listItems }
						</ul>
					</aside>
				</div>

				{ family &&
					<div className="column is-one-quarter">
						<PersonComponent person={family.person} />
					</div>
				}
			</div>
		)
	}
}

export default LogsContainer;
