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
can get _and_ set `map.parent.childName`:

```js
import canReflect from "can-reflect";
import canValue from "can-value";

const map = {
  parent: {
    childName: "Alexis"
  }
};

const childNameObservable = canValue.bind(map, "parent.childName");
```

Now if we use [can-reflect.getValue can-reflect.getValue()] and pass it
`childNameObservable`, we get `map.parent.childName`:

```js
canReflect.getValue(childNameObservable);
// Returns "Alexis"
```

We can also set the value with [can-reflect.setValue can-reflect.setValue()]:

```js
canReflect.setValue(childNameObservable, "Taylor");
// Now map.parent.childName === "Taylor"
```

[can-value.from can-value.from()] and [can-value.to can-value.to()] exist to create
observables that just get or just set properties on an object, respectively.
