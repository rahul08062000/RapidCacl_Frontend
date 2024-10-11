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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);  // New state
  const [rowHeader, setRowHeader] = useState([]);
  const [colHeader, setColHeader] = useState([]);
  const [timerReset, setTimerReset] = useState(false);

  const [inputMode, setInputMode] = useState('CustomKeyboard');
  const [showScoreboard, setShowScoreboard] = useState(false);

 
  const [finalTime, setFinalTime] = useState(null);

  const [isKeyboardVisible,setIsKeyboardVisible] = useState(true);
  const [keyboardReplacementContent, setKeyboardReplacementContent] = useState(null);


  //Levels logic 
  const [unlockedLevel, setUnlockedLevel] = useState(1); // Default first level is unlocked
  const [selectedLevel, setSelectedLevel] = useState(1); // Selected level state
  const [levels, setLevels] = useState(createLevels()); // List of all levels (200 for example)
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination




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

  function createLevels() {
    const totalLevels = 200;
    const levelsArr = [];
    for (let i = 1; i <= totalLevels; i++) {
      levelsArr.push({
        id: i,
        stars: 0, // Default stars (0 to 3)
        unlocked: i === 1, // Only first level is unlocked initially
      });
    }
    return levelsArr;
  }

  // const unlockNextLevel = (currentLevelId, stars) => {
  //   setLevels(prevLevels =>
  //     prevLevels.map(level => {
  //       if (level.id === currentLevelId) {
  //         return { ...level, stars: Math.min(stars, 3) }; // Update stars
  //       }
  //       if (level.id === currentLevelId + 1) {
  //         return { ...level, unlocked: true }; // Unlock next level
  //       }
  //       return level;
  //     })
  //   );
  //   setUnlockedLevel(currentLevelId + 1);
  // };

  const handleNextPage = () => {
    if ((currentPage + 1) * 15 < levels.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Function to handle previous page of levels
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const generateGuessOptions = useCallback((expectedValue) => {
    let options = [expectedValue];
    const expectedLength = expectedValue.toString().length;
  
    while (options.length < 6) {
      // Generate random numbers and ensure they have the same length as the expected value
      let randomOption;
      do {
        randomOption = Math.floor(Math.random() * Math.pow(10, expectedLength));
      } while (randomOption.toString().length !== expectedLength || options.includes(randomOption));
  
      options.push(randomOption);
    }
  
    // Shuffle the options randomly before returning
    return options.sort(() => Math.random() - 0.5);
  }, []);
  

  const handleInputChange = useCallback((rowIndex, colIndex, value) => {
    console.log("Inside")
    const cellKey = `${rowIndex},${colIndex}`;
    const expectedValueLength = expectedValues[cellKey]?.toString().length || 0;
  
    setInputValues((prevValues) => {
      const newValues = { ...prevValues, [cellKey]: value };
      
      // Mark the cell as visited
      setVisitedCells((prev) => new Set(prev).add(cellKey));
  
      // Check if the input matches the expected value length before moving to next cell
      if (value.length === expectedValueLength) {
        setTimeout(() => {
          console.log("Inside TimeOut")
          switchToRandomUnvisitedCell(); // Move to the next unvisited cell after a delay
        }, 20);
      }
  
      checkAllCellsFilled(newValues); // Ensure all cells are checked if filled
      return newValues;
    });
  }, [expectedValues, switchToRandomUnvisitedCell, setVisitedCells]);
  

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

     // Calculate accuracy
  const totalCells = rowHeader.length * colHeader.length;
  const correctCount = newCorrectCells.size;
  const accuracy = (correctCount / totalCells) * 100;

  // Unlock next level if accuracy is greater than or equal to 70%
  const accuracyThreshold = 70; // You can adjust this threshold as needed
  if (accuracy >= accuracyThreshold && selectedLevel === unlockedLevel ) {
    unlockNextLevel(); // Custom function to unlock the next level
  }


    setIsSubmitted(true);
  }, [expectedValues, inputValues]);

  const unlockNextLevel = useCallback(() => {
    setUnlockedLevel((prevUnlockedLevel) => {
      if (prevUnlockedLevel < 200) { // Assuming you have 200 levels
        return prevUnlockedLevel + 1;
      }
      return prevUnlockedLevel;
    });
  }, []);
  

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

