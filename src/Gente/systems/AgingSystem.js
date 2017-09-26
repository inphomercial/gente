
export default function AgingSystem(world, person) {
	hasComponent(person);

	person.components.Age._age++;
}

function hasComponent(person) {
	if (!person.hasComponent('Age')) {
		throw "Person doesnt have Age component";
	}
}
