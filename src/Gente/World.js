import { sampleSize } from 'lodash'

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
		this.averageLifeSpan = 0;

		this.settings = settings;

		this.populace = [];
		this.deadPopulace = [];
	}

	takeTurn() {
		this.incrementYear();

    console.log('World population on this turn: %i', this.populace.length)
    let sample = sampleSize(this.populace, this.settings.turnSampleSize)
		for (var i = 0; i < sample.length; i++) {

			let person = sample[i];

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
		this.population = this.countPopulation();
		this.dead = this.countDead();
		// TODO: find more performant way of doing this i.e. caching previous results and only adding newly dead
		this.averageLifeSpan = this.getAverageLifespan();
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
		if (this.dead <= 0) {
			return 0;
		}
		const totalAge = this.deadPopulace.reduce((age, person) => {
			return age+=person.components.Age.getAgeInYears();
		}, 0);

		return totalAge / this.dead;
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
