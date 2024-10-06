import { useCallback } from 'react';

export const useAutoSubmit = (expectedValues, inputValues, setCorrectCells, setIncorrectCells, setIsSubmitted) => {
  const handleAutoSubmit = useCallback(() => {
    let newCorrectCells = new Set();
    let newIncorrectCells = new Set();

    Object.keys(expectedValues).forEach((key) => {
      if (parseFloat(inputValues[key]) === parseFloat(expectedValues[key])) {
        newCorrectCells.add(key);
      } else {
        newIncorrectCells.add(key);
      }
    });

    setCorrectCells(newCorrectCells);
    setIncorrectCells(newIncorrectCells);
    setIsSubmitted(true);
  }, [expectedValues, inputValues]);

  return { handleAutoSubmit };
};
