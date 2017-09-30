
import {dRoll} from '../functions';
import {EYE_COLORS} from '../data/eyes';

export default function EyeColorGenerator(personTemplate) {

	personTemplate.eyeColor = generateEyeColor();

	return personTemplate;
}

function generateEyeColor() {
    let num = dRoll(0, EYE_COLORS.length);

	return EYE_COLORS[num];
}
