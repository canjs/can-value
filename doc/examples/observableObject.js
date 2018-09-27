import {DefineMap, value} from "can";

const outer = new DefineMap({
  inner: {
    key: "hello"
  }
});

const keyObservable = value.bind(outer, "inner.key");
console.log( keyObservable.value ); //-> "hello"

keyObservable.value = "aloha";
console.log( outer.inner.key ); //->"aloha"
