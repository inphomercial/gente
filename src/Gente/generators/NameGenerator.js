
import {FIRST_NAME_MALE, FIRST_NAME_FEMALE, LAST_NAME} from '../data/names';
import {dRoll} from '../functions';

export default function NameGenerator(personTemplate) {

	if (personTemplate.sex === "Female") {
		personTemplate.firstName = firstNameFemaleGenerator();
	}

	if (personTemplate.sex === "Male") {
		personTemplate.firstName = firstNameMaleGenerator();
	}
		
	personTemplate.lastName = lastNameGenerator();

	return personTemplate;
}

function firstNameMaleGenerator() {
	let num = dRoll(0, FIRST_NAME_MALE.length);

	return FIRST_NAME_MALE[num];
}

function firstNameFemaleGenerator() {
	let num = dRoll(0, FIRST_NAME_FEMALE.length);

	return FIRST_NAME_FEMALE[num];
}

function lastNameGenerator() {
	let num = dRoll(0, LAST_NAME.length);

	return LAST_NAME[num];
}
