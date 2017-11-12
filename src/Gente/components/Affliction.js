import {STAGES} from '../templates/affliction-templates';

export default function Affliction(template) {
	this._name = template.name;

	this._stage = STAGES.ONSET;
	this._isContagious = template.isContagious;
	this._transferMethods = template.transferMethods;

	this._onsetFunction = template.onsetFunction;
	this._actFunction = template.actFunction;
	this._recoveryFunction = template._recoveryFunction;
	this._completeFunction = template._completeFunction;
}
Affliction.prototype.name = 'Affliction';

Affliction.prototype.getStage = function() {
	return this._stage;
}

Affliction.prototype.setStage = function(stage) {
	return this._stage = stage;
}

Affliction.prototype.act = function() {
	console.log("%s is acting", this._name);

	if (this.getStage() === STAGES.ONSET) {
		this._onsetFunction();
	}
	
	if (this.getStage() === STAGES.ACT) {
		this._actFunction();
	}
	
	if (this.getStage() === STAGES.RECOVERY) {
		this._recoveryFunction();
	}
	
	if (this.getStage() === STAGES.COMPLETE) {
		this._completeFunction();
	}
}