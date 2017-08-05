export default function ChildrenComponent(options) {
	this._children = [];
	// this._children = options.children;
}
ChildrenComponent.prototype.name = "Children";

ChildrenComponent.prototype.addChild = function addChild(child) {
	this._children.push(child);
}
