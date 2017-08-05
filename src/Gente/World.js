
import PersonGenerator from './generators/PersonGenerator';

import AgingSystem from './systems/AgingSystem';
import MarriageSystem from './systems/MarriageSystem';
import BirthSystem from './systems/BirthSystem';
import DeathSystem from './systems/DeathSystem';

export default class World {

	constructor(settings) {
		this.startingYear = settings.startingYear;
		this.currentYear = settings.startingYear;

		this.settings = settings;

		this.populace = [];
		this.buildings = [];

		// stuff
		// relationships
		// jobs

	}

	takeTurn() {
		this.incrementYear();

		for (var i = 0; i < this.populace.length; i++) {

			let person = this.populace[i];
			
			if (!person.components.Health.getIsAlive()) {
				return;
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

		// Events
			
	}

	incrementYear() {
		this.currentYear++;
	}

	generateInitialPopulation() {
		for (var i = 0; i < this.settings.initialPopulationCount; i++) {
			let person = new PersonGenerator(); 

			this.addPerson(person);
		}
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
