
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
	for (var i = 0; i < world.populace.length && i <= suitors; i++) {
		let possibleSpouse = world.populace[startingIndex + i];
		if (!possibleSpouse) {
			console.log(startingIndex + i);
		}
		let eligible = possibleSpouse.components.Age.getAgeInYears() > world.settings.minMarryAge &&
			!possibleSpouse.components.Marriage.getIsMarried() &&
			!person.id !== possibleSpouse.id &&
			person.components.Sex.getSex() !== possibleSpouse.components.Sex.getSex();

		// TODO: Come up with a better means of telling if they marry
		if (eligible && d100() > 95) {
			let personName = person.components.Name.getFirstName();
			let spouseName = possibleSpouse.components.Name.getFirstName();
			window.logger.add(`${personName} has married ${spouseName}`, person);
			window.logger.add(`${spouseName} has married ${personName}`, possibleSpouse);

			person.components.Marriage.marryTo(possibleSpouse);
			possibleSpouse.components.Marriage.marryTo(person);
			break;
		}
	}
}
