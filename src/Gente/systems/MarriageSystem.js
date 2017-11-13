
import {d100, dRoll} from '../functions';

export default function MarriageSystem(world, person) {

	const suitors = 100;

	if (!person.hasComponent('Marriage')) {
		throw new Error("Person doesnt have Marriage component");
	}
	
	// Check how their marriage is doing if married, maybe divorce or cheat.
	if (person.get('Marriage').getIsMarried()) {
		return;
	}

	// Iterate on the populace starting at a random index
	// no higher than the number of suitors less than the length
	// and no lower than 0
	let indexModifier = world.populace.length - suitors;
	if (indexModifier < 0) {
		indexModifier = 0;
	}
	let startingIndex = dRoll(0, indexModifier);

	// Loop through and see if anyone marrys, stop when reach the end of populace or number of suitors
	let populaceLength = world.populace.length;
	for (var i = 0; i < populaceLength && i <= suitors; i++) {
		let possibleSpouse = world.populace[startingIndex + i];
		let eligible = isCoupleEligible(possibleSpouse, person, world);

		// TODO: Come up with a better means of telling if they marry
		if (eligible && d100() > 95) {
			let personName = person.get('Name').getFullName();
			let spouseName = possibleSpouse.get('Name').getFullName();
			window.logger.add(`${personName} has married ${spouseName}`, person);
			window.logger.add(`${spouseName} has married ${personName}`, possibleSpouse);

			person.get('Marriage').marryTo(possibleSpouse);
			possibleSpouse.get('Marriage').marryTo(person);
			setFemaleToMaleLastName(person, possibleSpouse);
			break;
		}
	}
}

function isCoupleEligible(person1, person2, world) {
	return person1.get('Age').getAgeInYears() > world.settings.minMarryAge
		&& person1.get('Marriage').isNotMarried()
		&& !person2.getId() !== person1.getId()
		&& person2.get('Sex').getSex() !== person1.get('Sex').getSex()
		&& person2.get('Age').getAgeInYears() > world.settings.minMarryAge
		&& person2.get('Marriage').isNotMarried();
}

function setFemaleToMaleLastName(person1, person2) {

	if (person1.get('Sex').isFemale()) {
		person1.get('Name').setLastName(person2.get('Name').getLastName());

		return;
	}
	
	if (person2.get('Sex').isFemale()) {
		person2.get('Name').setLastName(person1.get('Name').getLastName());

		return;
	}
}
