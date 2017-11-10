
export default function MarriageComponent(options) {
	this._isMarried = options.isMarried;
	this._spouseId = options.spouseId;
}

MarriageComponent.prototype.name = "Marriage";

MarriageComponent.prototype.getIsMarried = function() {
	return this._isMarried;
}

MarriageComponent.prototype.isNotMarried = function() {
	return this._isMarried === false;
}

MarriageComponent.prototype.getSpouseId = function() {
	return this._spouseId;
}

MarriageComponent.prototype.setIsMarried = function(isMarried) {
	this._isMarried = isMarried;
}

MarriageComponent.prototype.setSpouseId = function(id) {
	this._spouseId = id;
}

MarriageComponent.prototype.marryTo = function(spouse) {
	this.setIsMarried(true);
	this.setSpouseId(spouse.id);
}
