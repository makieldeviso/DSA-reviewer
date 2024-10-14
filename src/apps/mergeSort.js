const merge = function (leftHalf, rightHalf) {
 
  const mergedArray = [];
  while(leftHalf.length && rightHalf.length) {

    if (leftHalf[0] < rightHalf[0]) {
      mergedArray.push(leftHalf.shift())
    } else {
      mergedArray.push(rightHalf.shift())
    }
  }

  return ([...mergedArray, ...leftHalf, ...rightHalf]);
}

const split = function (array) {
  
  if (array.length <= 1) {
    return array
  }

  const midPointIndex = Math.floor(array.length / 2);
  const leftHalf = array.slice(0, midPointIndex);
  const rightHalf = array.slice(midPointIndex);

  return merge(split(leftHalf), split(rightHalf))
}


const mergeSort = function (unorderedArr) {

  return split(unorderedArr);
}

const mergeSortResults = function () {

}

export default mergeSortResults
export {mergeSort}