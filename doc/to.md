@function can-value.to to
@parent can-value/methods

@description Get an observable for setting (but not getting) a property on an object.

@signature `canValue.to( object, keyPath )`

  @param {Object} object The object from which to read.

  @param {String} keyPath A String of dot-separated keys, representing a path of properties.

  @return {Object} An observable compatible with [can-reflect.setValue can-reflect.setValue()]
  but not [can-reflect.getValue can-reflect.getValue()]; it also has a `value` property that
  can be used to set the value.

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

const keyObservable = canValue.to(outer, "inner.key");

keyObservable.value = "aloha";
// outer.inner.key === "aloha"
```
