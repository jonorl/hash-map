// constructor classes

// Creates a node that's composed of a value and a pointer to its next node.
class Node {
  // Constructor
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}
// Methods

// Creates the linked list composed of a link of nodes.
export class LinkedList {
  constructor() {
    this.header = null;
  }
  // Adds a new node containing value to the end of the list.
  append(key, value) {
    if (this.header === null) {
      this.header = new Node(key, value);
    } else {
      let nodeChecker = this.header;
      while (nodeChecker.nextNode !== null) {
        nodeChecker = nodeChecker.nextNode;
      }
      nodeChecker.nextNode = new Node(key, value);
    }
  }
  // Adds a new node containing value to the start of the list.
  prepend(key, value) {
    if (this.header === null) {
      this.header = new Node(key, value);
    } else {
      let tmp = new Node(key, value);
      tmp.nextNode = this.header;
      this.header = tmp;
    }
  }
  // Returns the total number of nodes in the list.
  size() {
    let nodeLoop = this.header;
    let nodeCounter = 0;
    while (nodeLoop !== null) {
      nodeCounter++;
      nodeLoop = nodeLoop.nextNode;
    }
    return nodeCounter;
  }
  // Returns the first node in the list.
  head() {
    if (this.header === null) return "empty list";
    else return this.header.value;
  }
  // Returns the last node in the list.
  tail() {
    if (this.header === null) return "empty list";
    else {
      let nodeLoop = this.header;
      while (nodeLoop.nextNode !== null) {
        nodeLoop = nodeLoop.nextNode;
      }
      return nodeLoop;
    }
  }
  // Returns the node at the given index.
  at(index) {
    if (this.header === null) return "empty list";
    else if (this.size() - 1 < index || index < 0) return "index out of bounds";
    let nodeLoop = this.header;
    let nodeCounter = 0;
    while (nodeLoop.nextNode !== null && nodeCounter !== index) {
      nodeCounter++;
      nodeLoop = nodeLoop.nextNode;
    }
    return nodeLoop;
  }
  // Removes the last element from the list.
  pop() {
    if (this.header === null) return "empty list";
    let nodeLoop = this.header;
    let nodeCounter = 0;
    while (nodeLoop.nextNode !== null) {
      nodeCounter++;
      nodeLoop = nodeLoop.nextNode;
    }
    this.at(nodeCounter - 1).nextNode = null;
    return this;
  }
  // Returns true if the passed in value is in the list and otherwise returns false.
  contains(value) {
    if (this.header === null) return false;
    let nodeLoop = this.header;
    while (nodeLoop.nextNode !== null) {
      if (nodeLoop.value === value) {
        return true;
      }
      nodeLoop = nodeLoop.nextNode;
    }
    return false;
  }
  // Returns the index of the node containing value, or null if not found.
  find(value) {
    if (this.header === null) return null;
    let nodeLoop = this.header;
    let nodeCounter = 0;
    while (nodeLoop.nextNode !== null) {
      if (nodeLoop.value === value) {
        return nodeCounter;
      }
      nodeCounter++;
      nodeLoop = nodeLoop.nextNode;
    }
    if (nodeLoop.value === value) {
      return nodeCounter;
    } else return null;
  }
  // Represents your LinkedList objects as strings, so you can print them out and preview them in the console.
  // The format should be: ( value ) -> ( value ) -> ( value ) -> null.
  toString() {
    if (this.header === null) return "empty list";

    let nodeLoop = this.header;
    let nodeArray = [];
    while (nodeLoop.nextNode !== null) {
      nodeArray.push(nodeLoop.value);
      nodeLoop = nodeLoop.nextNode;
    }
    nodeArray.push(nodeLoop.value);
    if (nodeLoop.nextNode === null) {
      nodeArray.push("null");
    } else nodeArray.push(nodeLoop.nextNode);
    return "(" + nodeArray.join(") -> (") + ")";
  }
  // Extra Credit: insertAt(value, index) that inserts a new node with the provided value at the given index.
  insert(value, index) {
    if (index > this.size() || index < 0)
      return console.log("index out of bounds");
    else if (index === 0) return this.prepend(value);
    else if (index === this.size()) return this.append(value);
    else {
      let tmp = new Node(value);
      tmp.nextNode = this.at(index);
      this.at(index - 1).nextNode = tmp;
    }
  }
  // Extra Credit: removeAt(index) that removes the node at the given index.
  removeAt(index) {
    if (index >= this.size() || index < 0)
      return console.log("index out of bounds");
    else if (index === this.size() - 1) return this.pop();
    else if (index === 0) {
      this.header = this.header.nextNode;
    } else {
      let tmp = this.at(index - 1);
      tmp.nextNode = this.at(index + 1);
    }
  }
}

// Hash Map

class HashMap {
  // Constructor
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.bucket = [];
    for (let i = 0; i < capacity; i++) {
      this.bucket.push(i);
    }
  }

  // Methods

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    console.log("hashValue: " + hashCode);
    return hashCode;
  }

  set(key, value) {
    if (typeof this.bucket[this.hash(key)] === "number") {
      this.bucket[this.hash(key)] = new LinkedList();
      this.bucket[this.hash(key)].prepend(key, value);
    } else {
      this.bucket[this.hash(key)].append(key, value);
    }
  }

  get(key) {
    if (this.bucket[this.hash(key)].header === undefined) return null;
    let nodeLoop = this.bucket[this.hash(key)].header;
    while (nodeLoop !== null) {
      if (nodeLoop.key === key) {
        return nodeLoop.value;
      } else nodeLoop = nodeLoop.nextNode;
    }
    return null;
  }
  has(key) {
    if (this.bucket[this.hash(key)].header === undefined) return false;
    let nodeLoop = this.bucket[this.hash(key)].header;
    while (nodeLoop !== null) {
      if (nodeLoop.key === key) {
        return true;
      } else nodeLoop = nodeLoop.nextNode;
    }
    return false;
  }
  remove(key) {
    if (this.has(key) === false) return false;
    let nodeLoop = this.bucket[this.hash(key)].header;
    while (nodeLoop.nextNode !== null) {
      if (nodeLoop.nextNode.key === key) {
        console.log(nodeLoop.nextNode);
        console.log(nodeLoop.nextNode.nextNode);
        nodeLoop.nextNode = nodeLoop.nextNode.nextNode;
        return true;
      } else if (nodeLoop.key === key) {
        this.bucket[this.hash(key)] = new LinkedList();
        this.bucket[this.hash(key)].prepend(
          nodeLoop.nextNode.key,
          nodeLoop.nextNode.value
        );
        this.bucket[this.hash(key)].header.nextNode =
          nodeLoop.nextNode.nextNode;
        return true;
      }
      nodeLoop = nodeLoop.nextNode;
    }
    return false;
  }
}

const test = new HashMap();

test.set("apple", "red"); // works
test.set("Z", "blue"); // works
test.set("JT", "yellow"); // works
test.remove("JT");

console.log(test.bucket);
// console.log(test.get("JT")); // works
// console.log(test.get("sdfO")); // works
// console.log(test.has("JT")); // works
// console.log(test.has("sdfO")); // works
