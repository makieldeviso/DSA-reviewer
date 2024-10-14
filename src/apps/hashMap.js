class Node {
  constructor (key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(node,  current = this.head, backNode = null) {
    if (this.head === null) {
      this.head = node;
      return
    }

    if (current === null) {
      backNode.nextNode = node;
      return
    }

    this.append(node, current.nextNode, current)
  }
  
  hasKey(node, current = this.head) {
    if (current === null) {
      return false
    }

    if (current.key === node.key) {
      return true
    }

    return this.hasKey(node, current.nextNode);
  }


  updateList(node, current = this.head, backNode = null) {
    if (current === null) {
      backNode.nextNode = node;
      return 'append'
    }

    if (current.key === node.key) {
      current.value = node.value;
      return 'update'
    }

    return this.updateList(node, current.nextNode, current);
  }

  getValue (key, current = this.head) {
    if (current === null) {
      return null
    }

    if (current.key === key) {
      return current.value;
    }

    return this.getValue(key, current.nextNode);
  }

  findKey (key, current = this.head) {
    if (current === null) {
      return false
    }

    if (current.key === key) {
      return true
    }

    return this.findKey(key, current.nextNode)
  }

  removeEntry(key, current = this.head, backNode = this.null) {
    if (current === null) {
      return false
    }

    if (this.head.key === key && this.head.nextNode === null) {
      this.head = null;
      return true;
    }

    if (this.head.key === key) {
      this.head = current.nextNode;
      return
    }
    
    if (current.key === key) {
      const currentNextNode = current.nextNode;
      backNode.nextNode = currentNextNode;
      return true
    }

    return this.removeEntry(key, current.nextNode, current)

  }

  size (current = this.head, currentIndex = 0) {
    if (current === null) {
      return currentIndex;
    }

    return this.size(current.nextNode, currentIndex += 1);
  }

  getKeys (current = this.head, keysArray = []) {
    if (current === null) {
      return keysArray
    }

    return this.getKeys(current.nextNode, [...keysArray, current.key])
  }

  getValues (current = this.head, valuesArray = []) {

    if (current === null) {
      return valuesArray
    }

    return this.getValues(current.nextNode, [...valuesArray, current.value])
  }

  getEntries(current = this.head, entriesArray = []) {
    if (current === null) {
      return entriesArray
    }

    return this.getEntries(current.nextNode, [...entriesArray, [current.key, current.value]])

  }

}


class HashMap {
  constructor () {
    this.initialSize = 16;
    this.entriesSize = 0;
    this.maxSize = this.initialSize;
    this.reduceLoadCoefficient = 0.13;
    this.expandLoadCoefficient = 0.75;
    this.expandLoadFactor = Math.floor(this.maxSize * this.expandLoadCoefficient);
    this.reduceLoadFactor = Math.floor(this.maxSize * this.reduceLoadCoefficient);
    this.buckets = new Array(this.initialSize);

  }

  // hash(key) takes a key and produces a hash code with it
  hash(key) {
    let hashCode = 0;

    const primeNumber = 97;

    for(let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    
    return hashCode % this.maxSize
  }

  updateLoadFactors() {
    this.expandLoadFactor = Math.floor(this.maxSize * this.expandLoadCoefficient);
    this.reduceLoadFactor = Math.floor(this.maxSize * this.reduceLoadCoefficient);
  }

  // Expand bucket size
  expand() {
    const expandedSize = this.maxSize + this.initialSize;

    const entries = this.entries(); // Get current entries/ key value pairs
    this.clear(); // Clear the buckets
    this.maxSize = this.maxSize + this.initialSize;
    this.updateLoadFactors();
    this.buckets = new Array(expandedSize);

    // Reassign current values to new expanded map
    for(let i = 0; i < entries.length; i++) {
      this.set(entries[i][0], entries[i][1]);
    }
  }

  // Reduce max size
  reduce() {
    // Ensure minimum size is initialSize
    if (this.maxSize === this.initialSize) return
    
    const entries = this.entries();
    this.clear();
    this.maxSize = this.maxSize - this.initialSize;
    this.updateLoadFactors();
    
    this.buckets = new Array(this.maxSize);

    // Reassign current values to new reduced map
    for(let i = 0; i < entries.length; i++) {
      this.set(entries[i][0], entries[i][1]);
    }

  }

  // set(key, value) takes two arguments, 
  // the first is a key and the second is a value that is assigned to this key. 
  // If a key already exists, then the old value is overwritten
  set(key, value) {
    const data = new Node(key, value);
  
    // const currentSize = this.length();
    const currentSize = this.entriesSize;
    if (currentSize >= this.expandLoadFactor) {
      this.expand();
    }

    const bucketIndex = this.hash(key);

     // Put node in the bucket
    // Check if bucket is empty, create a new list
    if (!this.buckets[bucketIndex]) {
      const initialList = new LinkedList();
      initialList.append(data);
      this.buckets[bucketIndex] = initialList;
      this.entriesSize += 1;
      return
    }

    // Check if node key already exist in the bucket, update value
    // If key don't exist yet on the bucket, append new data
    // Note: updateNode method already checks if a key exist, updates/ append on check
    const updateResult = this.buckets[bucketIndex].updateList(data);
    this.entriesSize = updateResult === 'append' ? this.entriesSize + 1 : this.entriesSize + 0;
    
  }

  // get(key) takes one argument as a key and returns the value that is assigned to this key. 
  // If a key is not found, return null.
  get(key) {
    const possibleBucketIndex = this.hash(key);

    if (!this.buckets[possibleBucketIndex]) {
      return null;
    }

    const findListResult = this.buckets[possibleBucketIndex].getValue(key);
    return findListResult;
  }

  // has(key) takes a key as an argument and returns true or false 
  // based on whether or not the key is in the hash map.
  has(key) {
    const possibleBucketIndex = this.hash(key);

    if (!this.buckets[possibleBucketIndex]) {
      return false;
    }

    const findListResult = this.buckets[possibleBucketIndex].findKey(key);
    return findListResult;
  }

  // remove(key) takes a key as an argument. 
  // If the given key is in the hash map, it should remove the entry with that key and return true. 
  // If the key isn’t in the hash map, it should return false.
  remove(key) {
    let possibleBucketIndex = this.hash(key);
    let possibleBucket = this.buckets[possibleBucketIndex];
    
    // If possible bucket is empty
    if (!possibleBucket) {
      return false
    }

    // If possible bucket is not empty
    const removeResult = possibleBucket.removeEntry(key);

    if (possibleBucket && !possibleBucket.head) {
      this.buckets.splice(possibleBucketIndex, 1, undefined);
    }

    this.entriesSize -= 1;

    // Reduce buckets if reduceLoadFactor reached
    // Update possible bucket if resized
    // const currentSize = this.length();
    const currentSize = this.entriesSize;
    if (currentSize <= this.reduceLoadFactor) {
      this.reduce();
    }

    return removeResult;
  }

  // length() returns the number of stored keys in the hash map.
  length() {
    let currentLength = 0;
    for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        currentLength += this.buckets[i].size();
      }
    }

    return currentLength;
  }

  // clear() removes all entries in the hash map.
  clear() {
    this.buckets = new Array(this.initialSize);
    this.entriesSize = 0;
  }

  // keys() returns an array containing all the keys inside the hash map.
  keys() {
    let keysArray = [];
    for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        keysArray = [...keysArray, ...this.buckets[i].getKeys()];
      }
    }

    return keysArray;
  }

  // values() returns an array containing all the values.
  values() {
    let valuesArray = [];
    for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        valuesArray = [...valuesArray, ...this.buckets[i].getValues()];
      }
    }
    return valuesArray;
  }

  // entries() returns an array that contains each key, value pair.
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries () {
    let entriesArray = [];
    for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        entriesArray = [...entriesArray, ...this.buckets[i].getEntries()];
      }
    }

    return entriesArray;
  }
}

const hashMapResults = () => {
  
}

export default hashMapResults
export {HashMap, LinkedList, Node}