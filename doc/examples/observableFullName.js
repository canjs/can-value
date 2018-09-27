import {DefineMap, value, Reflect as canReflect} from "can";

const person = new DefineMap( { first: "Grace", last: "Murray" } );

const fullName = value.returnedBy( function() {
	return person.first + " " + person.last;
} );

console.log( fullName.value ); //-> "Grace Murray"

const handler = function(newValue) {
  console.log( newValue ); //-> "Grace Hopper"
};

canReflect.onValue(fullName, handler);
person.last = "Hopper";
