// import React, { useContext, useEffect, useState, useCallback } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { AppContext } from '../context/AppContext';

// const GuessModeKeyboard = () => {
//   const { 
//     generateGuessOptions, 
//     inputValues, 
//     expectedValues, 
//     focusRowIndex, 
//     focusColIndex, 
//     setInputValues, 
//     setVisitedCells, 
//     switchToRandomUnvisitedCell,
//     rowHeader, 
//     colHeader, 
//     visitedCells, 
//     handleAutoSubmit,
//     setShowScoreboard,
//     setFocusColIndex,
//     setFocusRowIndex
//   } = useContext(AppContext);
  
//   const [guessOptions, setGuessOptions] = useState([]);

//   // Generate guess options when focus row or column changes
//   useEffect(() => {
//     if (focusRowIndex !== null && focusColIndex !== null) {
//       const cellKey = `${focusRowIndex},${focusColIndex}`;
//       const expectedValue = expectedValues[cellKey];
//       const options = generateGuessOptions(expectedValue);
//       setGuessOptions(options);
//     }
//   }, [focusRowIndex, focusColIndex, expectedValues, generateGuessOptions]);

//   // Auto-submit if all cells are visited
//   useEffect(() => {
//     const totalCells = rowHeader.length * colHeader.length;
//     const visitedCellsArray = Array.from(visitedCells);
  
//     if (visitedCellsArray.length === totalCells) {
//       setFocusColIndex(null);
//       setFocusRowIndex(null);
//       handleAutoSubmit(); // Auto-submit if all cells are filled
//     }
//   }, [visitedCells, rowHeader, colHeader, setFocusColIndex, setFocusRowIndex, handleAutoSubmit]);

//   // Automatically switch to the next unvisited cell when the input is completed
//   useEffect(() => {
//     const cellKey = `${focusRowIndex},${focusColIndex}`;
//     const currentCellValue = inputValues[cellKey] || '';
//     const expectedValueLength = expectedValues[cellKey]?.toString().length || 0;

//     if (currentCellValue.length >= expectedValueLength) {
//       setTimeout(() => {
//         switchToRandomUnvisitedCell();
//       }, 20);
//     }
//   }, [inputValues]);

//   // Handle input change
//   const handleInputChange = useCallback((text) => {
//     const cellKey = `${focusRowIndex},${focusColIndex}`;
//     let currentCellValue = inputValues[cellKey] || '';
//     const expectedValueLength = expectedValues[cellKey]?.toString().length || 0;
  
//     if (text === 'C') {
//       currentCellValue = '';
//     } else if (text === 'del') {
//       currentCellValue = currentCellValue.slice(0, -1);
//     } else {
//       currentCellValue += text;
//     }
  
//     // Update input values and mark the cell as visited
//     setInputValues((prevValues) => ({
//       ...prevValues,
//       [cellKey]: currentCellValue,
//     }));
//     setVisitedCells((prev) => new Set(prev).add(cellKey));
//   }, [focusRowIndex, focusColIndex, inputValues, expectedValues, setInputValues, setVisitedCells]);

//   // Handle guess selection
//   const handleGuessSelection = (guess) => {
//     if (focusRowIndex !== null && focusColIndex !== null) {
//       handleInputChange(guess);
//     }
//   };

//   // Show the scoreboard when all cells are filled
//   const handleViewScoreboard = () => {
//     setShowScoreboard(true);
//   };

//   // Check if all cells are visited and display the "View Scoreboard" button if true
//   const totalCells = rowHeader.length * colHeader.length;
//   const visitedCellsArray = Array.from(visitedCells);

//   if (visitedCellsArray.length === totalCells) {
//     return (
//       <TouchableOpacity
//         style={[styles.submitButton, styles.viewScoreboardButton]}
//         onPress={handleViewScoreboard}
//       >
//         <Text style={styles.submitButtonText}>View Scoreboard</Text>
//       </TouchableOpacity>
//     );
//   }

//   // Render the guess options
//   return (
//     <View style={styles.guessModeContainer}>
//       {guessOptions.map((option, index) => (
//         <TouchableOpacity 
//           key={index} 
//           style={styles.guessOption} 
//           onPress={() => handleGuessSelection(option)}
//         >
//           <Text style={styles.guessText}>{option}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// // Styles for the GuessModeKeyboard
// const styles = StyleSheet.create({
//   guessModeContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   guessOption: {
//     margin: 10,
//     padding: 15,
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//   },
//   guessText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   viewScoreboardButton: {
//     backgroundColor: '#29387b',  
//     paddingVertical: 12,         
//     paddingHorizontal: 25,       
//     borderRadius: 8,             
//     justifyContent: 'center',    
//     alignItems: 'center',        
//     width: '90%',                
//     marginHorizontal: '5%',     
//     shadowColor: '#000',         
//     shadowOffset: { width: 1, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,                
//   },
//   submitButtonText: {
//     color: '#fff',               
//     fontSize: 18,                
//     fontWeight: '600',           
//     textTransform: 'uppercase',  
//   },
// });

// export default GuessModeKeyboard;


import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { AppContext } from '../context/AppContext';

