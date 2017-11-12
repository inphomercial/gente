
export const TRANSFER_METHODS = {
	SALIVA: "saliva",
	BLOOD: "blood",
	AIR: "air",
	TOUCH: "touch",
	MENTAL: "mental"
};

export const STAGES = {
	ONSET: "onset",
	ACT: "act",
	RECOVERY: "recovery",
	COMPLETE: "complete"
};

const AFFLICTION_TEMPLATES = {};

AFFLICTION_TEMPLATES.COMMON_COLD = {
	key: "common-cold",
	name: "Common Cold",
	isContagious: true,
	transferMethods: [
		TRANSFER_METHODS.SALIVA,
		TRANSFER_METHODS.TOUCH
	],
	onsetFunction: function() {
		console.log("%s has onset", this._name);
	},
	actFunction: function() {
		console.log("%s is acting up", this._name);
	},
	recoveryFunction: function() {
		console.log("%s is recovering", this._name);
	},
	completeFunction: function() {
		console.log("%s is complete", this._name);
	}
};

AFFLICTION_TEMPLATES.FLU = {
	key: "flu",
	name: "Flu",
	isContagious: true,
	transferMethods: [
		TRANSFER_METHODS.SALIVA,
		TRANSFER_METHODS.TOUCH
	],
	onsetFunction: function() {
		console.log("%s has onset", this._name);
	},
	actFunction: function() {
		console.log("%s is acting up", this._name);
	},
	recoveryFunction: function() {
		console.log("%s is recovering", this._name);
	},
	completeFunction: function() {
		console.log("%s is complete", this._name);
	}
}

export default AFFLICTION_TEMPLATES;


