
import PersonGenerator from '../generators/PersonGenerator';

import {d100, d100Precise} from '../functions';

import {killPerson} from './DeathSystem';

export default function BirthSystem(world, person) {

	if (!isAbleToGetPregnant(world, person)) {
		return;
	}
		
	const momName = person.components.Name.getFullName();
	const husband = world.findPersonById(person.components.Marriage.getSpouseId());

	if (isPregnantButNotFullTerm(person)) {
		person.components.Health.setIsFullTerm(true);
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

		let lastName = husband.components.Name.getLastName();
		let babyTemplate = {
			age: 0,
			lastName,
			fertility: 0
		};
	
		let baby = new PersonGenerator(babyTemplate, world);
	
		person.components.Children.addChild(baby.id);
		husband.components.Children.addChild(baby.id);

		person.components.Health.setIsPregnant(false);
		person.components.Health.setIsFullTerm(false);

		baby.parents.motherId = person.id;
		baby.parents.fatherId = person.components.Marriage.getSpouseId();

		world.addPerson(baby);

		window.logger.add(`${momName} has had a baby.`, baby);
		window.logger.add(`${baby.components.Name.getFullName()} has been born.`, baby);
		return;
	}
	
	// Check if can gets pregnant
	isNotPregnantAndBothFertile(person, husband);
}

function isNotPregnantAndBothFertile(woman, male) {
	if(!woman.components.Health.getIsPregnant()
		&& male.components.Health.getIsAlive()
		&& (male.components.Fertility.get() + woman.components.Fertility.get()) > 75) {
			makePregnant(woman);
	}
}

function makePregnant(woman) {
	const momName = woman.components.Name.getFullName();
	woman.components.Health.setIsPregnant(true);
	
	window.logger.add(`${momName} has become pregnant`, woman);
}

function isPregnantButNotFullTerm(person) {
	return person.components.Health.getIsPregnant() && !person.components.Health.getIsFullTerm();
}

function isAlreadyPregnantAndFullTerm(person) {
	return person.components.Health.getIsPregnant() && person.components.Health.getIsFullTerm();
}

function doesMotherDieDuringBirth(world) {
	return d100Precise() <= world.settings.birthParentMortalityRate;
}

function isAbleToGetPregnant(world, person) {
	let minAge = world.settings.minPregnantAge;

	return person.components.Marriage.getIsMarried()
		&& person.components.Sex.isFemale()
		&& person.components.Age.getAgeInYears() >= minAge;
}


