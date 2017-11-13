
export default function FertilitySystem(world, person) {
	hasComponent(person);

	if (person.components.Age.getAgeInYears() > 11 && person.components.Age.getAgeInYears() < 45) {
		console.log("%o fertility increased", person);
		person.components.Fertility.increaseBy(1);
	}
	
	if (person.components.Age.getAgeInYears() >= 45) {
		console.log("%o fertility decreased", person);
		person.components.Fertility.decreaseBy(1);
	}
}

function hasComponent(person) {
	try {
		if (!person.hasComponent('Fertility')) {
			throw new Error("Person doesnt have Fertility component");
		}
	} catch(e) {
		debugger;
	}
}
