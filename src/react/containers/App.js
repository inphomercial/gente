
import React, { Component} from 'react';

import World from '../../Gente/World';
import {worldTemplate} from '../../Gente/data/worldTemplate';

import LogsContainer from './LogsContainer';
import WorldStats from '../components/WorldStats';

class App extends Component {
	constructor(props) {
		super(props);
		
		let world = new World(worldTemplate);
		world.generateInitialPopulation();

		console.log("Initial World", world);
		window.world = world;

		this.state = {
			world: world
		}
	}

	incrementYear() {
		let world = this.state.world;
		world.takeTurn();
		this.setState({world: world});
	}

	increment10Years() {
		let world = this.state.world;
		for (var i = 0; i < 10; i++) {
			world.takeTurn();
		}
		this.setState({world: world});
	}

	render() {
		const {currentYear} = this.state.world;
		const logs = window.logger.getLog()[currentYear];

		return (
			<div>
				<div className="App-header">
					<h2>Gente</h2>

					<button onClick={() => this.incrementYear()}>+1</button>
					<button onClick={() => this.increment10Years()}>+10</button>
				</div>

				{logs && <LogsContainer logs={logs} />}

				<WorldStats world={this.state.world} />

			</div>
		)
	}
}

export default App;
