
import Affliction from './Affliction';

import {TRANSFER_METHODS} from '../data/affliction';

export default class CommonCold extends Affliction {
	constructor() {
		super();

		this._name = "Common Cold";
		this._isContagious = true;
		this._transferMethods = [TRANSFER_METHODS.AIR, TRANSFER_METHODS.SILIVA];
	}

	onset() {
		console.log("A Cold has started");
	}

	act() {
		console.log("A Cold is spreading");
	}

	recovery() {
		console.log("A Cold has ended");
	}
}