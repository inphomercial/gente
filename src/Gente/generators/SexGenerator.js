
import {dRoll} from '../functions';

export default function SexGenerator(personTemplate) {

	personTemplate.sex = this.generateSex();

	return personTemplate;
}

SexGenerator.prototype.generateSex = function() {
	let sexes = [
		'Male',
		'Female'
	];

	let num = dRoll(0, sexes.length);

	return sexes[num];
}
