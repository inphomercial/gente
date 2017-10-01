import {d100} from '../functions';

import {STAGES} from '../data/affliction';

import CommonCold from '../afflictions/CommonCold';

export default function AfflictionSystem(world, person) {
	hasComponent(person);

	// Temp for testing
	if (d100() < 10) {
		person.components.Health.addAffliction(new CommonCold());
	}

	if (!person.components.Health.getAfflictions().length) return;

	person.components.Health.getAfflictions().map(function (affliction) {

		if (affliction.isOnStage(STAGES.RECOVERY)) {
			affliction.recovery();
			affliction.setStage(STAGES.COMPLETE);
		}
		
		if (affliction.isOnStage(STAGES.ACT)) {
			affliction.act();
		}

		if (affliction.isOnStage(STAGES.ONSET)) {
			affliction.onset();
			affliction.setStage(STAGES.ACT);
		}

	});
}

function hasComponent(person) {
	try {
		if (!person.hasComponent('Health')) {
			throw "Person doesnt have Health component";
		}
	} catch(e) {
		debugger;
	}
}
