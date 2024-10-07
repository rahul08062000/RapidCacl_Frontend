import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

const GuessModeKeyboard = () => {
  const { generateGuessOptions, inputValues, expectedValues, focusRowIndex, focusColIndex, handleInputChange, switchToRandomUnvisitedCell,rowHeader,colHeader, visitedCells, handleAutoSubmit,isKeyboardVisible,
    keyboardReplacementContent } = useContext(AppContext);
  const [guessOptions, setGuessOptions] = useState([]);

  useEffect(() => {
    if (focusRowIndex !== null && focusColIndex !== null) {
      const key = `${focusRowIndex},${focusColIndex}`;
      const expectedValue = expectedValues[key];
      const options = generateGuessOptions(expectedValue);
      setGuessOptions(options);
    }
  }, [focusRowIndex, focusColIndex]);

  const handleGuessSelection = (guess) => {
    if (focusRowIndex !== null && focusColIndex !== null) {
      handleInputChange(focusRowIndex, focusColIndex, guess); // Fill the value in the grid cell
  
      // Check if all cells have been visited
      const totalCells = rowHeader.length * colHeader.length;
      const visitedCellsArray = Array.from(visitedCells);
      
      if (visitedCellsArray.length === totalCells) {
        handleAutoSubmit(); // Auto-submit if all cells are filled
      } else {
        switchToRandomUnvisitedCell(); // Move to the next unvisited cell
      }
    }
  };

  if (!isKeyboardVisible) {
    return (
      <View style={styles.keyboardReplacement}>
        {keyboardReplacementContent}
      </View>
    );
  }
  

  return (
    <View style={styles.guessModeContainer}>
      {guessOptions.map((option, index) => (
        <TouchableOpacity key={index} style={styles.guessOption} onPress={() => handleGuessSelection(option)}>
          <Text style={styles.guessText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  guessModeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  guessOption: {
    margin: 10,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  guessText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default GuessModeKeyboard;
