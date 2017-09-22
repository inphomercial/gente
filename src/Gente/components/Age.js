
export default function Age(options) {
	this._age = options.age;
	this._dateOfBirth = options.dateOfBirth;
	this._dateOfDeath = options.dateOfDeath;
}
Age.prototype.name = 'Age';

Age.prototype.getAgeInYears = function() {
	return this._age;
}

Age.prototype.getAgeInDays = function() {
	return this._age * 365;
}

Age.prototype.getDateOfBirth = function() {
	return this._dateOfBirth;
}

Age.prototype.setDateOfDeath = function(year) {
	this._dateOfDeath = year;
}

Age.prototype.getDateOfDeath = function() {
	return this._dateOfDeath === null ? "" : this._dateOfDeath;
}
