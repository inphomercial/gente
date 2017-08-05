
import World from './Gente/World';
import {worldTemplate} from './Gente/data/worldTemplate';
import {Logger} from './Gente/logger';

import moment from 'moment';

import {d100} from './Gente/functions';
window.d100 = d100;

window.moment = moment;
window.logger = new Logger();

let world = new World(worldTemplate);
world.generateInitialPopulation();

console.log("Initial World", world);
window.world = world;

var el = document.getElementById("incrementYear");
var el10 = document.getElementById("incrementTenYears");
var root = document.getElementById("root");
var log = document.getElementById("log");

el.addEventListener("click", function() {
    world.takeTurn();

    root.innerHTML = `<pre><code>${JSON.stringify(world, undefined, 4)}</code></pre>`;
	log.innerHTML = `<pre>${JSON.stringify(window.logger.getLog(), undefined, 4)}</pre>`;
});

el10.addEventListener("click", function() {
	for (var i = 0; i < 10; i++) {
		world.takeTurn();
	}

	// let log = window.logger.getLog();
	// Object.keys(log).forEach(function(key) {

	// 	console.log("key", key);
	// 	log[key].forEach(function(eachLog) {
	// 		console.log("each log", eachLog);
	// 	});

	// 	console.log("logkey", log[key]);
	// });

    root.innerHTML = `<pre><code>${JSON.stringify(world, undefined, 4)}</code></pre>`;
	log.innerHTML = `<pre>${JSON.stringify(window.logger.getLog(), undefined, 4)}</pre>`;
});

// function buildDay(day) {
// 	console.log("day", day);
// }
