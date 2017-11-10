
export default class Repository {
	constructor(name, baseClass) {
		// Name of the Repository
		this._name = name;

		// Base Class to extend all defined templates with
		this._baseClass = baseClass;

		// Stored templates that we use to create from
		this._templates = {};
	};

	/**
	 * Adds a template to the repository used during init
	 *
	 * @param {string} name 
	 * @param {object} template 
	 */
	define(template) {
		this._templates[template.key] = template;
	}

	/**
	 * Creates an object instance of the provided repository object by name
	 *
	 * @param {string} name 
	 *
	 * @return {object} template instance
	 */
	create(name) {
		if (!this._templates[name]) {
			throw new Error(`No template found with the name ${name}`);
		}

		// Return created object that uses baseTemplate while extending with actual named template
		return new this._baseClass(this._templates[name]);
	}

	/**
	 * Generates a random object for the repository
	 *
	 * @return {object} template instance
	 */
	random() {
		let templates = Object.keys(this._templates);
		let randomTemplate = Math.floor(Math.random() * templates.length);
		let templateName = templates[randomTemplate];

		return new this._baseClass(this._templates[templateName]);
	}
}