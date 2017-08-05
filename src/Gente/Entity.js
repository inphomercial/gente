
export default function Entity() {

	this.id = this.idGenerator();

	this.components = {};

	return this;
}

Entity.prototype.idGenerator = function() {
	return Math.floor(Math.random() * 100000000);
}

Entity.prototype.hasComponent = function(name) {
	return (typeof this.components[name] === 'object');
}

Entity.prototype.addComponent = function addComponent(component) {
	// Add component data to the entity
	this.components[component.name] = component;
	return this;
};

Entity.prototype.removeComponent = function removeComponent(componentName) {
	// Remove component data by removing the reference to it.
	// Allows either a component function or a string of a component name to be
	// passed in
	var name = componentName; // assume a string was passed in

	if (typeof componentName === 'function') { 
		// get the name from the prototype of the passed component function
		name = componentName.prototype.name;
	}

	delete this.components[name];
	return this;
};

