
import moment from 'moment';
import {d100} from '../functions';
import _ from 'lodash';

import {worldTemplate} from '../data/worldTemplate';

export default function AgeGenerator(personTemplate, world) {

	personTemplate.age = _.isNull(personTemplate.age) ? d100() : personTemplate.age;

	// let year = moment().subtract(worldTemplate.startingYear, 'years');
	// personTemplate.dateOfBirth = year.subtract(personTemplate.age, 'years').format('YYYY');
	personTemplate.dateOfBirth = parseInt(moment(`${world.currentYear}0101`).subtract(personTemplate.age, 'years').format('YYYY'));
	personTemplate.dateOfDeath = null;

	return personTemplate;
}
