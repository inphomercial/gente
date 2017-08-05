import _ from 'lodash';

export function setDefaults(options, defaults) {
	return _.defaults({}, _.clone(options), defaults);
}

export function d100() {
	return Math.floor(Math.random() * 100) + 1;
}

export function dRoll(start, sides) {
  return Math.floor(Math.random() * (sides - start + start)) + start;
}

// 0 = zero chance
// 100 = 100 chance

// roll random from 1 - 100.
// prob will be all of the values to check against

// ex: prob 70
// roll 1 - 100, if num is <= prob, success

// export function doesCheckPass(total, probablity) {
// 	let roll = d100();
// 	return roll <= probablity;
// }
