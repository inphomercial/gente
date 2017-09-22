
import {FIRST_NAME_MALE, FIRST_NAME_FEMALE, LAST_NAME} from '../data/names';

export default function NameComponent(options) {
	this._firstName = options.firstName;
	this._lastName = options.lastName;
}
NameComponent.prototype.name = "Name";

NameComponent.prototype.setFirstName = function(name) {
	this._firstName = name;
}

NameComponent.prototype.setLastName = function(name) {
	this._lastName = name;
}

NameComponent.prototype.getFirstName = function() {
	return this._firstName;
}

NameComponent.prototype.getLastName = function() {
	return this._lastName;
}

NameComponent.prototype.getFullName = function () {
	return `${this._firstName} ${this._lastName}`;
}
