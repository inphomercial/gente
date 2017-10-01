
import {STAGES} from '../data/affliction';

export default class Affliction {
	constructor() {
		this._name = null;
		this._isContagious = false;
		this._stage = STAGES.ONSET;

		// see data/affliction
		this._transferMethods = [];
	}

	onset() {
		console.log("This needs to be overridden");
	}

	act() {
		console.log("This needs to be overridden");
	}

	recovery() {
		console.log("This needs to be overridden");
	}

	complete() {
		console.log("Affliction complete");
	}

	// onset, act, recovery
	setStage(stage) {
		this._stage = stage;
	}

	// onset, act, recovery
	isOnStage(stage) {
		return this._stage === stage;
	}
}