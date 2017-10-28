
export default function Affliction(template) {
	this._name = template.name;
	this._isContagious = template.isContagious;

	this._transferMethods = template.transferMethods;
}
Affliction.prototype.name = 'Affliction';