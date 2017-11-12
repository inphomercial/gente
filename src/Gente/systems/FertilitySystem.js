
export default function FertilitySystem(world, person) {
	hasComponent(person);

	if (person.components.Age._age > 11 && person.components.Age._age < 45) {
		console.log("person %s fertility increased", person);
		person.components.Fertility._fertility++;
	}
	
	if (person.components.Age._age >= 45) {
		console.log("person %s fertility decreased", person);
		person.components.Fertility._fertility--;
	}
}

function hasComponent(person) {
	try {
		if (!person.hasComponent('Fertility')) {
			throw "Person doesnt have Fertility component";
		}
	} catch(e) {
		debugger;
	}
}
