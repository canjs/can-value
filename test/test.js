var QUnit = require("steal-qunit");
var canValue = require("../can-value");
var canReflect = require("can-reflect");
var canReflectDeps = require("can-reflect-dependencies");
var SimpleMap = require("can-simple-map");

QUnit.module('can-value');

QUnit.test("bind method works", function() {
	var outer = new SimpleMap({inner: new SimpleMap({key: "hello"})});
	var observable = canValue.bind(outer, "inner.key");

	// Test getting the value
	QUnit.equal(canReflect.getValue(observable), "hello", "getting works");

	// Test setting the value
	canReflect.setValue(observable, "aloha");
	QUnit.equal(outer.get("inner").get('key'), "aloha", "setting works");
});

QUnit.test("from method works", function() {
	var outer = {inner: {key: "hello"}};
	var observation = canValue.from(outer, "inner.key");

	// Test getting the value
	QUnit.equal(canReflect.getValue(observation), "hello", "getting works");

	// Setting the value shouldn’t work
	var errorThrown;
	try {
		canReflect.setValue(observation, "aloha");
	} catch (error) {
		errorThrown = error;
	}
	QUnit.ok(errorThrown instanceof Error, "setting doesn’t work");
});

QUnit.test("from method returns an observation with a helpful name", function() {
	var outer = {inner: {key: "hello"}};
	var observation = canValue.from(outer, "inner.key");
	QUnit.equal(
		canReflect.getName(observation),
		"CanValueFromObservation<Object{}.inner.key>",
		"observation has the correct name"
	);
});

QUnit.test("from method observable has dependency data", function(assert) {
	var outer = new SimpleMap({inner: new SimpleMap({key: "hello"})});
	var observation = canValue.from(outer, "inner.key");

	// The observation returned by from() must be bound before it returns dependency data
	canReflect.onValue(observation, function() {});

	// Check the observation’s dependency data
	var observationDepData = canReflectDeps.getDependencyDataOf(observation);
	assert.deepEqual(
		observationDepData,
		{
			whatChangesMe: {
				derive: {
					keyDependencies: new Map([
						// the observation is changed by outer’s 'inner' property
						[outer, new Set(["inner"])],
						// the observation is changed by outer.inner’s 'key' property
						[outer.get("inner"), new Set(["key"])]
					])
				}
			}
		},
		"the observation has the correct mutation dependencies"
	);

	// Check outer.inner’s dependency data
	var innerDepData = canReflectDeps.getDependencyDataOf(outer, "inner");
	assert.deepEqual(
		innerDepData,
		{
			whatIChange: {
				derive: {
					// outer.inner changes the observation
					valueDependencies: new Set([observation])
				}
			}
		},
		"outer.inner has the correct mutation dependencies"
	);

	// Check outer.inner.key’s dependency data
	var keyDepData = canReflectDeps.getDependencyDataOf(outer.get("inner"), "key");
	assert.deepEqual(
		keyDepData,
		{
			whatIChange: {
				derive: {
					// outer.inner.key changes the observation
					valueDependencies: new Set([observation])
				}
			}
		},
		"outer.inner.key has the correct mutation dependencies"
	);
});

QUnit.test("to method works", function() {
	var outer = {inner: {key: "hello"}};
	var setProp = canValue.to(outer, "inner.key");

	// Getting the value shouldn’t work
	QUnit.equal(canReflect.getValue(setProp), undefined, "getting doesn’t work");

	// Test setting the value
	canReflect.setValue(setProp, "aloha");
	QUnit.equal(outer.inner.key, "aloha", "setting works");
});

QUnit.test("to method returns an observable with a helpful name", function() {
	var outer = {inner: {key: "hello"}};
	var observable = canValue.to(outer, "inner.key");
	QUnit.equal(
		canReflect.getName(observable),
		"CanValueToObservable<Object{}.inner.key>",
		"observable has the correct name"
	);
});

QUnit.test("to method observable has dependency data", function(assert) {
	var outer = new SimpleMap({inner: new SimpleMap({key: "hello"})});
	var observable = canValue.to(outer, "inner.key");

	// Check outer.inner’s dependency data
	var innerDepData = canReflectDeps.getDependencyDataOf(outer, "inner");
	assert.notOk(
		innerDepData,
		"outer.inner has no mutation dependencies"
	);

	// Check outer.inner.key’s dependency data
	var keyDepData = canReflectDeps.getDependencyDataOf(outer.get("inner"), "key");
	assert.deepEqual(
		keyDepData,
		{
			whatChangesMe: {
				mutate: {
					keyDependencies: new Map(),
					// outer.inner.key is changed by observable
					valueDependencies: new Set([observable])
				}
			}
		},
		"outer.inner.key has the correct mutation dependencies"
	);

	// Check observable’s dependency data
	var observableDepData = canReflectDeps.getDependencyDataOf(observable);
	assert.deepEqual(
		observableDepData,
		{
			whatIChange: {
				mutate: {
					keyDependencies: new Map([
						// observable changes outer.inner’s 'key' property
						[outer.get("inner"), new Set(["key"])]
					])
				}
			}
		},
		"observable has the correct mutation dependencies"
	);
});

QUnit.test("to method observable works when the keys change", function(assert) {
	var originalInner = new SimpleMap({key: "hello"});
	var outer = new SimpleMap({inner: originalInner});
	var observable = canValue.to(outer, "inner.key");

	// Change the value of a key along the path
	var newInner = new SimpleMap({key: "aloha"});
	outer.set("inner", newInner);

	// Test setting the value
	canReflect.setValue(observable, "ciao");
	QUnit.equal(newInner.get("key"), "ciao", "setting works after changing the inner object");
	QUnit.equal(originalInner.get("key"), "hello", "the original inner object is untouched");

	// Check outer.inner’s dependency data
	var innerDepData = canReflectDeps.getDependencyDataOf(outer, "inner");
	assert.notOk(
		innerDepData,
		"outer.inner has no mutation dependencies"
	);

	// Check the original outer.inner.key’s dependency data
	var originalKeyDepData = canReflectDeps.getDependencyDataOf(originalInner, "key");
	assert.notOk(
		originalKeyDepData,
		"original outer.inner.key no longer has any dependencies"
	);

	// Check the new outer.inner.key’s dependency data
	var newKeyDepData = canReflectDeps.getDependencyDataOf(newInner, "key");
	assert.deepEqual(
		newKeyDepData,
		{
			whatChangesMe: {
				mutate: {
					keyDependencies: new Map(),
					// outer.inner.key is changed by observable
					valueDependencies: new Set([observable])
				}
			}
		},
		"outer.inner.key has the correct mutation dependencies"
	);

	// Check observable’s dependency data
	var observableDepData = canReflectDeps.getDependencyDataOf(observable);
	assert.deepEqual(
		observableDepData,
		{
			whatIChange: {
				mutate: {
					keyDependencies: new Map([
						// observable changes outer.inner’s 'key' property
						[newInner, new Set(["key"])]
					])
				}
			}
		},
		"observable has the correct mutation dependencies"
	);
});
