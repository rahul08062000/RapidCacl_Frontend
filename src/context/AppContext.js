import React, { createContext, useState, useEffect,useRef } from 'react';

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

  const [time, setTime] = useState(0); // Timer state
  const timerRef = useRef(null); // Timer interval reference

  useEffect(() => {
    if (!isFormVisible && !isSubmitted) {
      startTimer();
    }
    return () => stopTimer();
  }, [isFormVisible, isSubmitted]);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
    startTimer();
  };


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

  

  // useEffect(() => {
  //   let interval;
  //   if (isTimerRunning) {
  //     interval = setInterval(() => {
  //       setTimer((prevTime) => prevTime + 1);
  //     }, 1000);
  //   } else if (!isTimerRunning && timer !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval); // Clean up timer on unmount
  // }, [isTimerRunning, timer]);

   // Function to generate six options, one of which is the correct answer
   const generateGuessOptions = (expectedValue) => {
    let options = [expectedValue]; // Include the correct answer
    while (options.length < 6) {
      const randomOption = Math.floor(Math.random() * 100); // Generate random numbers as options
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5); // Shuffle the options
  };
  

  const handleInputChange = (rowIndex, colIndex, value) => {
    const key = `${rowIndex},${colIndex}`;
    setInputValues((prevValues) => {
      const newValues = { ...prevValues, [key]: value };
      setVisitedCells((prev) => new Set(prev).add(key)); // Add cell to visited set
      checkAllCellsFilled(newValues);
      return newValues;
    });
  };

  // Check if all cells are filled and enable submit button
  const checkAllCellsFilled = (newInputValues) => {
    const totalCells = rowHeader.length * colHeader.length;
    if (Object.keys(newInputValues).length === totalCells) {
      setIsSubmitEnabled(true); // Enable submit button
      // setIsTimerRunning(false); 
    }
  };

  // Auto-submit the grid and validate cells
  const handleAutoSubmit = () => {
    let newCorrectCells = new Set();
    let newIncorrectCells = new Set();

    Object.keys(expectedValues).forEach((key) => {
      if (parseFloat(inputValues[key]) === parseFloat(expectedValues[key])) { // Use parseFloat for decimal comparison
        newCorrectCells.add(key);
      } else {
        newIncorrectCells.add(key);
      }
    });

    setCorrectCells(newCorrectCells);
    setIncorrectCells(newIncorrectCells);
    setIsSubmitted(true); // Mark as submitted
    //setIsTimerRunning(false);
  };

  // Generate random row and column headers based on difficulty
  const generateRandomHeaders = () => {
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
  };

  // Calculate expected values based on the selected operator
  const calculateExpectedValues = () => {
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
  };

  const switchToRandomUnvisitedCell = () => {
    const totalCells = rowHeader.length * colHeader.length;
    const visitedCellsArray = Array.from(visitedCells);

    if (visitedCellsArray.length === totalCells) {
      setIsSubmitEnabled(true);
      setFocusRowIndex(null);
      setFocusColIndex(null);
      return;
    }

    let randomRow, randomCol, randomKey;
    do {
      randomRow = Math.floor(Math.random() * rowHeader.length);
      randomCol = Math.floor(Math.random() * colHeader.length);
      randomKey = `${randomRow},${randomCol}`;
    } while (visitedCells.has(randomKey));

    setFocusRowIndex(randomRow);
    setFocusColIndex(randomCol);
  };

  const handleRestart = () => {
    setInputValues({});
    setVisitedCells(new Set());
    setCorrectCells(new Set());
    setIncorrectCells(new Set());
    setIsSubmitted(false);
    setIsSubmitEnabled(false);
    setFocusRowIndex(0); 
    setFocusColIndex(0);
    setShowScoreboard(false);
    // setTimer(0);
    // setIsTimerRunning(true); 
    setTimerReset(true);
    generateRandomHeaders(); 
    resetTimer();
  };

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
        handleAutoSubmit, // Pass the handleAutoSubmit function here
        handleRestart,
        timerReset,
        inputMode,
        setInputMode, 
        generateGuessOptions,
        showScoreboard,
        setShowScoreboard,
        setTimerReset,
        time,
        setTime,
        startTimer,
        stopTimer,
        resetTimer, 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
