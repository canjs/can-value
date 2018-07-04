@module {Object} can-value
@package ./package.json
@parent can-observables
@collection can-core
@description Get an observable that’s bound to a specific property on another object.
@group can-value/methods methods

@type {Object}

`can-value` exports an object with the following methods:

```js
{
    bind(object, keyPath)
    // Returns an observable for getting and setting a property on an object.

    from(object, keyPath)
    // Returns an observable for only getting a property on an object.

    to(object, keyPath)
    // Returns an observable for only setting a property on an object.
}
```

@body

## Use

Use `can-value` when you need an observable that can get or set a property on an object.

In the example below, we use [can-value.bind] to get an observable that
can get _and_ set `outer.inner.key`:

```js
import DefineMap from "can-define/map/map";
import value from "can-value";

const outer = new DefineMap({
  inner: {
    key: "hello"
  }
});

const keyObservable = value.bind(outer, "inner.key");
```

Now if we read `keyObservable.value`, we get the value at `outer.inner.key`:

```js
keyObservable.value; // is "hello"
```

We can also set `keyObservable.value` to change the value at `outer.inner.key`:

```js
keyObservable.value = "aloha";
// Now outer.inner.key === "aloha"
```

[can-value.from] and [can-value.to] exist to create
observables that just get or just set properties on an object, respectively.
