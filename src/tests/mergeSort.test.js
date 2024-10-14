import { describe, expect, it } from "vitest";
import { mergeSort } from "../apps/mergeSort";

describe('Merge Sort', () => {
  
  it('test_1', () => {
    const testArray = [5, 6, 20, 3 , 1 , 0 , 33, 1, 5]
    expect(mergeSort(testArray)).toEqual([0, 1, 1, 3, 5, 5, 6, 20, 33]);
    expect(mergeSort(testArray)).toHaveLength(9)
  })

  it('test_2', () => {
    const testArray = [3, 2, 1, 13, 8, 5, 0, 1]
    expect(mergeSort(testArray)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
    expect(mergeSort(testArray)).toHaveLength(8)
  })

  it('test_3', () => {
    const testArray = [105, 79, 100, 110]
    expect(mergeSort(testArray)).toEqual([79, 100, 105, 110]);
    expect(mergeSort(testArray)).toHaveLength(4)
  })

})