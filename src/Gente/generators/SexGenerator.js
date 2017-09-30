
import {dRoll} from '../functions';
import {SEXES} from '../data/sexes';

export default function SexGenerator(personTemplate) {

	personTemplate.sex = generateSex();

	return personTemplate;
}

function generateSex() {
	let num = dRoll(0, SEXES.length);

	return SEXES[num];
}
