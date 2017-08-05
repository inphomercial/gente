import {d100} from '../functions';

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


	// Check if a baby for SIDAS
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

DeathSystem.prototype.rollForHeartDisease = function(world) {
	let rate = world.settings.heartDiseaseDeathRate;
	return d100() < rate;
}

DeathSystem.prototype.handleHeartDisease = function(world, person) {
	let name = person.components.Name.getFirstName();
	window.logger.add(`${name} has died from heart disease`, person);
	this.killPerson(world.currentYears, person);
}

DeathSystem.prototype.rollForLiverCancer = function(world) {
	let rate = world.settings.liverCancerDeathRate;
	return d100() < rate;
}

DeathSystem.prototype.handleLiverCancer = function(world, person) {
	let name = person.components.Name.getFirstName();
	window.logger.add(`${name} has died from liver cancer`, person);
	this.killPerson(world.currentYears, person);
}

DeathSystem.prototype.rollForLungCancer = function(world) {
	let rate = world.settings.lungCancerDeathRate;
	return d100() < rate;
}

DeathSystem.prototype.handleLungCancer = function(world, person) {
	let name = person.components.Name.getFirstName();
	window.logger.add(`${name} has died from lung cancer`, person);
	this.killPerson(world.currentYears, person);
}

DeathSystem.prototype.handleSids = function(world, person) {
	window.logger.add("A baby has died from SIDS", person);
	this.killPerson(world.currentYears, person);
}

DeathSystem.prototype.handleFreakAccident = function(world, person) {
	let currentYear = world.currentYear;

	window.logger.add("A person has died from a freak accident", person);
	this.killPerson(currentYear, person);
}

DeathSystem.prototype.rollForFreakAccident = function(world) {
	let accidentRate = world.settings.freakAccidentDeathRate;

	return d100() < accidentRate;
}

DeathSystem.prototype.checkForSids = function(sidsRate, person) {
	return d100() < sidsRate;
}

DeathSystem.prototype.killPerson = function(currentYear, person) {
	person.components.Health.setIsAlive(false);
	person.components.Age.setDateOfDeath(currentYear);
}

DeathSystem.prototype.hasComponent = function(person) {
	if (!person.hasComponent('Health')) {
		throw "Person doesnt have Health component";
	}
}
