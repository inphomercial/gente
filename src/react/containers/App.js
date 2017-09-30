
import React, { Component} from 'react';

import World from '../../Gente/World';
import {worldTemplate} from '../../Gente/data/worldTemplate';

import Header from '../components/Header';
import WorldStats from '../components/WorldStats';
import LogsContainer from './LogsContainer';

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

	incrementByYears(amount) {
		if (!amount) throw "No amount to increment by";

		let world = this.state.world;
		for (var i = 1; i <= amount; i++) {
			world.takeTurn();
		}

		this.setState({world: world});
	}

	render() {
		const {currentYear} = this.state.world;
		const logs = window.logger.getLog()[currentYear];

		return (
			<div>
				<Header />	
				
				<WorldStats world={this.state.world} />

				<div className="columns">
					<div className="column is-4"></div>
					<div className="column is-2">
						<a className="button" onClick={() => this.incrementByYears(1)}>1 Year</a>
					</div>
					<div className="column">
						<a className="button" onClick={() => this.incrementByYears(10)}>10 Years</a>
					</div>
				</div>

				{logs && <LogsContainer world={this.state.world} logs={logs} />}

			</div>
		)
	}
}

export default App;
