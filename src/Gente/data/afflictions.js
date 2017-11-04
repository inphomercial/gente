
import Affliction from '../components/Affliction';
import {Repository} from '../Repository'
import templates from '../templates/affliction-templates';

let affictionRepository = {
	init: function() {
		let AfflicationRepository = new Repository("Afflications Repository", Affliction);

		AfflicationRepository.define(templates.COMMON_COLD); 
		AfflicationRepository.define(templates.FLU);

		return AfflicationRepository;
	}
}

export default affictionRepository;
