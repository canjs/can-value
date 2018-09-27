@function can-value.with with
@parent can-value/methods

@description Creates an observable value from an initial value.

@signature `value.with( initialValue )`

  Creates an observable value that can be read, written, and observed using [can-reflect].

  ```js
  import {value, Reflect as canReflect} from "can";

  const observable = value.with("one");

  console.log( canReflect.getValue(observable) ); //-> "one"
  console.log( observable.value ); //-> "one"

  canReflect.setValue(observable, "two");
  console.log( observable.value ); //-> "two"

  observable.value = "three";
  console.log( observable.value ); //-> "three"

  const handler = function(newValue) {
    console.log( newValue ); //-> "four"
  };
  canReflect.onValue(observable, handler);
  observable.value = "four";

  canReflect.offValue(observable, handler);
  ```
  @codepen

  @param {*} initialValue The initial value of the observable.

  @return {Object} An observable compatible with [can-reflect.getValue]
  and [can-reflect.setValue]; it also has a `value` property that can
  be used to get and set the value.
