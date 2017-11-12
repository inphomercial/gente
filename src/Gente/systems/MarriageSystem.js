
import {d100, dRoll} from '../functions';

export default function MarriageSystem(world, person) {

	const suitors = 100;

	if (!person.hasComponent('Marriage')) {
		console.log("Person doesnt have Marriage component");
		return;
	}
	
	// Check how their marriage is doing if married, maybe divorce or cheat.
	if (person.components.Marriage.getIsMarried()) {
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
			let personName = person.components.Name.getFullName();
			let spouseName = possibleSpouse.components.Name.getFullName();
			window.logger.add(`${personName} has married ${spouseName}`, person);
			window.logger.add(`${spouseName} has married ${personName}`, possibleSpouse);

			person.components.Marriage.marryTo(possibleSpouse);
			possibleSpouse.components.Marriage.marryTo(person);
			setFemaleToMaleLastName(person, possibleSpouse);
			break;
		}
	}
}

function isCoupleEligible(person1, person2, world) {
	return person1.components.Age.getAgeInYears() > world.settings.minMarryAge
		&& person1.components.Marriage.isNotMarried()
		&& !person2.id !== person1.id
		&& person2.components.Sex.getSex() !== person1.components.Sex.getSex()
		&& person2.components.Age.getAgeInYears() > world.settings.minMarryAge
		&& person2.components.Marriage.isNotMarried();
}

function setFemaleToMaleLastName(person1, person2) {

	if (person1.components.Sex.isFemale()) {
		person1.components.Name.setLastName(person2.components.Name.getLastName());

		return;
	}
	
	if (person2.components.Sex.isFemale()) {
		person2.components.Name.setLastName(person1.components.Name.getLastName());

		return;
	}
}
