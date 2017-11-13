
import moment from 'moment';
import {d100} from '../functions';
import _ from 'lodash';

export default function AgeGenerator(personTemplate, world) {

	personTemplate.age = _.isNull(personTemplate.age) ? d100() : personTemplate.age;

	personTemplate.dateOfBirth = parseInt(moment(`${world.currentYear}0101`).subtract(personTemplate.age, 'years').format('YYYY'), 0);
	personTemplate.dateOfDeath = null;

	return personTemplate;
}
