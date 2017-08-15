
export function Logger() {
	this.log = {};
}

Logger.prototype.add = function(text, person) {
	let year = window.world.currentYear;

	if (typeof this.log[year] === 'undefined') {
		this.log[year] = [];
	}

	let logObject = {
		id: person.id,
		text: text
	}

	this.log[year].push(logObject);

	if (person) {
		let year = window.world.currentYear;
		if (typeof person.log[year] !== Array) {
			person.log[year] = [];
		}

		person.log[year].push(text);
	}
}

Logger.prototype.getLog = function() {
	return this.log;
}