const GuessModeKeyboard = () => {
  const { 
    generateGuessOptions, 
    inputValues, 
    expectedValues, 
    focusRowIndex, 
    focusColIndex, 
    setInputValues, 
    setVisitedCells, 
    switchToRandomUnvisitedCell,
    rowHeader, 
    colHeader, 
    visitedCells, 
    handleAutoSubmit,
    setShowScoreboard,
    setFocusColIndex,
    setFocusRowIndex
  } = useContext(AppContext);
  
  const [guessOptions, setGuessOptions] = useState([]);
  const { height: screenHeight } = Dimensions.get('window');

  useEffect(() => {
    if (focusRowIndex !== null && focusColIndex !== null) {
      const key = `${focusRowIndex},${focusColIndex}`;
      const expectedValue = expectedValues[key];
      const options = generateGuessOptions(expectedValue);
      setGuessOptions(options);
    }
  }, [focusRowIndex, focusColIndex, expectedValues]);

  useEffect(() => {
    const totalCells = rowHeader.length * colHeader.length;
    const visitedCellsArray = Array.from(visitedCells);
  
    if (visitedCellsArray.length === totalCells) {
      setFocusColIndex(null);
      setFocusRowIndex(null);
      handleAutoSubmit(); // Auto-submit if all cells are filled
    }
  }, [visitedCells, rowHeader, colHeader, setFocusColIndex, setFocusRowIndex, handleAutoSubmit]);

  useEffect(()=>{
    const cellKey = `${focusRowIndex},${focusColIndex}`;
    let currentCellValue = inputValues[cellKey] || '';
    const expectedValueLength = expectedValues[cellKey]?.toString().length || 0;
    // console.log("currentCellValue.length:",currentCellValue.length)
    // console.log("expectedValueLength.length:",expectedValueLength)
    console.log("input value:",inputValues[cellKey],"expectedValues value:",expectedValues[cellKey]);


    if (currentCellValue.length === expectedValueLength) {
      // console.log("expectedValues value:",expectedValues[cellKey]);
      switchToRandomUnvisitedCell();
      // setTimeout(() => {
      //   switchToRandomUnvisitedCell();
      // }, 20);
    }

  },[inputValues])
  

  // Unified handleInputChange similar to CustomKeyboard
  const handleInputChange = useCallback((text) => {
    const cellKey = `${focusRowIndex},${focusColIndex}`;
    let currentCellValue = inputValues[cellKey] || '';
    const expectedValueLength = expectedValues[cellKey]?.toString().length || 0;

    if (currentCellValue.length >= expectedValueLength) {
      return; // Exit early if input exceeds the expected length
    }
  
    if (text === 'C') {
      currentCellValue = '';
    } else if (text === 'del') {
      currentCellValue = currentCellValue.slice(0, -1);
    } else {
      currentCellValue += text;
    }

    if (currentCellValue.length < expectedValueLength) {
      currentCellValue += text;
    }
  
    // Update input values and mark the cell as visited
    setInputValues((prevValues) => ({
      ...prevValues,
      [cellKey]: currentCellValue,
    }));
  
    setVisitedCells((prev) => new Set(prev).add(cellKey));
  
    // Once input is updated, if the current input is fully filled or exceeds the length, switch to the next cell
    // if (currentCellValue.length >= expectedValueLength) {
    //   setTimeout(() => {
    //     switchToRandomUnvisitedCell();
    //   }, 20);
    // }
  }, [focusRowIndex, focusColIndex, inputValues, expectedValues, setInputValues, setVisitedCells, switchToRandomUnvisitedCell]);
  
  const handleGuessSelection = (guess) => {
    if (focusRowIndex !== null && focusColIndex !== null) {
      handleInputChange(guess);

      // Check if all cells have been visited
      const totalCells = rowHeader.length * colHeader.length;
      const visitedCellsArray = Array.from(visitedCells);
      
      // if (visitedCellsArray.length === totalCells) {
      //   setFocusColIndex(null);
      //   setFocusRowIndex(null);
      //   handleAutoSubmit(); // Auto-submit if all cells are filled
      // } else {
      //   switchToRandomUnvisitedCell(); // Move to the next unvisited cell
      // }
    }
  };

  const handleViewScoreboard = () => {
    setShowScoreboard(true);
  };

  // Check if all cells are visited and display the "View Scoreboard" button if true
  const totalCells = rowHeader.length * colHeader.length;
  const visitedCellsArray = Array.from(visitedCells);

  if (visitedCellsArray.length === totalCells) {
    return (
      <TouchableOpacity
        style={[styles.submitButton, styles.viewScoreboardButton]}
        onPress={handleViewScoreboard}
      >
        <Text style={styles.submitButtonText}>View Scoreboard</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.guessModeContainer}>
  {/* First row with 3 options */}
  <View style={styles.optionRow}>
    {guessOptions.slice(0, 3).map((option, index) => (
      <TouchableOpacity 
        key={index} 
        style={styles.circleButton} 
        onPress={() => handleGuessSelection(option)}
      >
        <Text style={styles.circleButtonText}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Second row with the next 3 options */}
  <View style={styles.optionRow}>
    {guessOptions.slice(3, 6).map((option, index) => (
      <TouchableOpacity 
        key={index} 
        style={styles.circleButton} 
        onPress={() => handleGuessSelection(option)}
      >
        <Text style={styles.circleButtonText}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
</View>

  );
};

const styles = StyleSheet.create({
  guessModeContainer: {
    // height:screenHeight *0.30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  guessModeContainer: {
    flex:1,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    padding: 10,
  },
  optionRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginVertical: 10, // Add vertical margin between rows
  },
  circleButton: {
    width: 60, 
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  circleButtonText: {
    fontSize: 12, 
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewScoreboardButton: {
    backgroundColor: '#29387b',  
    paddingVertical: 12,         
    paddingHorizontal: 25,       
    borderRadius: 8,             
    justifyContent: 'center',    
    alignItems: 'center',        
    width: '90%',                
    marginHorizontal: '5%',     
    shadowColor: '#000',         
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,                
  },
  submitButtonText: {
    color: '#fff',               
    fontSize: 18,                
    fontWeight: '600',           
    textTransform: 'uppercase',  
  },
});

export default GuessModeKeyboard;

