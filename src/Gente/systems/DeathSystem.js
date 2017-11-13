import {d100Precise} from '../functions';

export default function DeathSystem(world, person) {
	// Ensure person has proper component	
	hasComponent(person);

	// Check for random accident
	if (rollForFreakAccident(world)) {
		handleFreakAccident(world, person);
		return;
	}

	// Check for lung cancer
	if (rollForLungCancer(world)) {
		handleLungCancer(world, person);
		return;
	}
	
	// Check for liver cancer
	if (rollForLiverCancer(world)) {
		handleLiverCancer(world, person);
		return;
	}
	
	// Check for heart disease 
	if (rollForHeartDisease(world)) {
		handleHeartDisease(world, person);
		return;
	}

	// Check if a baby has SIDS
	if (rollForSids(world, person)) {
		handleSids(world, person);
		return;
	}
}

function rollForSids(world, person) {
	if (person.get('Age').getAgeInYears() <= 3) {
		let sidsRate = world.settings.infantMortalityRate;
		return d100Precise() <= sidsRate;
	}

	return false;
}

function rollForHeartDisease(world) {
	let rate = world.settings.heartDiseaseDeathRate;
	return d100Precise() <= rate;
}

function handleHeartDisease(world, person) {
	killPerson(world, person, 'heart disease');
}

function rollForLiverCancer(world) {
	let rate = world.settings.liverCancerDeathRate;
	return d100Precise() <= rate;
}

function handleLiverCancer(world, person) {
	killPerson(world, person, 'liver cancer');
}

function rollForLungCancer(world) {
	let rate = world.settings.lungCancerDeathRate;
	return d100Precise() <= rate;
}

function handleLungCancer(world, person) {
	killPerson(world, person, 'lung cancer');
}

function handleSids(world, person) {
	killPerson(world, person, 'SIDS');
}

function handleFreakAccident(world, person) {
	killPerson(world, person, 'a freak accident');
}

function rollForFreakAccident(world) {
	let accidentRate = world.settings.freakAccidentDeathRate;

	return d100Precise() <= accidentRate;
}

export function killPerson(world, person, cause) {
	window.logger.add(`${person.get('Name').getFullName()} has died of ${cause} at the age of ${person.get('Age').getAgeInYears()}`, person);
	person.get('Health').setIsAlive(false);

	person.get('Age').setDateOfDeath(world.currentYear);
	world.addDeadPerson(person);
	world.removePerson(person);
}
DeathSystem.prototype.killPerson = killPerson;

function hasComponent(person) {
	if (!person.hasComponent('Health')) {
		throw new Error("Person doesnt have Health component");
	}
}
