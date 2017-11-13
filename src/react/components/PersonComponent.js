import React, { Component} from 'react';

class PersonComponent extends Component {

	render() {
		const {person} = this.props;
		const imageUrl = "http://api.adorable.io/avatar/" + person.id;

		return (
			<div className="card">
				{/* <div className="card-image">
					<figure className="image is-4by3">
						<img src={ imageUrl } alt="Image" />
					</figure>
				</div> */}
				<div className="card-content">
					<div className="media">
						{/* <div className="media-left">
							<figure className="image is-48x48">
								<img src="http://bulma.io/images/placeholders/96x96.png" alt="Image" />
							</figure>
						</div> */}
						<div className="media-content">
							<p className="title is-4">{ person.components.Name.getFullName() }</p>
							<p className="subtitle is-6">{ person.id }</p>
						</div>
					</div>

					<div className="content">
						Born { person.get('Age').getDateOfBirth() } - { person.get('Age').getDateOfDeath() }
						<br />
						Age { person.get('Age').getAgeInYears() }
						<br />
						Married { person.get('Marriage').getIsMarried() ? "Y" : "N" }
						<br />
						Children { person.get('Children').getChildren().length }
						<br />
						Fertility { person.get('Fertility').get() }
						<br />
						Relatives	William Mapother (paternal first cousin)
						<br />
						<a>Parents</a> <a>Children</a>
						<br />
					</div>
				</div>
			</div>
		)
	}
}

export default PersonComponent;