//   const generateRandomHeaders = useCallback((level) => {
//     let size = 6;
//     let operator = '+';
//     let rowMin = 0;
//     let rowMax = 9;
//     let colMin = 0;
//     let colMax = 9;

//     // Determine the grid size, operator, and header ranges based on the level
//     if (level >= 1 && level <= 3) {
//         size = 6;
//         operator = '+';
//         if (level === 1) {
//             rowMin = 0;
//             rowMax = 9;
//             colMin = 0;
//             colMax = 9;
//         } else if (level === 2) {
//             rowMin = 0;
//             rowMax = 49;
//             colMin = 0;
//             colMax = 49;
//         } else if (level === 3) {
//             rowMin = 50;
//             rowMax = 99;
//             colMin = 50;
//             colMax = 99;
//         }
//     } else if (level >= 4 && level <= 6) {
//         size = 7;
//         operator = '+';
//         if (level === 4) {
//             rowMin = 0;
//             rowMax = 9;
//             colMin = 0;
//             colMax = 9;
//         } else if (level === 5) {
//             rowMin = 0;
//             rowMax = 49;
//             colMin = 0;
//             colMax = 49;
//         } else if (level === 6) {
//             rowMin = 50;
//             rowMax = 99;
//             colMin = 50;
//             colMax = 99;
//         }
//     } else if (level >= 7 && level <= 9) {
//         size = 8;
//         operator = '+';
//         if (level === 7) {
//             rowMin = 0;
//             rowMax = 9;
//             colMin = 0;
//             colMax = 9;
//         } else if (level === 8) {
//             rowMin = 0;
//             rowMax = 49;
//             colMin = 0;
//             colMax = 49;
//         } else if (level === 9) {
//             rowMin = 50;
//             rowMax = 99;
//             colMin = 50;
//             colMax = 99;
//         }
//     } else if (level >= 10 && level <= 12) {
//         size = 9;
//         operator = '+';
//         if (level === 10) {
//             rowMin = 0;
//             rowMax = 9;
//             colMin = 0;
//             colMax = 9;
//         } else if (level === 11) {
//             rowMin = 0;
//             rowMax = 49;
//             colMin = 0;
//             colMax = 49;
//         } else if (level === 12) {
//             rowMin = 50;
//             rowMax = 99;
//             colMin = 50;
//             colMax = 99;
//         }
//     } else if (level >= 13 && level <= 15) {
//         size = 10;
//         operator = '+';
//         if (level === 13) {
//             rowMin = 0;
//             rowMax = 9;
//             colMin = 0;
//             colMax = 9;
//         } else if (level === 14) {
//             rowMin = 0;
//             rowMax = 49;
//             colMin = 0;
//             colMax = 49;
//         } else if (level === 15) {
//             rowMin = 50;
//             rowMax = 99;
//             colMin = 50;
//             colMax = 99;
//         }
//     }

//     // Modify for the next 15 levels with operator 'X'
//     if (level >= 16) {
//         operator = 'X'; // Set to multiplication operator for levels 16+
//         level = level - 15; // Subtract 15 to follow the same logic for the next set
//         generateRandomHeaders(level);
//     }

//     // Update state with the new grid size, operator, rowHeader, and colHeader
//     setGridSize(size);
//     setSelectedOperator(operator);

//     const randomRowHeader = Array.from({ length: size }, () => Math.floor(Math.random() * (rowMax - rowMin + 1)) + rowMin);
//     const randomColHeader = Array.from({ length: size }, () => Math.floor(Math.random() * (colMax - colMin + 1)) + colMin);

//     setRowHeader(randomRowHeader);
//     setColHeader(randomColHeader);
// }, [setGridSize, setSelectedOperator, setRowHeader, setColHeader]);


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
    setIsFormVisible(false);
    setIsGameStarted(false)
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
        setFinalTime,
        isKeyboardVisible,
        setIsKeyboardVisible,
        keyboardReplacementContent, 
        setKeyboardReplacementContent,
        isGameStarted,
        setIsGameStarted,
        //levels state

        levels,
        unlockedLevel,
        selectedLevel,
        setSelectedLevel,
        unlockNextLevel,
        currentPage,
        handleNextPage,
        handlePrevPage,
        generateRandomHeaders
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
