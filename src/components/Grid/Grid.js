import React, { useContext, useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { AppContext } from '../../context/AppContext';
import ColumnHeaders from './ColumnHeaders'; // Optional component for column headers
import GridRow from './GridRow';

const Grid = () => {
  const { rowHeader, colHeader, focusColIndex, focusRowIndex, selectedOperator, correctCells, incorrectCells, handleInputChange } = useContext(AppContext);
  const blinkAnimation = useRef(new Animated.Value(1)).current;
  const shiftAnimation = useRef(new Animated.Value(0)).current;


  // Restart blinking animation every time focusRowIndex or focusColIndex changes
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [focusRowIndex, focusColIndex]); // Dependency on focusRowIndex and focusColIndex

  // Animate both headers and rows to shift when focus is on the last column
  useEffect(() => {
    if (focusColIndex === colHeader.length - 1) {
      // Shift left when the last column is focused
      Animated.timing(shiftAnimation, {
        toValue: -10, // Shift value (adjust this as needed)
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Reset the shift when not focused on the last column
      Animated.timing(shiftAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [focusColIndex]);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const totalGridSize = Math.max(rowHeader.length, colHeader.length);
  const availableHeight = screenHeight - 200;
  
  // Adjust the cell size by reducing the divisor for a larger grid size
  const scalingFactor = 0.97;  // Scale the size of each cell (Increase for larger width)
  const cellSize = Math.min((screenWidth / (totalGridSize + 1)) * scalingFactor, availableHeight / (totalGridSize + 1));

  const renderOperator = () => (
    <View style={[styles.operatorCell, { width: cellSize, height: cellSize }]}>
      <Text style={styles.operatorText}>{selectedOperator || 'X'}</Text>
    </View>
  );

  const renderColumnHeaders = () => (
    <SafeAreaView>
    <Animated.View
      style={[
        styles.row,
        {
          // transform: [{ translateX: shiftAnimation }], // Apply the shift animation to column headers
        },
      ]}
    >
      {colHeader.map((col, colIndex) => (
        <View key={colIndex} style={[styles.headerCell, { width: cellSize, height: cellSize }]}>
          <Animated.Text
            style={[
              styles.headerText,
              focusColIndex === colIndex && [styles.focusedHeaderText, { opacity: blinkAnimation }],
            ]}
          >
            {col}
          </Animated.Text>
        </View>
      ))}
    </Animated.View>
    </SafeAreaView>
  );

  const renderRows = () =>
    rowHeader.map((row, rowIndex) => {
      // Dynamically set zIndex: higher for focused row
      const dynamicZIndex = focusRowIndex === rowIndex ? 3 : 1;
  
      return (
        <View key={rowIndex} style={[styles.row, { zIndex: dynamicZIndex }]}>
          <View style={[styles.headerCell, { width: cellSize, height: cellSize }]}>
            <Animated.Text
              style={[
                styles.headerText,
                focusRowIndex === rowIndex && [styles.focusedHeaderText, { opacity: blinkAnimation }],
              ]}
            >
              {row}
            </Animated.Text>
          </View>
  
          <GridRow
            rowIndex={rowIndex}
            cellSize={cellSize}
            handleInputChange={handleInputChange} // Pass handleInputChange to GridRow
            correctCells={correctCells}
            incorrectCells={incorrectCells}
            shiftAnimation={shiftAnimation} // Pass the shift animation to GridRow
          />
        </View>
      );
    });
  

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          {/* Operator and Column Headers */}
          <View style={styles.headerContainer}>
            {renderOperator()}
            <View style={styles.columnHeadersContainer}>{renderColumnHeaders()}</View>
          </View>

          {/* Rows with Row Headers and Grid Cells */}
          <View style={styles.rowsContainer}>{renderRows()}</View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start', 
  },
  gridContainer: {
    backgroundColor: '#f0f0f0',
    paddingTop: 0, // Remove top padding to stick to header
    marginTop: 0, // Remove top margin
    alignItems: 'center', // Align items to the top
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align headers to the top left
    alignItems: 'flex-start', // Align headers to the top
    marginBottom: 0, // Remove bottom margin
    marginTop: 0, // Remove top margin
    // overflow: 'hidden', // Ensure that shifted headers are hidden
  },
  columnHeadersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align column headers to the top left
    paddingBottom: 0, // Remove bottom padding
    marginTop: 0, // Remove top margin to ensure it sticks to the header
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align row content to the top left
    marginTop: 0, 
    paddingTop: 0, 
  },
  rowsContainer: {
    marginTop: 0, 
    paddingTop: 0, 
    alignItems: 'flex-start', 
  },
  operatorCell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CADCFC',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 0, // Remove bottom margin
    paddingBottom: 0, // Remove bottom padding
    zIndex:1
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CADCFC',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 0, // Remove bottom margin
    paddingBottom: 0, // Remove bottom padding
    zIndex:1
  },
  headerText: {
    fontWeight: 'bold',
    color: '#003366',
  },
  focusedHeaderText: {
    color: '#00246B',
    fontSize: 25,
  },
  operatorText: {
    color: '#00246B',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Grid;


// import React, { useContext, useRef, useEffect } from 'react';
// import { View, StyleSheet, Text, Animated, Dimensions, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
// import { AppContext } from '../../context/AppContext';
// import GridRow from './GridRow';

// const Grid = () => {
//   const { rowHeader, colHeader, focusColIndex, focusRowIndex, selectedOperator, correctCells, incorrectCells, handleInputChange } = useContext(AppContext);
//   const blinkAnimation = useRef(new Animated.Value(1)).current;
//   const shiftAnimation = useRef(new Animated.Value(0)).current;

//   // Restart blinking animation every time focusRowIndex or focusColIndex changes
//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(blinkAnimation, {
//           toValue: 0.2,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(blinkAnimation, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, [focusRowIndex, focusColIndex]);

//   // Animate both headers and rows to shift when focus is on the last column
//   useEffect(() => {
//     if (focusColIndex === colHeader.length - 1) {
//       Animated.timing(shiftAnimation, {
//         toValue: -10, // Shift value (adjust this as needed)
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(shiftAnimation, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [focusColIndex]);

//   // Dynamically calculate screen size and available height for grid
//   const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
//   const totalGridSize = Math.max(rowHeader.length, colHeader.length);
//   const availableHeight = screenHeight - 200; // Adjust for headers and keyboard

//   const cellSize = Math.min((screenWidth / (totalGridSize + 1)) * 0.95, availableHeight / (totalGridSize + 1));

//   const renderOperator = () => (
//     <View style={[styles.operatorCell, { width: cellSize, height: cellSize }]}>
//       <Text style={styles.operatorText}>{selectedOperator || 'X'}</Text>
//     </View>
//   );

//   const renderColumnHeaders = () => (
//     <Animated.View style={[styles.columnHeadersContainer, { transform: [{ translateX: shiftAnimation }] }]}>
//       {colHeader.map((col, colIndex) => {
//         const isFocused = focusColIndex === colIndex;
//         return (
//           <View key={colIndex} style={[styles.headerCell, { width: cellSize, height: cellSize, zIndex: isFocused ? 3 : 1 }]}>
//             <Animated.Text style={[styles.headerText, isFocused && { opacity: blinkAnimation }]}>
//               {col}
//             </Animated.Text>
//           </View>
//         );
//       })}
//     </Animated.View>
//   );

//   const renderRows = () =>
//     rowHeader.map((row, rowIndex) => {
//       const isFocusedRow = focusRowIndex === rowIndex;
//       return (
//         <View key={rowIndex} style={[styles.row, { zIndex: isFocusedRow ? 3 : 1 }]}>
//           <View style={[styles.headerCell, { width: cellSize, height: cellSize, zIndex: isFocusedRow ? 3 : 1 }]}>
//             <Animated.Text style={[styles.headerText, isFocusedRow && { opacity: blinkAnimation }]}>
//               {row}
//             </Animated.Text>
//           </View>
//           <GridRow
//             rowIndex={rowIndex}
//             cellSize={cellSize}
//             handleInputChange={handleInputChange}
//             correctCells={correctCells}
//             incorrectCells={incorrectCells}
//             shiftAnimation={shiftAnimation}
//           />
//         </View>
//       );
//     });

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
//         <View style={styles.gridContainer}>
//           {/* Operator and Column Headers */}
//           <View style={styles.headerContainer}>
//             {renderOperator()}
//             {renderColumnHeaders()}
//           </View>

//           {/* Rows with Row Headers and Grid Cells */}
//           <View style={styles.rowsContainer}>{renderRows()}</View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'flex-start',
//     paddingHorizontal: 10,
//   },
//   gridContainer: {
//     alignItems: 'center',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   columnHeadersContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   rowsContainer: {
//     alignItems: 'center',
//   },
//   operatorCell: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#CADCFC',
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   headerCell: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#CADCFC',
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     color: '#003366',
//     fontSize: 18,
//   },
//   operatorText: {
//     color: '#00246B',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// });

// export default Grid;

