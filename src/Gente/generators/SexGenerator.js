
import {dRoll} from '../functions';

export default function SexGenerator(personTemplate) {

	personTemplate.sex = generateSex();

	return personTemplate;
}

function generateSex() {
	let sexes = [
		'Male',
		'Female'
	];

	let num = dRoll(0, sexes.length);

	return sexes[num];
}
