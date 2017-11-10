
import {d100} from '../functions';

export default function AfflictionSystem(world, person) {
	hasComponent(person);

	// Temp for testing
	if (d100() < 2) {
		console.log("A new affliction was created");
		person.afflictions.push(world.repositories.affliction.random());
	}

	runAfflictions(person);
}

function hasComponent(person) {
	try {
		if (!person.hasComponent('Health')) {
			throw "Person doesnt have Health component";
		}
	} catch(e) {
		debugger;
	}
}

function runAfflictions(person) {
	if (!person.afflictions || !person.afflictions.length) {
		return;
	}

	let numberOfAfflictions = person.afflictions.length;
	for(var i = 0; i < numberOfAfflictions; i++) {
		person.afflictions[i].act();
	}
}
