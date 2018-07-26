@module {Object} can-value
@package ./package.json
@parent can-observables
@collection can-core
@description Get an observable that’s bound to a specific property on another object.
@group can-value/methods methods
@outline 2

@type {Object}

`can-value` exports an object with the following methods:

```js
{
    bind(object, keyPath)
    // Returns an observable for getting and setting a property on an object.

    from(object, keyPath)
    // Returns an observable for only getting a property on an object.

    returnedBy(getter)
    // Creates an observable that derives its value from other observable values.

    to(object, keyPath)
    // Returns an observable for only setting a property on an object.

    with(initialValue)
    // Creates an observable with an initial value that can be read, written, and observed.
}
```

@body

## Use

### Observable from an initial value

At its simplest, [can-value.with] can be used to
create an observable from another initial value:

```js
import value from "can-value";

const observable = value.with(15);

observable.value; // is 15
```

You can use [can-reflect/observe.onValue] to listen for
when the observable value changes:

```js
const handler = function(newValue) {
  newValue; // is 22
};

canReflect.onValue(observable, handler);
observable.value = 22;
```

### Observable derived from other values

[can-value.returnedBy] can be used to create an
observable value that derives its value from other observable values. When the
derived values change, the observable’s value will be updated automatically.

The following creates a `fullName` observable that derives its values from the
`person` observable. The value of the observable is read with `fullName.value`:

```js
import canReflect from "can-reflect";
import observe from "can-observe";
import value from "can-value";

const person = observe( { first: "Grace", last: "Murray" } );

const fullName = value.returnedBy( function() {
	return person.first + " " + person.last;
} );

fullName.value; // is "Grace Murray"
```

You can use [can-reflect/observe.onValue] to listen for
when the observable value changes (because one of the values from which the
observable derives its value changed):

```js
const handler = function(newValue) {
  newValue; // is "Grace Hopper"
};

canReflect.onValue(fullName, handler);
person.last = "Hopper";
```

### Bind to other objects

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
