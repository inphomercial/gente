
import Sex from './components/Sex';
import Age from './components/Age';
import Health from './components/Health';
import Marriage from './components/Marriage';
import Name from './components/Name';
import ChildrenComponent from './components/Children';
import Eye from './components/Eye';
import Fertility from './components/Fertility';

import Entity from './Entity';

export class Person extends Entity {

	constructor(options) {
		super();

		// Build and add components
		this.addComponent(new Age(options));
		this.addComponent(new Sex(options));
		this.addComponent(new Name(options));
		this.addComponent(new Health(options));
		this.addComponent(new Marriage(options));
		this.addComponent(new Eye(options));
		this.addComponent(new Fertility(options));
		this.addComponent(new ChildrenComponent(options));

		// To be converted to components
		this.parents = {}; 
		this.afflictions = options.afflictions;

		this.log = {};
	}
}
