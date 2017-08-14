
import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/containers/App';

import {Logger} from './Gente/logger';

window.logger = new Logger();

ReactDOM.render(<App />, document.getElementById('root'));

// To do still
// var findPersonButton = document.getElementById("findPerson");
// var getLogsButton = document.getElementById("getLogs");

// var personIdInput = document.getElementById("personIdInput");
// var logYearInput = document.getElementById("logYearInput");

// var peopleList = document.getElementById("people-list");
// findPersonButton.addEventListener("click", function() {

// 	let personId = parseInt(personIdInput.value);
// 	let familyTree = world.findPersonAndImmediateFamily(personId);

// 	if (peopleList.firstChild) {
// 		peopleList.replaceChild(renderjson(familyTree), peopleList.firstChild);
// 	} else {
// 		peopleList.appendChild(renderjson(familyTree));
// 	}
// });

// getLogsButton.addEventListener("click", function() {
// 	let logYear = parseInt(logYearInput.value);
// 	log.innerHTML = `<pre>${JSON.stringify(window.logger.getLog()[logYear], undefined, 4)}</pre>`;
// });
