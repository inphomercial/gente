
import PersonGenerator from '../generators/PersonGenerator';
import {Person} from '../Person';

import {d100} from '../functions';

export default function BirthSystem(world, person) {

	if (!this.isAbleToBirth(person)) {
		return;
	}
		
	let momName = person.components.Name.getFirstName();

	// Check if already pregnant but not full term
	// checkIfPregnantButNotFullTerm
	if (person.components.Health.getIsPregnant() && !person.components.Health.getIsFullTerm()) {
		person.components.Health.setIsFullTerm(true);
		window.logger.add(`${momName} has become full term`, person);
		return;
	}

	// Check if already pregnant and fullterm
	// alreadyPregnantAndFullTerm
	if (person.components.Health.getIsPregnant() && person.components.Health.getIsFullTerm()) {
		window.logger.add(`${momName} is giving birth.`, person);

		// Attempt to have baby
		if (this.doesMotherDieDuringBirth(world)) {
			window.logger.add(`${momName} has died during child birth`, person);
			person.components.Health.setIsAlive(false);
			return;
		}

		let husband = world.findPersonById(person.components.Marriage.getSpouseId());

		let lastName = husband.components.Name.getLastName();
		let babyTemplate = {
			age: 0,
			lastName 
		}
	
		let baby = new PersonGenerator(babyTemplate); 
	
		person.components.Children.addChild(baby.id);
		husband.components.Children.addChild(baby.id);

		person.components.Health.setIsPregnant(false);
		person.components.Health.setIsFullTerm(false);

		baby.parents.motherId = person.id;
		baby.parents.fatherId = person.components.Marriage.getSpouseId();

		world.addPerson(baby);

		let momName = person.components.Name.getFirstName();
		window.logger.add(`${momName} has had a baby.`, baby);
		return;
	}
	
	// Check if can gets pregant
	if (!person.components.Health.getIsPregnant()) {
		person.components.Health.setIsPregnant(true);
		window.logger.add(`${momName} has become pregnant`, person);
	}
}

BirthSystem.prototype.doesMotherDieDuringBirth = function(world) {
	return d100() <= world.settings.birthParentMortalityRate;
}

BirthSystem.prototype.isAbleToBirth = function(person) {
	return person.components.Health.getIsAlive() && 
	person.components.Marriage.getIsMarried() &&
	person.components.Sex.isFemale();
}

