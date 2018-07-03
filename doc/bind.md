@function can-value.bind bind
@parent can-value/methods

@description Get an observable for getting and setting a property on an object.

@signature `canValue.bind( object, keyPath )`

  @param {Object} object The object from which to read.

  @param {String} keyPath A String of dot-separated keys, representing a path of properties.

  @return {Object} An observable compatible with [can-reflect.getValue can-reflect.getValue()]
  and [can-reflect.setValue can-reflect.setValue()]; it also has a `value` property that can
  be used to get and set the value.

@body

## Use

```js
import canValue from "can-value";
import SimpleMap from "can-simple-map";

const outer = new SimpleMap({
  inner: new SimpleMap({
    key: "hello"
  })
});

const keyObservable = canValue.bind(outer, "inner.key");
// keyObservable.value === "hello"

keyObservable.value = "aloha";
// outer.inner.key === "aloha"
```
