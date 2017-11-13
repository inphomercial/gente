
import PersonGenerator from '../generators/PersonGenerator';

import {d100Precise} from '../functions';

import {killPerson} from './DeathSystem';

export default function BirthSystem(world, person) {

	if (!isAbleToGetPregnant(world, person)) {
		return;
	}
		
	const momName = person.get('Name').getFullName();
	const husband = world.findPersonById(person.get('Marriage').getSpouseId());

	if (isPregnantButNotFullTerm(person)) {
		person.get('Health').setIsFullTerm(true);
		window.logger.add(`${momName} has become full term`, person);
		return;
	}

	if (isAlreadyPregnantAndFullTerm(person)) {
		window.logger.add(`${momName} is giving birth.`, person);

		// Attempt to have baby
		if (doesMotherDieDuringBirth(world)) {
			killPerson(world, person, 'complications in child birth');
			return;
		}

		let lastName = husband.get('Name').getLastName();
		let babyTemplate = {
			age: 0,
			lastName,
			fertility: 0
		};
	
		let baby = new PersonGenerator(babyTemplate, world);
	
		person.get('Children').addChild(baby.id);
		husband.get('Children').addChild(baby.id);

		person.get('Health').setIsPregnant(false);
		person.get('Health').setIsFullTerm(false);

		baby.parents.motherId = person.id;
		baby.parents.fatherId = person.get('Marriage').getSpouseId();

		world.addPerson(baby);

		window.logger.add(`${momName} has had a baby.`, baby);
		window.logger.add(`${baby.get('Name').getFullName()} has been born.`, baby);

		return;
	}
	
	// Check if can gets pregnant
	isNotPregnantAndBothFertile(person, husband);
}

function isNotPregnantAndBothFertile(woman, male) {
	if(!woman.get('Health').getIsPregnant()
		&& male.get('Health').getIsAlive()
		&& (male.get('Fertility').get() + woman.get('Fertility').get()) > 75) {
			makePregnant(woman);
	}
}

function makePregnant(woman) {
	const momName = woman.get('Name').getFullName();
	woman.get('Health').setIsPregnant(true);
	
	window.logger.add(`${momName} has become pregnant`, woman);
}

function isPregnantButNotFullTerm(person) {
	return person.get('Health').getIsPregnant() && !person.get('Health').getIsFullTerm();
}

function isAlreadyPregnantAndFullTerm(person) {
	return person.get('Health').getIsPregnant() && person.get('Health').getIsFullTerm();
}

function doesMotherDieDuringBirth(world) {
	return d100Precise() <= world.settings.birthParentMortalityRate;
}

function isAbleToGetPregnant(world, person) {
	let minAge = world.settings.minPregnantAge;

	return person.get('Marriage').getIsMarried()
		&& person.get('Sex').isFemale()
		&& person.get('Age').getAgeInYears() >= minAge;
}


