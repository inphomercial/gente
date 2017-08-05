import {d100} from '../functions';

export default function DeathSystem(world, person) {
	// Ensure person has proper component	
	this.hasComponent(person);

	// Check for random accident
	if (this.rollForFreakAccident(world)) {
		this.handleFreakAccident(world, person);
		return;
	}

	// Check if a baby has SIDS
	if (this.rollForSids(world, person)) {
		this.handleSids(world, person);
		return;
	}
}

DeathSystem.prototype.rollForSids = function(world, person) {
	if (person.components.Age.getAgeInYears() <= 3) {
		let sidsRate = world.settings.infantMortalityRate;
		return d100() < sidsRate;
	}

	return false;
}

DeathSystem.prototype.handleSids = function(world, person) {
	this.killPerson(world.currentYears, person, 'SIDS');
}

DeathSystem.prototype.handleFreakAccident = function(world, person) {
	let currentYear = world.currentYear;

	this.killPerson(currentYear, person, 'a freak accident');
}

DeathSystem.prototype.rollForFreakAccident = function(world) {
	let accidentRate = world.settings.freakAccidentDeathRate;

	return d100() <= accidentRate;
}

DeathSystem.prototype.killPerson = function(currentYear, person, cause) {
	window.logger.add(`${person.components.Name.getFirstName()} has died of ${cause} at the age of ${person.components.Age.getAgeInYears()}`, person);
	person.components.Health.setIsAlive(false);
	person.components.Age.setDateOfDeath(currentYear);
}

DeathSystem.prototype.hasComponent = function(person) {
	if (!person.hasComponent('Health')) {
		throw "Person doesnt have Health component";
	}
}
