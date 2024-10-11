import { describe, expect, it } from "vitest";

// Scripts
import { LinkedLists, Node } from "../apps/linkedList";

describe('Linked list exercise tests', () => {

  it('Linked list appends node', () => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');
   
    linkedList.append(a);
    linkedList.append(b);
    linkedList.append(c);
    
    expect(linkedList.head()).toBe(a);
    expect(linkedList.head().nextNode).toBe(b);
    expect(a.nextNode).toBe(b);
    expect(b.nextNode).toBe(c);
  })

  it('Linked list can prepend a node', () => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');
    const s = new Node('S');

    expect(linkedList.head()).toBeNull();

    linkedList.append(a);
    
    expect(linkedList.head()).toBe(a);
    expect(linkedList.listTail).toBe(a);
    expect(a.nextNode).toBeNull();

    linkedList.append(b);
    linkedList.append(c);
    linkedList.prepend(s);

    expect(linkedList.head()).toBe(s);
    expect(s.nextNode).toBe(a);
    expect(linkedList.listTail).toBe(c);
  });

  it('Linked list can count size of list', () => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');
    const d = new Node('D');
    const e = new Node('E');
    const f = new Node('F');

    expect(linkedList.size()).toBe(0);

    linkedList.append(a);
    linkedList.append(b);
    linkedList.append(c);

    expect(linkedList.size()).toBe(3);

    linkedList.append(d);
    linkedList.append(e);
    linkedList.append(f);

    expect(linkedList.size()).toBe(6);
  })

  it('Linked list can return head', () => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');

    expect(linkedList.head()).toBeNull();

    linkedList.append(a);

    expect(linkedList.head()).toBe(a);
    expect(linkedList.listTail).toBe(a);

    linkedList.prepend(b);

    expect(linkedList.head()).toBe(b);
    expect(b.nextNode).toBe(a);

    linkedList.prepend(c);
    expect(linkedList.listHead).toBe(c);
    expect(linkedList.head()).toBe(c);
  })

  it('Linked list can return tail', () => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');

    expect(linkedList.head()).toBeNull();
    expect(linkedList.tail()).toBeNull();

    linkedList.append(a);

    expect(linkedList.head()).toBe(a);
    expect(linkedList.tail()).toBe(a);

    linkedList.prepend(b);

    expect(linkedList.head()).toBe(b);
    expect(linkedList.tail()).toBe(a);

    linkedList.prepend(c);
    expect(linkedList.head()).toBe(c);
    expect(c.nextNode).toBe(b);
  })

  it('Linked list can return node at required index', () => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');
    const d = new Node('D')
    const e = new Node('E')
    const s = new Node('S')

    expect(linkedList.at(0)).toBeNull();
    
    linkedList.append(a);
    expect(linkedList.at(0)).toBe(a);

    linkedList.append(b);
    linkedList.append(c);
    linkedList.append(d);
    linkedList.append(e);

    expect(linkedList.at(1)).toBe(b);
    expect(linkedList.at(2)).toBe(c);
    expect(linkedList.at(3)).toBe(d);
    expect(linkedList.at(4)).toBe(e);
    expect(linkedList.at(5)).toBeNull;
    expect(linkedList.at(10)).toBeNull;

    linkedList.prepend(s);
    expect(linkedList.at(0)).toBe(s);
    expect(linkedList.at(1)).toBe(a);
    expect(linkedList.at(4)).toBe(d);
  })

  it('Linked list can remove last node from the list', () => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');

    linkedList.pop();
    expect(linkedList.head()).toBeNull();
    expect(linkedList.tail()).toBeNull();

    linkedList.append(a);
    linkedList.append(b);
    linkedList.append(c);

    linkedList.pop();
    expect(linkedList.tail()).toBe(b);
    expect(b.nextNode).toBeNull();

    
    linkedList.pop();
    expect(linkedList.tail()).toBe(a);
    expect(a.nextNode).toBeNull();
    
    
    linkedList.pop();
    expect(linkedList.head()).toBeNull();
    expect(linkedList.tail()).toBeNull();
  })

  it('Linked list can find if list contains a value', () => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');
    linkedList.append(a);
    linkedList.append(b);
    linkedList.append(c);

    expect(linkedList.contains('A')).toBeTruthy();
    expect(linkedList.contains('B')).toBeTruthy();
    expect(linkedList.contains('C')).toBeTruthy();
    expect(linkedList.contains('D')).toBeFalsy();
    expect(linkedList.contains('E')).toBeFalsy();
    expect(linkedList.contains('F')).toBeFalsy();
  }) 

  it('Linked list finds index of node with given value',() => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');
    linkedList.append(a);
    linkedList.append(b);
    linkedList.append(c);

    expect(linkedList.find('A')).toBe(0);
    expect(linkedList.find('B')).toBe(1);
    expect(linkedList.find('C')).toBe(2);
    expect(linkedList.find('D')).toBeNull();

  })

  it('Linked list prints nodes structure in string', () => {
    const linkedList = new LinkedLists();
    const a = new Node('A');
    const b = new Node('B');
    const c = new Node('C');
    const d = new Node('D');
    const e = new Node('E');
    const f = new Node('F');

    expect(linkedList.toString()).toMatch('null');
    
    linkedList.append(a);
    linkedList.append(b);
    linkedList.append(c);

    expect(linkedList.toString()).toMatch('(A) -> (B) -> (C) -> null');

    linkedList.append(d);
    linkedList.append(e);
    linkedList.append(f);
    
    expect(linkedList.toString()).toMatch('(A) -> (B) -> (C) -> (D) -> (E) -> (F) -> null');
  })

})