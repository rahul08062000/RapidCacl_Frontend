import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gridSize, setGridSize] = useState(6);
  const [difficulty, setDifficulty] = useState('Easy');
  const [selectedOperator, setSelectedOperator] = useState('X');
  const [inputValues, setInputValues] = useState({});
  const [expectedValues, setExpectedValues] = useState({});
  const [focusRowIndex, setFocusRowIndex] = useState(0);
  const [focusColIndex, setFocusColIndex] = useState(0);
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [correctCells, setCorrectCells] = useState(new Set());
  const [incorrectCells, setIncorrectCells] = useState(new Set());
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const [rowHeader, setRowHeader] = useState([]);
  const [colHeader, setColHeader] = useState([]);

  const [timerReset, setTimerReset] = useState(false);

  const [inputMode, setInputMode] = useState('CustomKeyboard');
  const [showScoreboard, setShowScoreboard] = useState(false);

 
  const [finalTime, setFinalTime] = useState(null);


  useEffect(() => {
    if (!isFormVisible) {
      generateRandomHeaders();
    }
  }, [gridSize, difficulty, isFormVisible]);

  useEffect(() => {
    if (rowHeader.length && colHeader.length) {
      calculateExpectedValues();
    }
  }, [rowHeader, colHeader, selectedOperator]);

  const generateGuessOptions = useCallback((expectedValue) => {
    let options = [expectedValue];
    while (options.length < 6) {
      const randomOption = Math.floor(Math.random() * 100);
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }, []);

  const handleInputChange = useCallback((rowIndex, colIndex, value) => {
    const key = `${rowIndex},${colIndex}`;
    setInputValues((prevValues) => {
      const newValues = { ...prevValues, [key]: value };
      setVisitedCells((prev) => new Set(prev).add(key));
      checkAllCellsFilled(newValues);
      return newValues;
    });
  }, [inputValues]);

  const checkAllCellsFilled = useCallback((newInputValues) => {
    const totalCells = rowHeader.length * colHeader.length;
    if (Object.keys(newInputValues).length === totalCells) {
      setIsSubmitEnabled(true);
    }
  }, [rowHeader, colHeader]);

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

  const generateRandomHeaders = useCallback(() => {
    const size = gridSize;
    let randomRowHeader = [];
    let randomColHeader = [];

    if (difficulty === 'Easy') {
      randomRowHeader = Array.from({ length: size }, () => Math.floor(Math.random() * 9) + 1);
      randomColHeader = Array.from({ length: size }, () => Math.floor(Math.random() * 9) + 1);
    } else if (difficulty === 'Medium') {
      const isRowTwoDigit = Math.random() < 0.5;
      randomRowHeader = Array.from({ length: size }, () =>
        isRowTwoDigit ? Math.floor(Math.random() * 90) + 10 : Math.floor(Math.random() * 9) + 1
      );
      randomColHeader = Array.from({ length: size }, () =>
        isRowTwoDigit ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 90) + 10
      );
    } else if (difficulty === 'Hard') {
      randomRowHeader = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
      randomColHeader = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    }

    setRowHeader(randomRowHeader);
    setColHeader(randomColHeader);
  }, [difficulty, gridSize]);

  const calculateExpectedValues = useCallback(() => {
    let calculatedValues = {};
    for (let row = 0; row < rowHeader.length; row++) {
      for (let col = 0; col < colHeader.length; col++) {
        const key = `${row},${col}`;
        let value;
        switch (selectedOperator) {
          case '+':
            value = rowHeader[row] + colHeader[col];
            break;
          case '-':
            value = rowHeader[row] - colHeader[col];
            break;
          case 'X':
            value = rowHeader[row] * colHeader[col];
            break;
          case '/':
            value = colHeader[col] !== 0 ? parseFloat((rowHeader[row] / colHeader[col]).toFixed(2)) : 'NaN';
            break;
          default:
            value = '';
        }
        calculatedValues[key] = value;
      }
    }
    setExpectedValues(calculatedValues);
  }, [rowHeader, colHeader, selectedOperator]);

  const switchToRandomUnvisitedCell = useCallback(() => {
    const totalCells = rowHeader.length * colHeader.length;
  
    // If all cells are visited, enable submit and stop
    if (visitedCells.size === totalCells) {
      setIsSubmitEnabled(true);
      setFocusRowIndex(null);
      setFocusColIndex(null);
      return;
    }
  
    let randomIndex = Math.floor(Math.random() * totalCells); 
    let cellFound = false;
  
    // Iterate over the grid in a single loop
    for (let i = 0; i < totalCells; i++) {
      // Calculate the row and col index using the current index
      const currentIndex = (randomIndex + i) % totalCells; 
      const rowIndex = Math.floor(currentIndex / colHeader.length);
      const colIndex = currentIndex % colHeader.length;
      const key = `${rowIndex},${colIndex}`;
  
      if (!visitedCells.has(key)) {
        setFocusRowIndex(rowIndex);
        setFocusColIndex(colIndex);
        cellFound = true;
        break;
      }
    }
    if (!cellFound) {
      setFocusRowIndex(null);
      setFocusColIndex(null);
      setIsSubmitEnabled(true);
    }
  }, [visitedCells, rowHeader, colHeader]);
  

  const handleRestart =() => {
    setInputValues({});
    setVisitedCells(new Set());
    setCorrectCells(new Set());
    setIncorrectCells(new Set());
    setIsSubmitted(false);
    setIsSubmitEnabled(false);
    setFocusRowIndex(0);
    setFocusColIndex(0);
    setShowScoreboard(false);
    setTimerReset(true);
    generateRandomHeaders();
  }

  return (
    <AppContext.Provider
      value={{
        gridSize,
        setGridSize,
        difficulty,
        setDifficulty,
        selectedOperator,
        setSelectedOperator,
        inputValues,
        setInputValues,
        expectedValues,
        setExpectedValues,
        focusRowIndex,
        setFocusRowIndex,
        focusColIndex,
        setFocusColIndex,
        visitedCells,
        setVisitedCells,
        correctCells,
        setCorrectCells,
        incorrectCells,
        setIncorrectCells,
        isFormVisible,
        setIsFormVisible,
        isSubmitted,
        setIsSubmitted,
        isSubmitEnabled,
        setIsSubmitEnabled,
        rowHeader,
        colHeader,
        switchToRandomUnvisitedCell,
        handleInputChange,
        handleAutoSubmit, 
        handleRestart,
        timerReset,
        inputMode,
        setInputMode, 
        generateGuessOptions,
        showScoreboard,
        setShowScoreboard,
        finalTime,
        setFinalTime
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
