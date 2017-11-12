
import {dRoll} from '../functions';

export default function FertilityGenerator(personTemplate) {

	personTemplate.fertility = generateFertility();

	return personTemplate;
}

function generateFertility() {
	return dRoll(20, 80);
}
