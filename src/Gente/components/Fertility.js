
export default function Fertility(template) {
	this._fertility = template.fertility;

}
Fertility.prototype.name = "Fertility";

Fertility.prototype.decreaseBy = function(amount) {
	this._fertility = this._fertility - amount;
}

Fertility.prototype.increaseBy = function(amount) {
	this._fertility = this._fertility + amount;
}

Fertility.prototype.get = function() {
	return this._fertility;
}
