import React, { Component} from 'react';

class Log extends Component {

	render() {
		return (
			<li onClick={this.props.onSelectPerson}>{this.props.text}</li>
		)
	}
}

export default Log;
