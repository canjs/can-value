var QUnit = require("steal-qunit");
var canValue = require("../can-value");
var canReflect = require("can-reflect");

QUnit.module('can-value');

QUnit.test("bind method works", function() {
	var map = {parent: {childName: "hello"}};
	var getAndSetProp = canValue.bind(map, "parent.childName");

	// Test getting the value
	QUnit.equal(canReflect.getValue(getAndSetProp), "hello", "getting works");

	// Test setting the value
	canReflect.setValue(getAndSetProp, "aloha");
	QUnit.equal(map.parent.childName, "aloha", "setting works");
});

QUnit.test("from method works", function() {
	var map = {parent: {childName: "hello"}};
	var getProp = canValue.from(map, "parent.childName");

	// Test getting the value
	QUnit.equal(canReflect.getValue(getProp), "hello", "getting works");

	// Setting the value shouldn’t work
	var errorThrown;
	try {
		canReflect.setValue(getProp, "aloha");
	} catch (error) {
		errorThrown = error;
	}
	QUnit.ok(errorThrown instanceof Error, "setting doesn’t work");
});

QUnit.test("to method works", function() {
	var map = {parent: {childName: "hello"}};
	var setProp = canValue.to(map, "parent.childName");

	// Getting the value shouldn’t work
	QUnit.equal(canReflect.getValue(setProp), undefined, "getting doesn’t work");

	// Test setting the value
	canReflect.setValue(setProp, "aloha");
	QUnit.equal(map.parent.childName, "aloha", "setting works");
});
