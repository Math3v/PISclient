Array.prototype.first = function() {
	return this[0];
}

Array.prototype.last = function() {
	return this[this.length - 1];
}

Array.prototype.myMap = function(callback) {
	for( var i = 0; i < this.length; i++ ) {
		this[i] = callback(this[i]);
	}
}