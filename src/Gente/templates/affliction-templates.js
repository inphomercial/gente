
const TRANSFER_METHODS = {
	SALIVA: "saliva",
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
	key: "common-cold",
	name: "Common Cold",
	isContagious: true,
	transferMethods: [
		TRANSFER_METHODS.SALIVA,
		TRANSFER_METHODS.TOUCH
	]
};

AFFLICTION_TEMPLATES.FLU = {
	key: "flu",
	name: "Flu",
	isContagious: true,
	transferMethods: [
		TRANSFER_METHODS.SALIVA,
		TRANSFER_METHODS.TOUCH
	]
}

export default AFFLICTION_TEMPLATES;


