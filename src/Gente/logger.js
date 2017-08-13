
export function Logger() {
	// this.log = [];
	this.log = {};
}

Logger.prototype.add = function(text, person) {
	let year = window.world.currentYear;

	if (typeof this.log[year] === 'undefined') {
		this.log[year] = [];
	}

	this.log[year].push(`id: ${person.id}, ${text}`);

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
