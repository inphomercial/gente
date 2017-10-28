
import Affliction from '../components/Affliction';
import {Repository} from '../Repository'
import templates from '../templates/affliction-templates';

let affictionRepository = {
	init: function() {
		let AfflicationRepository = new Repository("Afflications Repository", Affliction);

		AfflicationRepository.define("common-cold", templates.COMMON_COLD); 
		AfflicationRepository.define("flu", templates.FLU);

		return AfflicationRepository;
	}
}

export default affictionRepository;
