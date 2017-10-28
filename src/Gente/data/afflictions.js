
import Affliction from '../components/Affliction';
import {Repository} from '../Repository'

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

let affictionRepository = {
	init: function() {
		let AfflicationRepository = new Repository("Afflications Repository", Affliction);

		AfflicationRepository.define("common-cold", 
			{
				name: "Common Cold",
				isContagious: true,
				transferMethods: [
					TRANSFER_METHODS.SILIVA,
					TRANSFER_METHODS.TOUCH
				]
			}
		);
		
		AfflicationRepository.define("flu", 
			{
				name: "Flu",
				isContagious: true,
				transferMethods: [
					TRANSFER_METHODS.SILIVA,
					TRANSFER_METHODS.TOUCH
				]
			}
		);

		return AfflicationRepository;
	}
}

export default affictionRepository;
