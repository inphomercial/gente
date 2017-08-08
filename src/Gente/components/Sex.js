
export default function SexComponent(options) {
	this._sex = options.sex; 
}
SexComponent.prototype.name = "Sex";

SexComponent.prototype.setSex = function(sex) {
	this._sex = sex;
}

SexComponent.prototype.getSex = function() { 
	return this._sex;
}

SexComponent.prototype.isMale = function() {
	return this._sex === "Male";
}

SexComponent.prototype.isFemale = function() {
	return this._sex === "Female";
}
