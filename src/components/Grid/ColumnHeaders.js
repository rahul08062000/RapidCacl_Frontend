// import React, { useContext } from 'react';
// import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
// import { AppContext } from '../../context/AppContext';

// const ColumnHeaders = () => {
//   const { colHeader, focusColIndex, selectedOperator, onOperatorPress } = useContext(AppContext);
//   const cellSize = 60; // Define the cell size according to your requirement

//   return (
//     <View style={styles.row}>
//       <TouchableOpacity onPress={onOperatorPress} style={[styles.operatorButton, { width: cellSize, height: cellSize }]}>
//         <Text style={styles.operatorText}>{selectedOperator || 'X'}</Text>
//       </TouchableOpacity>
//       {colHeader.map((col, colIndex) => {
//         const isFocused = focusColIndex === colIndex;
//         return (
//           <View key={colIndex} style={[styles.headerCell, { width: cellSize, height: cellSize }]}>
//             <Animated.Text
//               style={[
//                 styles.headerText,
//                 isFocused && styles.focusedHeaderText,
//               ]}
//             >
//               {col}
//             </Animated.Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//   },
//   operatorButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#CADCFC',
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   operatorText: {
//     color: '#00246B',
//     fontWeight: 'bold',
//     fontSize: 24,
//   },
//   headerCell: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#CADCFC',
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   headerText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   focusedHeaderText: {
//     color: '#00246B',
//     fontSize: 25,
//   },
// });

// export default ColumnHeaders;

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AppContext } from '../../context/AppContext';

const ColumnHeaders = () => {
  const { colHeader, focusColIndex, selectedOperator, onOperatorPress } = useContext(AppContext);

  // Get screen width and calculate a responsive cell size
  const { width: screenWidth } = Dimensions.get('window');
  const totalColumns = colHeader.length;
  
  // Calculate cell size dynamically based on the screen width and number of columns
  const cellSize = screenWidth / (totalColumns + 1); // +1 accounts for the operator column
  
  return (
    <View style={styles.row}>
      {/* Operator Button */}
      <TouchableOpacity onPress={onOperatorPress} style={[styles.operatorButton, { width: cellSize, height: cellSize }]}>
        <Text style={styles.operatorText}>{selectedOperator || 'X'}</Text>
      </TouchableOpacity>

      {/* Column Headers */}
      {colHeader.map((col, colIndex) => {
        const isFocused = focusColIndex === colIndex;
        return (
          <View key={colIndex} style={[styles.headerCell, { width: cellSize, height: cellSize }]}>
            <Text style={[styles.headerText, isFocused && styles.focusedHeaderText]}>
              {col}
            </Text>
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
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 18, // Adjust this to match your grid's font size
  },
  focusedHeaderText: {
    color: '#00246B',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default ColumnHeaders;

