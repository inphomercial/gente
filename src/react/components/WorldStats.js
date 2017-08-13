import React, { Component} from 'react';

class WorldStats extends Component {

	render() {
		const {startingYear, currentYear, population, dead, averageLifeSpan} = this.props.world.stats;

		return (
			<nav className="level">
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Starting Year</p>
						<p className="title">{startingYear}</p>
					</div>
				</div>
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Current Year</p>
						<p className="title">{currentYear}</p>
					</div>
				</div>
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Population</p>
						<p className="title">{population}</p>
					</div>
				</div>
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Dead</p>
						<p className="title">{dead}</p>
					</div>
				</div>
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Avg Life Span</p>
						<p className="title">{averageLifeSpan}</p>
					</div>
				</div>
			</nav>
		)
	}
}

export default WorldStats;
