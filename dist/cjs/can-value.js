/*can-value@0.0.0#can-value*/
var canKey = require('can-key');
var canReflect = require('can-reflect');
var keyObservable = require('can-simple-observable/key/key');
var Observation = require('can-observation');
module.exports = {
    bind: function (object, keyPath) {
        return keyObservable(object, keyPath);
    },
    from: function (object, keyPath) {
        var observationFunction = function () {
            return canKey.get(object, keyPath);
        };
        return new Observation(observationFunction);
    },
    to: function (object, keyPath) {
        var observable = keyObservable(object, keyPath);
        return canReflect.assignSymbols(observable, { 'can.getValue': null });
    }
};