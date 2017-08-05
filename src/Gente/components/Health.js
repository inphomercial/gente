
export default function Health(options) {

	this._isAlive = options.isAlive;
	this._isSick = options.isSick;
	this._isPregnant = options.isPregnant;
	this._isFullTerm = options.isFullTerm;
}
Health.prototype.name = "Health";

Health.prototype.getIsAlive = function() {
	return this._isAlive;
}

Health.prototype.setIsAlive = function(isAlive) {
	this._isAlive = isAlive;
}

Health.prototype.getIsSick = function() {
	return this._isSick;
}

Health.prototype.setIsSick = function(isSick) {
	this._isSick = isSick;
}

Health.prototype.getIsPregnant = function() {
	return this._isPregnant;
}

Health.prototype.setIsPregnant = function(isPregnant) {
	this._isPregnant = isPregnant;
}

Health.prototype.getIsFullTerm = function() {
	return this._isFullTerm;
}

Health.prototype.setIsFullTerm = function(isFullTerm) {
	this._isFullTerm = isFullTerm;
}
