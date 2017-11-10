
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
		console.log("common cold onset !");
	},
	actFunction: function() {
		console.log("im the common cold acting up!!");
	},
	recoveryFunction: function() {
		console.log("im the common cold recovering");
	},
	completeFunction: function() {
		console.log("im the common cold complete");
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
		console.log("flu onset !");
	},
	actFunction: function() {
		console.log("im the FLUUU acting up!!");
	},
	recoveryFunction: function() {
		console.log("im the flu recovering");
	},
	completeFunction: function() {
		console.log("im the flu complete");
	}
}

export default AFFLICTION_TEMPLATES;


