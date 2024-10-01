import React, { useContext } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { AppContext } from '../../context/AppContext';
import Cell from './Cell';

const GridRow = ({ rowIndex, cellSize, shiftAnimation }) => {
  const {
    colHeader,
    inputValues,
    focusRowIndex,
    focusColIndex,
    correctCells,
    incorrectCells,
    setFocusRowIndex,
    setFocusColIndex,
  } = useContext(AppContext);

  return (
    <Animated.View
      style={[
        styles.row,
        {
          transform: [{ translateX: shiftAnimation }], // Apply shift animation to each row
        },
      ]}
    >
      {colHeader.map((_, colIndex) => {
        const cellKey = `${rowIndex},${colIndex}`;
        const isFocused = focusRowIndex === rowIndex && focusColIndex === colIndex;
        const isCorrect = correctCells.has(cellKey);
        const isIncorrect = incorrectCells.has(cellKey);
        const zIndexValue = isFocused ? 3 : 0;


        return (
          <View key={colIndex} style={{ zIndex: zIndexValue }}>
          <Cell
            key={colIndex}
            rowIndex={rowIndex}
            colIndex={colIndex}
            value={inputValues[cellKey] || ''}
            isFocused={isFocused}
            isCorrect={isCorrect}
            isIncorrect={isIncorrect}
            cellSize={cellSize}
            setFocusRowIndex={setFocusRowIndex}
            setFocusColIndex={setFocusColIndex}
          />
          </View>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // overflow: 'visible',  // Ensure the row doesn't clip child elements
    // zIndex: 0, 
  },
});

export default GridRow;
