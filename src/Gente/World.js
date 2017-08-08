
import PersonGenerator from './generators/PersonGenerator';

import AgingSystem from './systems/AgingSystem';
import MarriageSystem from './systems/MarriageSystem';
import BirthSystem from './systems/BirthSystem';
import DeathSystem from './systems/DeathSystem';

export default class World {

	constructor(settings) {
		this.startingYear = settings.startingYear;
		this.currentYear = settings.startingYear;

		this.stats = {};
		this.stats.startingYear = this.startingYear;
		this.stats.currentYear = this.startingYear;
		this.stats.population = 0;
		this.stats.dead = 0;
		this.stats.averageLifeSpan = 0;

		this.settings = settings;

		this.deadPopulace = [];
		this.populace = [];
	}

	takeTurn() {
		this.incrementYear();

		for (var i = 0; i < this.populace.length; i++) {

			let person = this.populace[i];

			// Run Systems
			new AgingSystem(this, person);

			// Marriage Events
			new MarriageSystem(this, person);

			// Birth Events
			new BirthSystem(this, person);

			// Check for deaths, always has to be last
			new DeathSystem(this, person);
		}

		this.analyzeYear();
	}

	analyzeYear() {
		this.stats.currentYear = this.currentYear;
		this.stats.population = this.countPopulation();
		this.stats.dead = this.countDead();
		// TODO: find more performant way of doing this i.e. caching previous results and only adding newly dead
		this.stats.averageLifeSpan = this.getAverageLifespan();
	}

	incrementYear() {
		this.currentYear++;
	}

	generateInitialPopulation() {
		for (var i = 0; i < this.settings.initialPopulationCount; i++) {
			let person = new PersonGenerator({}, this);

			this.addPerson(person);
		}
	}

	countPopulation() {
		return this.populace.length;
	}

	countDead() {
		return this.deadPopulace.length;
	}

	getAverageLifespan() {
		if (this.stats.dead <= 0) {
			return 0;
		}
		const totalAge = this.deadPopulace.reduce((age, person) => {
			return age+=person.components.Age.getAgeInYears();
		}, 0);

		return totalAge / this.stats.dead;
	}

	addPerson(person) {
		this.populace.push(person);
	}

	removePerson(person) {
		this.populace.splice(this.populace.indexOf(person), 1);
	}

	addDeadPerson(person) {
		this.deadPopulace.push(person);
	}

	addBuilding(building) {
		this.buildings.push(building);
	}

	findPersonById(personId) {
		for (var i = 0; i < this.populace.length; i++) {
			if (personId === this.populace[i].id) {
				return this.populace[i];
			}
		}
		for (var i = 0; i < this.deadPopulace.length; i++) {
			if (personId === this.deadPopulace[i].id) {
				return this.deadPopulace[i];
			}
		}
	}

	findPersonAndImmediateFamily(personId) {
		let family = {};
		let spouse = null;
		let children = [];
		let parents = [];

		let person = this.findPersonById(personId);

		let spouseId = person.components.Marriage.getSpouseId();
		if (spouseId) {
			spouse = this.findPersonById(spouseId);
		}

		let kids = person.components.Children.getChildren();
		if (kids.length) {
			for (var i = 0, len = kids.length; i < len; i++) {
				children.push(this.findPersonById(kids[i]));
			}
		}

		if (person.parents.motherId) {
			parents.push(this.findPersonById(person.parents.motherId))
		}
		if (person.parents.fatherId) {
			parents.push(this.findPersonById(person.parents.fatherId))
		}

		family.person = person;
		family.parents = parents;
		family.spouse = spouse;
		family.children = children;

		return family;
	}

	getAllAlive() {
		return this.populace;
	}

	getAllPregnant() {
		return this.populace.filter(function(person) {
			return person.components.Health.getIsPregnant();
		});
	}

	getAllMarried() {
		return this.populace.filter(function(person) {
			return person.components.Marriage.getIsMarried();
		})
	}

	getAllDead() {
		return this.deadPopulace;
	}

}
