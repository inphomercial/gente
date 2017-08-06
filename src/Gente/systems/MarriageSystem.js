
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

	// Loop through and see if anyone marrys
	for (var i = 0; i < world.populace.length; i++) {
		let possibleSpouse = world.populace[i];
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
