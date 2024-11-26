// Imports

import { HashMap } from "./class.mjs";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
test.set("lion", "furry");
test.set("apple", "asdasdsa");

// test.set("Z", "blue"); // works
// test.set("JT", "yellow"); // works

// console.log(test.has("apple"))
// console.log(test.remove("apple"))
// test.remove("lion")
console.log(test.bucket);
console.log(test.length());
