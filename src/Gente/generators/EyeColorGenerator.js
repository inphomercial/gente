
import {dRoll} from '../functions';

const COLORS = [
	"black",
	"blue",
	"green",
	"brown",
	"gray"
];

export default function EyeColorGenerator(personTemplate) {

	personTemplate.eyeColor = generateEyeColor();

	return personTemplate;
}

function generateEyeColor() {
    let num = dRoll(0, COLORS.length);

	return COLORS[num];
}
