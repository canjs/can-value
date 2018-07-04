@function can-value.bind bind
@parent can-value/methods

@description Get an observable for getting and setting a property on an object.

@signature `value.bind( object, keyPath )`

In the example below, a `keyObservable` is created that is two-way bound to the
value at `outer.inner.key`. When `keyObservable.value` changes,
`outer.inner.key` is updated, and vice versa.

```js
import DefineMap from "can-define/map/map";
import value from "can-value";

const outer = new DefineMap({
  inner: {
    key: "hello"
  }
});

const keyObservable = value.bind(outer, "inner.key");
// keyObservable.value === "hello"

keyObservable.value = "aloha";
// outer.inner.key === "aloha"
```

  @param {Object} object The object from which to read.

  @param {String} keyPath A String of dot-separated keys, representing a path of properties.

  @return {Object} An observable compatible with [can-reflect.getValue]
  and [can-reflect.setValue]; it also has a `value` property that can
  be used to get and set the value.
