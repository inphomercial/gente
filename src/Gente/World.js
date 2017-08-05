
import PersonGenerator from './generators/PersonGenerator';

import AgingSystem from './systems/AgingSystem';
import MarriageSystem from './systems/MarriageSystem';
import BirthSystem from './systems/BirthSystem';
import DeathSystem from './systems/DeathSystem';

export default class World {

	constructor(settings) {
		this.startingYear = settings.startingYear;
		this.currentYear = settings.startingYear;

		this.population = 0;
		this.dead = 0;

		this.settings = settings;

		this.populace = [];
	}

	takeTurn() {
		this.incrementYear();

		for (var i = 0; i < this.populace.length; i++) {

			let person = this.populace[i];

			if (!person.components.Health.getIsAlive()) {
				continue;
			}

			// Check for deaths
			new DeathSystem(this, person);

			// Run Systems
			new AgingSystem(this, person);

			// Marriage Events
			new MarriageSystem(this, person);

			// Birth Events
			new BirthSystem(this, person);
		}

		this.analyzeYear();
	}

	analyzeYear() {
		this.population = this.countPopulation();
		this.dead = this.countDead();
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
		return this.populace.reduce((population, person) => {
			if (person.components.Health.getIsAlive()) {
				return population+=1;
			}
			return population;
		}, 0);
	}

	countDead() {
		return this.populace.reduce((dead, person) => {
			if (!person.components.Health.getIsAlive()) {
				return dead+=1;
			}
			return dead;
		}, 0);
	}

	addPerson(person) {
		this.populace.push(person);
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
	}

	getAllAlive() {
		return this.populace.filter(function(person) {
			return person.components.Health.getIsAlive();
		});
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
		return this.populace.filter(function(person) {
			return !person.components.Health.getIsAlive();
		})
	}

}
