
import Sex from './components/Sex';
import Age from './components/Age';
import Health from './components/Health';
import Marriage from './components/Marriage';
import Name from './components/Name';
import ChildrenComponent from './components/Children';
import Eye from './components/Eye';

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

		// Possible die roll for each person based on a range (ex: d4, d6, d20 -- combined fertility rates need to exceed global setting?)
		this.fertility = options.fertility;

		// Parents
		this.parents = {}; 

		// Children
		this.addComponent(new ChildrenComponent(options));

		this.log = {};
	}
}
