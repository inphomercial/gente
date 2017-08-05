
import {personDefault} from '../defaults/person';

import {Person} from '../Person';

import SexGenerator from './SexGenerator';
import AgeGenerator from './AgeGenerator';
import NameGenerator from './NameGenerator';
import HealthGenerator from './HealthGenerator';
import MarriageGenerator from './MarriageGenerator';
import EyeColorGenerator from './EyeColorGenerator';

export default function PersonGenerator(defaults = {}) {

	let template = {};

	template = Object.assign({}, personDefault, new SexGenerator(template), defaults);
	template = Object.assign({}, new AgeGenerator(template), defaults);
	template = Object.assign({}, new NameGenerator(template), defaults);
	template = Object.assign({}, new HealthGenerator(template), defaults);
	template = Object.assign({}, new MarriageGenerator(template), defaults);
	template = Object.assign({}, new EyeColorGenerator(template), defaults);

	return new Person(template);
}
