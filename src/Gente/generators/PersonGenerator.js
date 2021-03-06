
import {personDefault} from '../data/person';

import {Person} from '../Person';

import SexGenerator from './SexGenerator';
import AgeGenerator from './AgeGenerator';
import NameGenerator from './NameGenerator';
import HealthGenerator from './HealthGenerator';
import MarriageGenerator from './MarriageGenerator';
import EyeColorGenerator from './EyeColorGenerator';
import FertilityGenerator from './FertilityGenerator';

export default function PersonGenerator(defaults = {}, world) {

	let template = {};
	template = Object.assign({}, personDefault(), defaults);
	template = Object.assign({}, SexGenerator(template), defaults);
	template = Object.assign({}, AgeGenerator(template, world), defaults);
	template = Object.assign({}, NameGenerator(template), defaults);
	template = Object.assign({}, HealthGenerator(template), defaults);
	template = Object.assign({}, MarriageGenerator(template), defaults);
	template = Object.assign({}, EyeColorGenerator(template), defaults);
	template = Object.assign({}, FertilityGenerator(template), defaults);

	return new Person(template);
}
