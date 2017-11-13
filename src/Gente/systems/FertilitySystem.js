
export default function FertilitySystem(world, person) {
	hasComponent(person);

	if (person.get('Age').getAgeInYears() > 11 && person.get('Age').getAgeInYears() < 45) {
		console.log("%o fertility increased", person);
		person.get('Fertility').increaseBy(1);
	}
	
	if (person.get('Age').getAgeInYears() >= 45) {
		console.log("%o fertility decreased", person);
		person.get('Fertility').decreaseBy(1);
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
