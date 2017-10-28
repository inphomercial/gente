
const TRANSFER_METHODS = {
	SILIVA: "siliva",
	BLOOD: "blood",
	AIR: "air",
	TOUCH: "touch",
	MENTAL: "mental"
};

const STAGES = {
	ONSET: "onset",
	ACT: "act",
	RECOVERY: "recovery",
	COMPLETE: "complete"
};

const AFFLICTION_TEMPLATES = {};

AFFLICTION_TEMPLATES.COMMON_COLD = {
	name: "Common Cold",
	isContagious: true,
	transferMethods: [
		TRANSFER_METHODS.SILIVA,
		TRANSFER_METHODS.TOUCH
	]
};

AFFLICTION_TEMPLATES.FLU = {
	name: "Flu",
	isContagious: true,
	transferMethods: [
		TRANSFER_METHODS.SILIVA,
		TRANSFER_METHODS.TOUCH
	]
}

export default AFFLICTION_TEMPLATES;


