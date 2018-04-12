@function can-value.from from
@parent can-value/methods

@description Get an observable for getting (but not setting) a property on an object.

@signature `canValue.from( object, keyPath )`

  @param {Object} object The object from which to read.

  @param {String} keyPath A String of dot-separated keys, representing a path of properties.

  @return {Object} An observable compatible with [can-reflect.getValue can-reflect.getValue()]
  but not [can-reflect.setValue can-reflect.setValue()].

@body

## Use

```js
import canReflect from "can-reflect";
import canValue from "can-value";
import SimpleMap from "can-simple-map";

const outer = new SimpleMap({
  inner: new SimpleMap({
    key: "hello"
  })
});

const keyObservable = canValue.from(outer, "inner.key");
// canReflect.getValue(keyObservable) === "hello"

canReflect.setValue(keyObservable, "aloha");
// Error thrown because the value isn’t settable
```
