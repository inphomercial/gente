
import World from './Gente/World';
import {worldTemplate} from './Gente/data/worldTemplate';
import {Logger} from './Gente/logger';
const renderjson = require('renderjson');
renderjson.set_show_to_level(1);

window.logger = new Logger();

let world = new World(worldTemplate);
world.generateInitialPopulation();

console.log("Initial World", world);
window.world = world;

var el = document.getElementById("incrementYear");
var el10 = document.getElementById("incrementTenYears");
var findPersonButton = document.getElementById("findPerson");

var personIdInput = document.getElementById("personIdInput");

var root = document.getElementById("root");
var log = document.getElementById("log");
var peopleList = document.getElementById("people-list");

el.addEventListener("click", function() {
	world.takeTurn();

	root.innerHTML = `<pre><code>${JSON.stringify(world.stats, undefined, 4)}</code></pre>`;
	log.innerHTML = `<pre>${JSON.stringify(window.logger.getLog()[world.currentYear], undefined, 4)}</pre>`;
});

el10.addEventListener("click", function() {
	for (var i = 0; i < 10; i++) {
		world.takeTurn();
	}

    root.innerHTML = `<pre><code>${JSON.stringify(world.stats, undefined, 4)}</code></pre>`;
	log.innerHTML = `<pre>${JSON.stringify(window.logger.getLog()[world.currentYear], undefined, 4)}</pre>`;
});

findPersonButton.addEventListener("click", function() {
	let personId = parseInt(personIdInput.value);
	let familyTree = world.findPersonAndImmediateFamily(personId);

	if (peopleList.firstChild) {
		peopleList.replaceChild(renderjson(familyTree), peopleList.firstChild);
	} else {
		peopleList.appendChild(renderjson(familyTree));
	}
});
