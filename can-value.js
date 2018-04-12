var canKey = require("can-key");
var canKeyUtils = require("can-key/utils");
var canReflect = require("can-reflect");
var canReflectDependencies = require("can-reflect-dependencies");
var keyObservable = require("can-simple-observable/key/key");
var Observation = require("can-observation");

module.exports = {
	bind: function(object, keyPath) {
		return keyObservable(object, keyPath);
	},

	from: function(object, keyPath) {
		var observation = new Observation(function() {
			return canKey.get(object, keyPath);
		});

		canReflect.assignSymbols(observation, {
			"can.getName": function getName() {
				var objectName = canReflect.getName(object);
				return "CanValueFromObservation<" + objectName + "." + keyPath + ">";
			}
		});

		return observation;
	},

	to: function(object, keyPath) {
		var keyPathParts = canKeyUtils.parts(keyPath);
		var lastIndex = keyPathParts.length - 1;
		var lastKey;// This stores the last part of the keyPath, e.g. “key” in “outer.inner.key”
		var lastParent;// This stores the object that the last key is on, e.g. “outer.inner” in outer: {inner: {"key": "value"}}
		var observable = {};

		// Walk the object path to set up the dependency/mutation data
		var previousKeyData;
		canKey.walk(object, keyPathParts, function(keyData, i) {
			if (i === lastIndex) {
				// observable is mutating keyData.parent
				lastKey = keyData.key;
				lastParent = keyData.parent;
				canReflectDependencies.addMutatedBy(lastParent, lastKey, observable);

				canReflect.onKeyValue(previousKeyData.parent, previousKeyData.key, function(newValue, oldValue) {
					canReflectDependencies.deleteMutatedBy(oldValue, lastKey, observable);
					canReflectDependencies.addMutatedBy(newValue, lastKey, observable);
					lastParent = newValue;
				});
			}
			previousKeyData = keyData;
		});
		previousKeyData = undefined;// No longer needed

		return canReflect.assignSymbols(observable, {
			"can.getName": function getName() {
				var objectName = canReflect.getName(object);
				return "CanValueToObservable<" + objectName + "." + keyPath + ">";
			},

			"can.getValue": function getValue() {
				// This is intentionally left blank
			},

			// Register what observable changes
			"can.getWhatIChange": function getWhatIChange() {
				return {
					mutate: {
						keyDependencies: new Map([
							[lastParent, new Set([lastKey])]
						])
					}
				};
			},

			"can.setValue": function setValue(newValue) {
				canKey.set(object, keyPath, newValue);
			}
		});
	}
};
