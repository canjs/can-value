@function can-value.returnedBy returnedBy
@parent can-value/methods

@description Creates an observable that derives its value from other observable values.

@signature `value.returnedBy( getter )`

Creates an observable value that can be read and observed using [can-reflect].

The following creates a `fullName` observable that derives its values from the
`person` observable. The value of the observable is read with `fullName.value`:

```js
import canReflect from "can-reflect";
import value from "can-value";
import observe from "can-observe";

const person = observe( { first: "Grace", last: "Murray" } );

const fullName = value.returnedBy( function() {
	return person.first + " " + person.last;
} );
fullName.value; // is "Grace Murray"

const handler = function(newValue) {
  newValue; // is "Grace Hopper"
};
canReflect.onValue(fullName, handler);
person.last = "Hopper";

canReflect.offValue(observable, handler);
```

@param {function} getter A function that returns the value being observed.

@return {Object} An observable compatible with [can-reflect.getValue]
and [can-reflect.setValue]; it also has a `value` property that can
be used to get and set the value.
