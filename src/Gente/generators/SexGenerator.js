
export default function SexGenerator(personTemplate) {

	personTemplate.sex = this.generateSex();

	return personTemplate;
}

SexGenerator.prototype.generateSex = function() {
	let sexes = [
		'Male',
		'Female'
	];

	let num = Math.floor(Math.random() * sexes.length);

	return sexes[num];
}
