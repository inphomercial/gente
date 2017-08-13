import React, { Component} from 'react';

class WorldStats extends Component {

	render() {
		const {stats} = this.props.world;

		return (
			<pre><code>{JSON.stringify(stats, undefined, 4)}</code></pre>
		)
	}
}

export default WorldStats;
