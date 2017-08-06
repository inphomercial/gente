
import PersonGenerator from '../generators/PersonGenerator';

import {d100Precise} from '../functions';

import {killPerson} from './DeathSystem';

export default function BirthSystem(world, person) {

	if (!this.isAbleToGetPregnant(world, person)) {
		return;
	}
		
	const momName = person.components.Name.getFirstName().toString();
	const husband = world.findPersonById(person.components.Marriage.getSpouseId());

	if (this.isPregnantButNotFullTerm(person)) {
		person.components.Health.setIsFullTerm(true);
		window.logger.add(`${momName} has become full term`, person);
		return;
	}

	if (this.isAlreadyPregnantAndFullTerm(person)) {
		window.logger.add(`${momName} is giving birth.`, person);

		// Attempt to have baby
		if (this.doesMotherDieDuringBirth(world)) {
			killPerson(world, person, 'complications in child birth');
			return;
		}

		let lastName = husband.components.Name.getLastName();
		let babyTemplate = {
			age: 0,
			lastName 
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
		return;
	}
	
	// Check if can gets pregant
	if (!person.components.Health.getIsPregnant() && husband.components.Health.getIsAlive()) {
		person.components.Health.setIsPregnant(true);
		window.logger.add(`${momName} has become pregnant`, person);
	}
}

BirthSystem.prototype.isPregnantButNotFullTerm = function(person) {
	return person.components.Health.getIsPregnant() && !person.components.Health.getIsFullTerm();
};

BirthSystem.prototype.isAlreadyPregnantAndFullTerm = function(person) {
	return person.components.Health.getIsPregnant() && person.components.Health.getIsFullTerm();
};

BirthSystem.prototype.doesMotherDieDuringBirth = function(world) {
	return d100Precise() <= world.settings.birthParentMortalityRate;
};

BirthSystem.prototype.isAbleToGetPregnant = function(world, person) {
	let minAge = world.settings.minPregnantAge;

	return person.components.Marriage.getIsMarried() &&
	person.components.Sex.isFemale() &&
	person.components.Age.getAgeInYears() >= minAge;
};

