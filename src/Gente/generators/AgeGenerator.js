
import moment from 'moment';
import {d100} from '../functions';

import {worldTemplate} from '../data/worldTemplate';

export default function AgeGenerator(personTemplate) {

	personTemplate.age = d100();

	// let year = moment().subtract(worldTemplate.startingYear, 'years');
	// personTemplate.dateOfBirth = year.subtract(personTemplate.age, 'years').format('YYYY');
	personTemplate.dateOfBirth = parseInt(moment().subtract(personTemplate.age, 'years').format('YYYY'));
	personTemplate.dateOfDeath = null;

	return personTemplate;
}
