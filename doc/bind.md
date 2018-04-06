@function can-value.bind bind
@parent can-value/methods

@description Get an observable for getting and setting a property on an object.

@signature `canValue.bind( object, keyPath )`

  @param {Object} object The object from which to read.

  @param {String} keyPath A String of dot-separated keys, representing a path of properties.

  @return {Object} An observable compatible with [can-reflect.getValue can-reflect.getValue()]
  and [can-reflect.setValue can-reflect.setValue()].

@body

## Use

```js
import canReflect from "can-reflect";
import canValue from "can-value";

const map = {
  parent: {
    childName: "Alexis"
  }
};

const childNameObservable = canValue.bind(map, "parent.childName");
// canReflect.getValue(childNameObservable) === "Alexis"

canReflect.setValue(childNameObservable, "Taylor");
// map.parent.childName === "Taylor"
```
