
export default function AgingSystem(world, person) {
	this.hasComponent(person);

	person.components.Age._age++;
}

AgingSystem.prototype.hasComponent = function(person) {
	if (!person.hasComponent('Age')) {
		throw "Person doesnt have Age component";
	}
}
