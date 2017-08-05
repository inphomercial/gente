import moment from 'moment';

import Entity from './Entity';

export class Building extends Entity {
	constructor() {
		super();

		// year built
		// year closed
		// owners
		// employees
		// name
		// type

		this._yearBuilt = this.generateYearBuilt();
	}

	generateYearBuilt() {
		let num = Math.floor(Math.random() * 200);

		return moment().subtract(num, 'days').calendar();
	}
}
