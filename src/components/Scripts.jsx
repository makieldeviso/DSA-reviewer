import { useEffect } from "react";
import linkedListAnswers from "../apps/linkedList";
import mergeSortResults from "../apps/mergeSort";
import hashMapResults from "../apps/hashMap";

const Scripts = function () {

  useEffect(() => {
    linkedListAnswers();
    mergeSortResults();
    hashMapResults();
  })

  return (
    <>
    </>
  )
}

export default Scripts