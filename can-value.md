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

    fromValue(initialValue)
    // Creates an observable with an initial value that can be read, written, and observed.

    returnedBy(getter)
    // Creates an observable that derives its value from other observable values.

    to(object, keyPath)
    // Returns an observable for only setting a property on an object.
}
```

@body

## Use

### Observable from an initial value

At its simplest, [can-value.fromValue can-value.fromValue()] can be used to
create an observable from another initial value:

```js
import canValue from "can-value";

const observable = canValue.fromValue(15);

observable.value; // is 15
```

You can use [can-reflect/observe.onValue can-reflect.onValue()] to listen for
when the observable value changes:

```js
const handler = function(newValue) {
  newValue; // is 22
};
canReflect.onValue(observable, handler);
observable.value = 22;
```

### Observable derived from other values

[can-value.returnedBy can-value.returnedBy()] can be used to create an
observable value that derives its value from other observable values. When the
derived values change, the observable’s value will be updated automatically.

The following creates a `fullName` observable that derives its values from the
`person` observable. The value of the observable is read with `fullName.value`:

```js
import canReflect from "can-reflect";
import canValue from "can-value";
import observe from "can-observe";

const person = observe( { first: "Grace", last: "Murray" } );

const fullName = value.returnedBy( function() {
	return person.first + " " + person.last;
} );
fullName.value; // is "Grace Murray"
```

You can use [can-reflect/observe.onValue can-reflect.onValue()] to listen for
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
