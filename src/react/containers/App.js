
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
				<section className="section">
					<div className="container">
						<h1 className="title">
							Gente	
						</h1>
						<p className="subtitle">
							A thing about <strong>people</strong>
						</p>

						{/*<a className="button" onClick={() => this.incrementYear()}>1 Year</a>
						<a className="button" onClick={() => this.increment10Years()}>10 Years</a>*/}
					</div>
				</section>
				
				<WorldStats world={this.state.world} />

				<div className="columns">
					<div className="column is-4"></div>
					<div className="column is-2">
						<a className="button" onClick={() => this.incrementYear()}>1 Year</a>
					</div>
					<div className="column">
						<a className="button" onClick={() => this.increment10Years()}>10 Years</a>
					</div>
				</div>

				{logs && <LogsContainer logs={logs} />}

			</div>
		)
	}
}

export default App;
