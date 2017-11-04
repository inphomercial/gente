
export default function AfflictionSystem(world, person) {
	hasComponent(person);

	// TODO
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
