@function can-value.with with
@parent can-value/methods

@description Creates an observable value from an initial value.

@signature `value.with( initialValue )`

Creates an observable value that can be read, written, and observed using [can-reflect].

```js
import value from "can-value";

const observable = value.with("one");

canReflect.getValue(observable); // is "one"
observable.value; // is "one"

canReflect.setValue(observable, "two");
observable.value; // is "two"

observable.value = "three";
observable.value; // is "three"

const handler = function(newValue) {
  newValue; // is "four"
};
canReflect.onValue(observable, handler);
observable.value = "four";

canReflect.offValue(observable, handler);
```

@param {*} initialValue The initial value of the observable.

@return {Object} An observable compatible with [can-reflect.getValue]
and [can-reflect.setValue]; it also has a `value` property that can
be used to get and set the value.
