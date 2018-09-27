import {value, Reflect as canReflect} from "can";

const observable = value.with(15);

console.log( observable.value ); //-> 15

const handler = function(newValue) {
  console.log( newValue ); //-> 22
};

canReflect.onValue(observable, handler);
observable.value = 22;
