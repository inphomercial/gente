import {d100Precise} from '../functions';

export default function DeathSystem(world, person) {
	// Ensure person has proper component	
	this.hasComponent(person);

	// Check for random accident
	if (this.rollForFreakAccident(world)) {
		this.handleFreakAccident(world, person);
		return;
	}

	// Check for lung cancer
	if (this.rollForLungCancer(world)) {
		this.handleLungCancer(world, person);
		return;
	}
	
	// Check for liver cancer
	if (this.rollForLiverCancer(world)) {
		this.handleLiverCancer(world, person);
		return;
	}
	
	// Check for heart disease 
	if (this.rollForHeartDisease(world)) {
		this.handleHeartDisease(world, person);
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
		return d100Precise() <= sidsRate;
	}

	return false;
}

DeathSystem.prototype.rollForHeartDisease = function(world) {
	let rate = world.settings.heartDiseaseDeathRate;
	return d100Precise() <= rate;
}

DeathSystem.prototype.handleHeartDisease = function(world, person) {
	this.killPerson(world.currentYear, person, 'heart disease');
}

DeathSystem.prototype.rollForLiverCancer = function(world) {
	let rate = world.settings.liverCancerDeathRate;
	return d100Precise() <= rate;
}

DeathSystem.prototype.handleLiverCancer = function(world, person) {
	this.killPerson(world.currentYear, person, 'liver cancer');
}

DeathSystem.prototype.rollForLungCancer = function(world) {
	let rate = world.settings.lungCancerDeathRate;
	return d100Precise() <= rate;
}

DeathSystem.prototype.handleLungCancer = function(world, person) {
	this.killPerson(world.currentYear, person, 'lung cancer');
}

DeathSystem.prototype.handleSids = function(world, person) {
	this.killPerson(world.currentYear, person, 'SIDS');
}

DeathSystem.prototype.handleFreakAccident = function(world, person) {
	this.killPerson(world.currentYear, person, 'a freak accident');
}

DeathSystem.prototype.rollForFreakAccident = function(world) {
	let accidentRate = world.settings.freakAccidentDeathRate;

	return d100Precise() <= accidentRate;
}

export function killPerson(currentYear, person, cause) {
	window.logger.add(`${person.components.Name.getFirstName()} has died of ${cause} at the age of ${person.components.Age.getAgeInYears()}`, person);
	person.components.Health.setIsAlive(false);
	person.components.Age.setDateOfDeath(currentYear);
}

DeathSystem.prototype.killPerson = killPerson;

DeathSystem.prototype.hasComponent = function(person) {
	if (!person.hasComponent('Health')) {
		throw "Person doesnt have Health component";
	}
}
