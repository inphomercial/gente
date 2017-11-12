


import PersonGenerator from './generators/PersonGenerator';

import AgingSystem from './systems/AgingSystem';
import MarriageSystem from './systems/MarriageSystem';
import BirthSystem from './systems/BirthSystem';
import DeathSystem from './systems/DeathSystem';
import AfflictionSystem from './systems/AfflictionSystem';
import FertilitySystem from './systems/FertilitySystem';

import afflictionRepository from './repositories/afflictions';

export default class World {

	constructor(settings) {
		this.startingYear = settings.startingYear;
		this.currentYear = settings.startingYear;

		this.stats = {};
		this.stats.startingYear = this.startingYear;
		this.stats.currentYear = this.startingYear;
		this.stats.populationCount = 0;
		this.stats.deadCount = 0;
		this.stats.averageLifeSpan = 0;

		this.settings = settings;

		this.deadPopulace = [];
		this.populace = [];

		this.repositories = {"affliction": afflictionRepository.init()}
	}

	takeTurn() {

		try {
			this.incrementYear();

			for (var i = 0; i < this.populace.length; i++) {
				if (this.populace[i] === null) {
					continue;
				}

				let person = this.populace[i];

				AfflictionSystem(this, person);

				AgingSystem(this, person);

				FertilitySystem(this, person);

				MarriageSystem(this, person);

				BirthSystem(this, person);

				// Check for deaths, always has to be last
				DeathSystem(this, person);
			}

			this.analyzeYear();

			// Subject to change once populace is a hash table
			// let newPopulace = this.populace.filter(function(person) {
			// 	return person !== null;
			// });

			// this.populace = newPopulace;

		} catch (e) {
			debugger;
		}
	}

	analyzeYear() {
		this.stats.currentYear = this.currentYear;
		this.stats.populationCount = this.countPopulation();
		this.stats.deadCount = this.countDead();
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
		if (this.stats.deadCount <= 0) {
			return 0;
		}
		const totalAge = this.deadPopulace.reduce((age, person) => {
			age += person.components.Age.getAgeInYears();
			return age;
		}, 0);

		return Math.floor(totalAge / this.stats.deadCount);
	}

	addPerson(person) {
		this.populace.push(person);
	}

	removePerson(person) {
		// this.populace[this.populace.indexOf(person)] = null;
		// This needs to be fixed!
		// this.populace.splice(this.populace.indexOf(person), 1);

		for (var i = this.populace.length-1; i >= 0; i--) {
			if (this.populace[i].id == person.id) {
				this.populace.splice(i, 1);
			}
		}
	}

	addDeadPerson(person) {
		this.deadPopulace.push(person);
	}

	addBuilding(building) {
		this.buildings.push(building);
	}

	findPersonById(personId) {
		let populaceLength = this.populace.length;
		for (var i = 0; i < populaceLength; i++) {
			if (personId === this.populace[i].id) {
				return this.populace[i];
			}
		}

		let deadLength = this.deadPopulace.length;
		for (var j = 0; j < deadLength; i++) {
			if (personId === this.deadPopulace[j].id) {
				return this.deadPopulace[j];
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
