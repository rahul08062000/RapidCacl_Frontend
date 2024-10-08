import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';

const Cell = ({
  rowIndex,
  colIndex,
  value,
  isFocused,
  isCorrect,
  isIncorrect,
  cellSize,
  setFocusRowIndex,
  setFocusColIndex,
  handleInputChange, // Accept handleInputChange as a prop
  isLastColumn,
  isLastRow
}) => {
  const fontSize = cellSize * 0.4; // Dynamic font size based on cell size
  const [cellValue, setCellValue] = useState(value);
  const zIndexValue = isFocused ? 3 : 0;

  const animatedSize = useRef(new Animated.Value(cellSize)).current;

  // {console.log("is Last Row", isLastRow)}


  const overlayLeftPosition = useRef(new Animated.Value(6)).current;
  const overlayTopPosition = useRef(new Animated.Value(6)).current; 


  useEffect(() => {
    setCellValue(value); // Update cell value if prop changes
  }, [value]);

  useEffect(() => {
    Animated.timing(overlayLeftPosition, {
      toValue: isLastColumn ? -18 : 6,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(overlayTopPosition, {
      toValue: isLastRow ? -18 : 6, 
      duration: 300,
      useNativeDriver: false,
    }).start();

  }, [isLastColumn]);

  //cell size increase Animation 
  

  // const handlePress = () => {
  //   setFocusRowIndex(rowIndex);
  //   setFocusColIndex(colIndex);
  // };

  return (
    <View style={[styles.cellContainer, { width: cellSize, height: cellSize },{ zIndex: zIndexValue }]}>
      <TouchableOpacity
        style={[
          styles.cell,
          isFocused ? styles.focusedCell : null,  // Apply focused style
          isCorrect ? styles.correctCell : null,
          isIncorrect ? styles.incorrectCell : null,
          { width: cellSize, height: cellSize },
          // { zIndex: zIndexValue }
        ]}
        // onPress={handlePress}
      >
        <Text style={[styles.cellText, { fontSize }, isFocused ? styles.focusedText : null]}>
          {cellValue}
        </Text>
      </TouchableOpacity>

      {isFocused && (
        <Animated.View
        style={[styles.overlay, { width: cellSize * 1.2, height: cellSize * 1.2, left: overlayLeftPosition, top: overlayTopPosition }]}
      >
        <Text style={[styles.overlayText, { fontSize: fontSize * 1.4 }]}>{cellValue}</Text>
      </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'visible',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dedfe2',
    // zIndex:-1,
    // overflow:'hidden',
    // overflow: 'visible',
  },
  cellText: {
    color: '#003366',
  },
  focusedCell: {
    backgroundColor: '#FFD700', 
    borderColor: '#FFD700',       
    borderWidth: 0,              
  },
  focusedText: {
    color: '#FFD700', 
    fontWeight: 'bold',
  },
  correctCell: {
    backgroundColor: '#D3F8D3', 
  },
  incorrectCell: {
    backgroundColor: '#D32F2F', 
  },
  overlay: {
    position: 'absolute',
    //top: -6,  
    // left: 6,  
    height: '140%',  
    width: '140%',   
    backgroundColor: '#00246B',  
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,  
    zIndex:5
   
  },
  overlayText: {
    color: '#FFD700', 
    fontWeight: 'bold',
  },
});



export default Cell;
