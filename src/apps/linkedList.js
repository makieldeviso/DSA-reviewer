
class LinkedLists {
  constructor () {
    this.listHead = null;
    this.listTail = null;
  }

  // append(value) adds a new node containing value to the end of the list
  append (node, current = this.listHead) {

    if (this.listHead === null) {
      this.listHead = node;
      this.listTail = node;
    }

    if (current === null) {
      return
    }

    if (current.nextNode === null) {
      current.nextNode = node;
      this.listTail = node;
      return
    }

    this.append(node, current.nextNode); 
  }

  // prepend(value) adds a new node containing value to the start of the list
  prepend(node, current = this.listHead) {

    if (this.listHead === null) {
      this.listHead = node;
      this.listTail = node;
      return
    }

    node.nextNode = current;
    this.listHead = node;
  }

  // size returns the total number of nodes in the list
  size(size = 0, current = this.listHead) {

    if (current === null) {
      return size
    }
    
    return this.size(size += 1, current.nextNode);

  }

  // head returns the first node in the list
  head() {
    return this.listHead
  }

  // tail returns the last node in the list
  tail() {
    return this.listTail
  }

  //  at(index) returns the node at the given index
  at(index, current = this.listHead, currentIndex = 0) {

    if (current === null) {
      return null // Index it out of linked list bounds
    }

    if (index === currentIndex) {
      return current
    }
    
    return this.at(index, current.nextNode, currentIndex += 1)
  }

  // pop removes the last element from the list
  pop(current = this.listHead, backNode = this.listHead) {

    if (current === null) {
      return
    }

    if (this.size() === 1) {
      this.listHead = null;
      this.listTail = null;
      return
    }

    if (current.nextNode === null) {
      backNode.nextNode = null;
      this.listTail = backNode;
    }

    this.pop(current.nextNode, current)
  }

  // contains(value) returns true if the passed in value is in the list and otherwise returns false.
  contains(value, current = this.listHead) {

    if (current === null) {
      return false;
    }

    if (current.value === value) {
      return true;
    }

    return this.contains(value, current.nextNode)
  }

  // find(value) returns the index of the node containing value, or null if not found.
  find(value, current = this.listHead, currentIndex = 0) {
    
    if (current === null) {
      return null
    }

    if (current.value === value) {
      return currentIndex
    }

    return this.find(value, current.nextNode, currentIndex += 1)
  }


  // toString represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
  toString (current = this.listHead, string = '') {

    if (this.listHead === null) {
      return 'null';
    }

    if (current === null) {
      return `${string} null`;
    }
    
    const currentString = `${string} (${current.value}) ->`;

    return this.toString(current.nextNode, currentString);
  }

}

class Node {
  constructor (value) {
    this.value = value;
    this.nextNode = null;
  }
}

const a = new Node('A');
const b = new Node('B');
const c = new Node('C');
const d = new Node('D');
const e = new Node('E');
const f = new Node('F');

const linkedListA = new LinkedLists();
linkedListA.append(a)
linkedListA.append(b)
linkedListA.append(c)
linkedListA.append(d)
linkedListA.append(e)
linkedListA.append(f)

const linkedListB = new LinkedLists();

const linkedListAnswers = function () {
  console.log(linkedListA.toString());
  console.log(linkedListB.toString());
}

export default linkedListAnswers
export {LinkedLists, Node}