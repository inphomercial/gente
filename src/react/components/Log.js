import React, { Component} from 'react';

class Log extends Component {

	render() {
		return (
			<li>{this.props.text}</li>
		)
	}
}

export default Log;
