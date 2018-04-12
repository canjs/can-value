@module {Object} can-value
@package ./package.json
@parent can-observables
@collection can-infrastructure
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

In the example below, we use [can-value.bind can-value.bind()] to get an observable that
can get _and_ set `outer.inner.key`:

```js
import canReflect from "can-reflect";
import canValue from "can-value";
import SimpleMap from "can-simple-map";

const outer = new SimpleMap({
  inner: new SimpleMap({
    key: "hello"
  })
});

const keyObservable = canValue.bind(outer, "inner.key");
```

Now if we use [can-reflect.getValue can-reflect.getValue()] and pass it
`keyObservable`, we get `outer.inner.key`:

```js
canReflect.getValue(keyObservable);
// Returns "hello"
```

We can also set the value with [can-reflect.setValue can-reflect.setValue()]:

```js
canReflect.setValue(keyObservable, "aloha");
// Now outer.inner.key === "aloha"
```

[can-value.from can-value.from()] and [can-value.to can-value.to()] exist to create
observables that just get or just set properties on an object, respectively.
