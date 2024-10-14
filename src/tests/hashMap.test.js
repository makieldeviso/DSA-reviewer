import { describe, expect, it } from "vitest";
import { HashMap } from "../apps/hashMap";

describe('Hash Map Tests', () => {

  it('Hash map can hash key', () => {
    const hashmap = new HashMap();
    const hash_1 = hashmap.hash('Fred Mark');
    const hash_2 = hashmap.hash('Ervin');

    expect(hash_1).toBe(0);
    expect(hash_2).toBe(4);
  })

  it('Hash map can set a new key value pair', () => {
    const hashmap = new HashMap();

    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');

    expect(hashmap.buckets).toEqual(expect.arrayContaining([
      expect.objectContaining({head: expect.objectContaining({key: 'Fred Mark', value: 'Baldeviso'})}),
      expect.objectContaining({head: expect.objectContaining({key: 'Ervin', value: 'Rinos'})}),
    ]));

    expect(hashmap.buckets).toEqual(expect.arrayContaining([
      expect.objectContaining({head: expect.objectContaining(
        {key: 'Fred Mark', value: 'Baldeviso', nextNode: expect.objectContaining({key: 'Christian', value: 'Bardalo', nextNode: null}) }
      )})
    ]));

    hashmap.set('Fred Mark', 'Rayanon');

    expect(hashmap.buckets).toEqual(expect.arrayContaining([
      expect.objectContaining({head: expect.objectContaining({key: 'Fred Mark', value: 'Rayanon'})}),
      expect.objectContaining({head: expect.objectContaining({key: 'Ervin', value: 'Rinos'})}),
    ]));

    hashmap.set('Joshua', 'Arpon');

    expect(hashmap.buckets).toEqual(expect.arrayContaining([
      expect.objectContaining({head: expect.objectContaining({key: 'Fred Mark', value: 'Rayanon'})}),
      expect.objectContaining({head: expect.objectContaining({key: 'Ervin', value: 'Rinos'})}),
      expect.objectContaining({head: expect.objectContaining({key: 'Joshua', value: 'Arpon'})}),
    ]));

  })

  it ('Hash map can get value from key', () => {
    const hashmap = new HashMap();
    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');

    expect(hashmap.get('Joshua')).toBeNull();
    expect(hashmap.get('Fred Mark')).toBe('Baldeviso');
    expect(hashmap.get('Christian')).toBe('Bardalo');
  })

  it ('Hash map can find key, return boolean result', () => {
    const hashmap = new HashMap();
    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');

    expect(hashmap.has('Joshua')).toBeFalsy();
    expect(hashmap.has('Charles')).toBeFalsy();
    expect(hashmap.has('Fred Mark')).toBeTruthy();
    expect(hashmap.has('Christian')).toBeTruthy();
  })

  it ('Hash map can remove an entry from given key', () => {
    const hashmap = new HashMap();
    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');

    hashmap.remove('Fred Mark');

    expect(hashmap.buckets).toEqual(expect.arrayContaining([
      expect.objectContaining({head: expect.objectContaining({key: 'Christian', value: 'Bardalo'})}),
      expect.objectContaining({head: expect.objectContaining({key: 'Ervin', value: 'Rinos'})})
    ]));

    hashmap.remove('Ervin');
    expect(hashmap.buckets).toEqual(expect.arrayContaining([
      expect.objectContaining({head: expect.objectContaining({key: 'Christian', value: 'Bardalo'})}),
    ]));
  })

  it ('Hash map can return length of stored keys', () => {
    const hashmap = new HashMap();
    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');
    hashmap.set('Joshua', 'Arpon');
    hashmap.set('Charles', 'Derion');

    expect(hashmap.length()).toBe(5);

    hashmap.set('Rene', 'Nitura')
    expect(hashmap.length()).toBe(6);

    hashmap.set('Fred Mark', 'Rayanon');
    hashmap.set('Christian', 'Olfato');

    expect(hashmap.length()).toBe(6);
    
  })

  it('Hash map can clear all entries', () => {
    const hashmap = new HashMap();
    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');
    hashmap.set('Joshua', 'Arpon');
    hashmap.set('Charles', 'Derion');
    hashmap.set('Rene', 'Nitura');

    expect(hashmap.length()).toBe(6);

    hashmap.clear();
    expect(hashmap.length()).toBe(0);
    expect(hashmap.buckets).toEqual(expect.arrayContaining([]))

  })

  it('Hash map can return all keys in a array', () => {

    const hashmap = new HashMap();
    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');
    hashmap.set('Joshua', 'Arpon');
    hashmap.set('Charles', 'Derion');
    hashmap.set('Rene', 'Nitura');

    expect(hashmap.keys()).toEqual(expect.arrayContaining(
      ['Fred Mark', 'Christian', 'Ervin', 'Joshua', 'Charles', 'Rene']
    ));
    expect(hashmap.length()).toBe(6);

    hashmap.remove('Rene')
    expect(hashmap.keys()).toEqual(expect.arrayContaining(
      ['Fred Mark', 'Christian', 'Ervin', 'Joshua', 'Charles']
    ))
    expect(hashmap.length()).toBe(5);
  })

  it('Hash map can return all values in a array', () => {

    const hashmap = new HashMap();
    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');
    hashmap.set('Joshua', 'Arpon');
    hashmap.set('Charles', 'Derion');
    hashmap.set('Rene', 'Nitura');

    expect(hashmap.values()).toEqual(expect.arrayContaining(
      ['Baldeviso', 'Bardalo', 'Rinos', 'Arpon', 'Derion', 'Nitura']
    ));
    expect(hashmap.length()).toBe(6);

    hashmap.remove('Rene')
    expect(hashmap.values()).toEqual(expect.arrayContaining(
      ['Baldeviso', 'Bardalo', 'Rinos', 'Arpon', 'Derion']
    ))
    expect(hashmap.length()).toBe(5);

  })

  it('Hash map can return all entries/ key value pair [key, value] in a array', () => {

    const hashmap = new HashMap();
    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');
    hashmap.set('Joshua', 'Arpon');
    hashmap.set('Charles', 'Derion');
    hashmap.set('Rene', 'Nitura');

    expect(hashmap.entries()).toEqual(expect.arrayContaining(
      [ expect.arrayContaining(['Fred Mark', 'Baldeviso']), 
        expect.arrayContaining(['Christian', 'Bardalo']),
        expect.arrayContaining(['Ervin', 'Rinos']),
        expect.arrayContaining(['Joshua', 'Arpon']),
        expect.arrayContaining(['Charles', 'Derion']),
        expect.arrayContaining(['Rene', 'Nitura']),
      ]
    ));
    expect(hashmap.length()).toBe(6);
  
    hashmap.remove('Rene')
    expect(hashmap.entries()).toEqual(expect.arrayContaining(
      [ expect.arrayContaining(['Fred Mark', 'Baldeviso']), 
        expect.arrayContaining(['Christian', 'Bardalo']),
        expect.arrayContaining(['Ervin', 'Rinos']),
        expect.arrayContaining(['Joshua', 'Arpon']),
        expect.arrayContaining(['Charles', 'Derion']),
      ]
    ));
    expect(hashmap.length()).toBe(5);

  })

  it ('Hash map remembers entries size', () => {
    const hashmap = new HashMap();

    expect(hashmap.entriesSize).toBe(0);

    hashmap.set('Fred Mark', 'Baldeviso');
    hashmap.set('Christian', 'Bardalo');
    hashmap.set('Ervin', 'Rinos');

    expect(hashmap.entriesSize).toBe(3);

    hashmap.set('Joshua', 'Arpon');
    hashmap.set('Charles', 'Derion');
    hashmap.set('Rene', 'Nitura');

    expect(hashmap.entriesSize).toBe(6);

    hashmap.remove('Joshua');
    hashmap.remove('Charles');
    hashmap.remove('Rene');

    expect(hashmap.entriesSize).toBe(3);

    hashmap.clear();

    expect(hashmap.entriesSize).toBe(0);
    expect(hashmap.maxSize).toBe(16);
  })

  it('Hash map can expand max bucket size', () => {
    const test = new HashMap();

    test.set('apple', 'red')
    test.set('banana', 'yellow')
    test.set('carrot', 'orange')
    test.set('dog', 'brown')
    test.set('elephant', 'gray')
    test.set('frog', 'green')
    test.set('grape', 'purple')
    test.set('hat', 'black')
    test.set('ice cream', 'white')
    test.set('jacket', 'blue')
    test.set('kite', 'pink')
    test.set('lion', 'golden')

    expect(test.length()).toBe(test.entriesSize);
    expect(test.maxSize).toBe(16);

    test.set('moon', 'silver')    
    expect(test.maxSize).toBe(32);
    
    test.set('apple', 'green');
    expect(test.length()).toBe(13);

    expect(test.values()).toEqual(expect.arrayContaining(['green', 'yellow', 'orange']));
    expect(test.get('apple')).toMatch('green');
    expect(test.get('moon')).toMatch('silver');
    expect(test.has('dog')).toBeTruthy();
    expect(test.keys()).toEqual(expect.arrayContaining([
    'apple', 'banana', 'carrot', 'dog', 'elephant', 'frog', 'grape', 'hat', 'ice cream', 'jacket', 'kite', 'lion', 'moon'
    ]))
  })

  it ('Hash map can reduce buckets size', () => {
    const test = new HashMap();

    test.set('apple', 'red')
    test.set('banana', 'yellow')
    test.set('carrot', 'orange')
    test.set('dog', 'brown')
    test.set('elephant', 'gray')
    test.set('frog', 'green')
    test.set('grape', 'purple')
    test.set('hat', 'black')
    test.set('ice cream', 'white')
    test.set('jacket', 'blue')
    test.set('kite', 'pink')
    test.set('lion', 'golden')
    test.set('moon', 'silver')

    expect(test.length()).toBe(13);
    expect(test.maxSize).toBe(32);
    expect(test.expandLoadFactor).toBe(24);
    expect(test.reduceLoadFactor).toBe(4);
   
    test.remove('elephant')
    test.remove('frog')
    test.remove('grape')
    test.remove('hat')
    test.remove('ice cream')
    test.remove('jacket')
    test.remove('kite')
    test.remove('lion')
    test.remove('moon')

    expect(test.length()).toBe(4);
    expect(test.maxSize).toBe(16);
    expect(test.expandLoadFactor).toBe(12);
    expect(test.reduceLoadFactor).toBe(2);
    
    test.remove('apple')
    test.remove('banana')
    test.remove('carrot')

    expect(test.length()).toBe(1);
    expect(test.maxSize).toBe(16);
    expect(test.expandLoadFactor).toBe(12);
    expect(test.reduceLoadFactor).toBe(2);
    expect(test.get('dog')).toMatch('brown');
    expect(test.get('carrot')).toBeNull();
    expect(test.has('banana')).toBeFalsy();
  })

})