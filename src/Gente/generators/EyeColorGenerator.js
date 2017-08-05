
import {dRoll} from '../functions';

const COLORS = [
	"black",
	"blue",
	"green",
	"brown",
	"gray"
];

export default function EyeColorGenerator(personTemplate) {

	personTemplate.eyeColor = this.generateEyeColor();

	return personTemplate;
}

EyeColorGenerator.prototype.generateEyeColor = function() {
    let num = dRoll(COLORS.length);

	return COLORS[num];
}
