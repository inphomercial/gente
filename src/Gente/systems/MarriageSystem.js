
import {d100} from '../functions';

export default function MarriageSystem(world, person) {

	if (!person.hasComponent('Marriage')) {
		console.log("Person doesnt have Marriage component");
		return;
	}
	
	// Check how their marriage is doing if married, maybe divorce or cheat.

	if (person.components.Marriage.getIsMarried()) {
		return;
	}

	// Get eligible persons
	let eligibles = world.populace.filter(function(possibleSpouse) {
		return possibleSpouse.components.Age.getAgeInYears() > world.settings.minMarryAge &&
		!possibleSpouse.components.Marriage.getIsMarried() &&
		!person.id !== possibleSpouse.id &&
		person.components.Sex.getSex() !== possibleSpouse.components.Sex.getSex();
	});

	// Loop through and see if anyone marrys
	for (var p = 0; p < eligibles.length; p++) {

		// Come up with a better means of telling if they marry
		if (d100() > 95) {
			let personName = person.components.Name.getFirstName();
			let spouseName = eligibles[p].components.Name.getFirstName();
			window.logger.add(`${personName} has married ${spouseName}`, person);
			window.logger.add(`${spouseName} has married ${personName}`, eligibles[p]);

			person.components.Marriage.marryTo(eligibles[p]);
			eligibles[p].components.Marriage.marryTo(person);
		}
	}
}
