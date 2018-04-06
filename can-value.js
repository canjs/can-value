var CanKey = require("can-key");
var KeyObservable = require("can-simple-observable/key/key");
var Observation = require("can-observation");
var SetterObservable = require("can-simple-observable/setter/setter");

module.exports = {
	bind: function(object, keyPath) {
		return new KeyObservable(object, keyPath);
	},

	from: function(object, keyPath) {
		return new Observation(function() {
			return CanKey.get(object, keyPath);
		});
	},

	to: function(object, keyPath) {
		return new SetterObservable(function() {
			// This line intentionally left blank :)
		}, function(newValue) {
			CanKey.set(object, keyPath, newValue);
		});
	}
};
