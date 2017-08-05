
export default function Eye(options) {
	this._eyeColor = options.eyeColor; 
}
Eye.prototype.name = "Eye";

Eye.prototype.setEyeColor = function(eyeColor) {
	this._eyeColor = eyeColor;
}

Eye.prototype.getEyeColor = function() { 
	return this._eyeColor;
}
