@function can-value.from from
@parent can-value/methods

@description Get an observable for getting (but not setting) a property on an object.

@signature `value.from( object, keyPath )`

In the example below, a `keyObservable` is created that is one-way bound to the
value at `outer.inner.key`. When `outer.inner.key` changes,
`keyObservable.value` is updated, but changes to `keyObservable.value` do not
update `outer.inner.key`.

```js
import DefineMap from "can-define/map/map";
import value from "can-value";

const outer = new DefineMap({
  inner: {
    key: "hello"
  }
});

const keyObservable = value.from(outer, "inner.key");
// keyObservable.value === "hello"

keyObservable.value = "aloha";
// Error thrown because the value isn’t settable
```

  @param {Object} object The object from which to read.

  @param {String} keyPath A String of dot-separated keys, representing a path of properties.

  @return {Object} An observable compatible with [can-reflect.getValue]
  but not [can-reflect.setValue]; it also has a `value` property that
  can be used to get the value.
