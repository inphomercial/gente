
import {FIRST_NAME_MALE, FIRST_NAME_FEMALE, LAST_NAME} from '../data/names';
import {dRoll} from '../functions';

export default function NameGenerator(personTemplate) {

	if (personTemplate.sex === "Female") {
		personTemplate.firstName = this.firstNameFemaleGenerator();
	}

	if (personTemplate.sex === "Male") {
		personTemplate.firstName = this.firstNameMaleGenerator();
	}
		
	personTemplate.lastName = this.lastNameGenerator();

	return personTemplate;
}

NameGenerator.prototype.firstNameMaleGenerator = function() {
	let num = dRoll(FIRST_NAME_MALE.length);

	return FIRST_NAME_MALE[num];
}

NameGenerator.prototype.firstNameFemaleGenerator = function() {
	let num = dRoll(FIRST_NAME_FEMALE.length);

	return FIRST_NAME_FEMALE[num];
}

NameGenerator.prototype.lastNameGenerator = function() {
	let num = dRoll(LAST_NAME.length);

	return LAST_NAME[num];
}
