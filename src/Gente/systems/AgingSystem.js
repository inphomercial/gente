
export default function AgingSystem(world, person) {
	hasComponent(person);

	person.get('Age').incrementAge();
}

function hasComponent(person) {
	try {
		if (!person.hasComponent('Age')) {
			throw new Error("Person doesnt have Age component");
		}
	} catch(e) {
		debugger;
	}
}
