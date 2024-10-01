import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';

const ColumnHeaders = () => {
  const { colHeader, focusColIndex, selectedOperator, onOperatorPress } = useContext(AppContext);
  const cellSize = 60; // Define the cell size according to your requirement

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onOperatorPress} style={[styles.operatorButton, { width: cellSize, height: cellSize }]}>
        <Text style={styles.operatorText}>{selectedOperator || 'X'}</Text>
      </TouchableOpacity>
      {colHeader.map((col, colIndex) => {
        const isFocused = focusColIndex === colIndex;
        return (
          <View key={colIndex} style={[styles.headerCell, { width: cellSize, height: cellSize }]}>
            <Animated.Text
              style={[
                styles.headerText,
                isFocused && styles.focusedHeaderText,
              ]}
            >
              {col}
            </Animated.Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  operatorButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CADCFC',
    borderWidth: 1,
    borderColor: '#fff',
  },
  operatorText: {
    color: '#00246B',
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CADCFC',
    borderWidth: 1,
    borderColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  focusedHeaderText: {
    color: '#00246B',
    fontSize: 25,
  },
});

export default ColumnHeaders;
