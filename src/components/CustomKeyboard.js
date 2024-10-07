// import React, { useContext, useRef, useEffect,useCallback } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { AppContext } from '../context/AppContext';

// const CustomKeyboard = () => {
//   const {
//     focusRowIndex,
//     focusColIndex,
//     inputValues,
//     expectedValues,
//     setInputValues,
//     setVisitedCells,
//     switchToRandomUnvisitedCell,
//     isSubmitted,
//     isSubmitEnabled,
//     setIsSubmitted,
//     setIsSubmitEnabled,
//     handleAutoSubmit, 
//     handleRestart,
//     setShowScoreboard
//   } = useContext(AppContext);

//   const blinkAnim = useRef(new Animated.Value(1)).current;

//   // Start blinking animation when the game is submitted
//   useEffect(() => {
//     if (isSubmitted) {
//       startBlinking();
//     }
//   }, [isSubmitted]);
//   useEffect(() => {
//     if (isSubmitEnabled) {
//       handleAutoSubmit();
//     }
//   }, [isSubmitEnabled]);

//   const startBlinking = () => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(blinkAnim, {
//           toValue: 0.5,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(blinkAnim, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   };

//   const handleInputChange = useCallback((text) => {
//     const cellKey = `${focusRowIndex},${focusColIndex}`;
//     let currentCellValue = inputValues[cellKey] || '';
//     const expectedValueLength = expectedValues[cellKey]?.toString().length || 0;
  
//     // Handling different input cases
//     if (text === 'C') {
//       currentCellValue = '';
//     } else if (text === 'del') {
//       currentCellValue = currentCellValue.slice(0, -1);
//     } else {
//       currentCellValue += text;
  
//       // Prevent currentCellValue from exceeding expectedValue length
//       if (currentCellValue.length > expectedValueLength) {
//         currentCellValue = currentCellValue.slice(0, expectedValueLength);
//       }
//     }
  
//     // Update input values
//     setInputValues((prevValues) => ({
//       ...prevValues,
//       [cellKey]: currentCellValue,
//     }));
  
//     // Mark the cell as visited
//     setVisitedCells((prev) => new Set(prev).add(cellKey));
  
//     // Move to the next unvisited cell if input matches the expected length
//     if (currentCellValue.length === expectedValueLength) {
//       switchToRandomUnvisitedCell();
//     }
//   }, [focusRowIndex, focusColIndex, inputValues, setVisitedCells, switchToRandomUnvisitedCell, expectedValues]);
  

//   const keys = [
//     { label: '1', color: '#eceefe' },
//     { label: '2', color: '#eceefe' },
//     { label: '3', color: '#eceefe' },
//     { label: '4', color: '#eceefe' },
//     { label: '5', color: '#eceefe' },
//     { label: '6', color: '#eceefe' },
//     { label: '7', color: '#eceefe' },
//     { label: '8', color: '#eceefe' },
//     { label: '9', color: '#eceefe' },
//     // { label: 'C', color: '#f1f1f0' },
//     { label: '0', color: '#eceefe' },
//     // { label: '.', color: '#f1f1f0' }
//   ];
//   const handleViewScoreboard = () => {
//     setShowScoreboard(true);
//   };

//   return (
//     <View style={styles.keyboard}>
//       <View style={styles.row}>
//         {keys.slice(0, 3).map((key) => (
//           <TouchableOpacity
//             key={key.label}
//             style={[styles.key, { backgroundColor: key.color }]}
//             onPress={() => handleInputChange(key.label)}
//           >
//             <Text style={styles.keyText}>{key.label}</Text>
//           </TouchableOpacity>
//         ))}
//         {/* <TouchableOpacity style={[styles.key, styles.iconButton, { backgroundColor: '#f1f1f0' }]} onPress={() => handleInputChange('del')}>
//           <Ionicons name="backspace-outline" size={24} color="#003366" />
//         </TouchableOpacity> */}
//       </View>

//       <View style={styles.row}>
//         {keys.slice(3, 6).map((key) => (
//           <TouchableOpacity
//             key={key.label}
//             style={[styles.key, { backgroundColor: key.color }]}
//             onPress={() => handleInputChange(key.label)}
//           >
//             <Text style={styles.keyText}>{key.label}</Text>
//           </TouchableOpacity>
//         ))}
//         {/* <TouchableOpacity style={[styles.key, { backgroundColor: '#f1f1f0' }]} onPress={() => handleInputChange('.')}>
//           <Text style={styles.keyText}>.</Text>
//         </TouchableOpacity> */}
//       </View>

//       <View style={styles.row}>
//         {keys.slice(6, 9).map((key) => (
//           <TouchableOpacity
//             key={key.label}
//             style={[styles.key, { backgroundColor: key.color }]}
//             onPress={() => handleInputChange(key.label)}
//           >
//             <Text style={styles.keyText}>{key.label}</Text>
//           </TouchableOpacity>
//         ))}
//         {/* <TouchableOpacity style={[styles.key, { backgroundColor: '#f1f1f0' }]} onPress={() => handleInputChange('-')}>
//           <Text style={styles.keyText}>-</Text>
//         </TouchableOpacity> */}
//       </View>

//       <View style={styles.row}>
//         {/* <TouchableOpacity
//           style={[styles.key, { backgroundColor: '#f1f1f0' }]}
//           onPress={() => handleInputChange('C')}
//         >
//           <Text style={styles.keyText}>C</Text>
//         </TouchableOpacity> */}

//         <TouchableOpacity
//           style={[styles.key,{width:'50%'}, { backgroundColor: '#eceefe' }]}
//           onPress={() => handleInputChange('0')}
//         >
//           <Text style={styles.keyText}>0</Text>
//         </TouchableOpacity>

//         {/* {isSubmitted ? (
//           <TouchableOpacity style={styles.viewScoreboardButton} onPress={handleViewScoreboard}  disabled={!isSubmitEnabled}>
//             <Animated.Text style={[styles.viewScoreboardText, { opacity: blinkAnim }]}>
//             View Scoreboard
//             </Animated.Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={[
//               styles.submitButton,
//               { backgroundColor: isSubmitEnabled ? '#29387b' : '#d3d3d3' },
//             ]}
//             disabled={!isSubmitEnabled}
//           >
//             <Text style={styles.submitButtonText}>Submit</Text>
//           </TouchableOpacity>
//         )} */}
//         <TouchableOpacity  style={[
//               styles.viewScoreboardButton,
//               { backgroundColor: isSubmitEnabled ? '#29387b' : '#d3d3d3' },
//             ]} onPress={handleViewScoreboard}  disabled={!isSubmitEnabled}>
//             <Animated.Text style={[styles.viewScoreboardText, { opacity: blinkAnim }]}>
//             View Scoreboard
//             </Animated.Text>
//           </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   keyboard: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     backgroundColor: '#f8f8f8',
//     borderTopWidth: 1,
//     borderColor: '#ccc',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginVertical: 5,
//   },
//   key: {
//     width: 8,
//     height: 55,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//     borderRadius: 8,
//     backgroundColor: '#eceefe',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//   },
//   keyText: {
//     fontSize: 20,
//     color: '#003366',
//   },
//   submitButton: {
//     backgroundColor: '#29387b',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '50%',
//     height: 'auto',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   viewScoreboardButton: {
//     backgroundColor: '#d9534f',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '50%',
//     height: 'auto',
//   },
//   viewScoreboardText: {
//     color: 'yellow',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   iconButton: {
//     width: 75,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CustomKeyboard;

// import React, { useContext, useRef, useCallback, useState } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, Animated, PanResponder } from 'react-native';
// import { AppContext } from '../context/AppContext';

// const CustomKeyboard = () => {
//   const {
//     focusRowIndex,
//     focusColIndex,
//     inputValues,
//     expectedValues,
//     setInputValues,
//     setVisitedCells,
//     switchToRandomUnvisitedCell,
//     isSubmitted,
//     isSubmitEnabled,
//     handleAutoSubmit,
//     setShowScoreboard,
//   } = useContext(AppContext);

//   const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(250)); // Default height of keyboard
//   const MIN_HEIGHT = 150;
//   const MAX_HEIGHT = 400;

//   // PanResponder for detecting swipe gestures to resize the keyboard
//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: (event, gestureState) => {
//         let newHeight = keyboardHeight._value - gestureState.dy; // Inverted gesture for proper resizing direction
//         newHeight = Math.max(MIN_HEIGHT, Math.min(newHeight, MAX_HEIGHT)); // Constrain height between min and max
//         setKeyboardHeight(new Animated.Value(newHeight)); // Update the height of the keyboard
//       },
//     })
//   ).current;

//   const handleInputChange = useCallback(
//     (text) => {
//       const cellKey = `${focusRowIndex},${focusColIndex}`;
//       let currentCellValue = inputValues[cellKey] || '';
//       const expectedValueLength = expectedValues[cellKey]?.toString().length || 0;

//       if (text === 'C') {
//         currentCellValue = '';
//       } else if (text === 'del') {
//         currentCellValue = currentCellValue.slice(0, -1);
//       } else {
//         currentCellValue += text;

//         if (currentCellValue.length > expectedValueLength) {
//           currentCellValue = currentCellValue.slice(0, expectedValueLength);
//         }
//       }

//       setInputValues((prevValues) => ({
//         ...prevValues,
//         [cellKey]: currentCellValue,
//       }));

//       setVisitedCells((prev) => new Set(prev).add(cellKey));

//       if (currentCellValue.length === expectedValueLength) {
//         switchToRandomUnvisitedCell();
//       }
//     },
//     [focusRowIndex, focusColIndex, inputValues, setVisitedCells, switchToRandomUnvisitedCell, expectedValues]
//   );

//   const keys = [
//     { label: '1', color: '#eceefe' },
//     { label: '2', color: '#eceefe' },
//     { label: '3', color: '#eceefe' },
//     { label: '4', color: '#eceefe' },
//     { label: '5', color: '#eceefe' },
//     { label: '6', color: '#eceefe' },
//     { label: '7', color: '#eceefe' },
//     { label: '8', color: '#eceefe' },
//     { label: '9', color: '#eceefe' },
//   ];

//   // Define button size dynamically based on the keyboard height
//   const buttonSize = keyboardHeight.interpolate({
//     inputRange: [MIN_HEIGHT, MAX_HEIGHT],
//     outputRange: [50, 85], // Adjust the button size based on keyboard height
//     extrapolate: 'clamp',
//   });

//   // Define background expansion dynamically based on keyboard height
//   const backgroundScale = keyboardHeight.interpolate({
//     inputRange: [MIN_HEIGHT, MAX_HEIGHT],
//     outputRange: [1, 1.5], // Scale background slightly larger than keys
//     extrapolate: 'clamp',
//   });

//   return (
//     <View style={styles.keyboardContainer}>
//       <Animated.View
//         style={[styles.keyboard, { height: keyboardHeight }]}
//         {...panResponder.panHandlers}
//       >
//         <View style={styles.row}>
//           {keys.slice(0, 3).map((key) => (
//             <Animated.View
//               key={key.label}
//               style={[
//                 styles.keyContainer,
//                 {
//                   width: buttonSize,
//                   height: buttonSize,
//                   transform: [{ scale: backgroundScale }], // Scale the background
//                 },
//               ]}
//             >
//               <TouchableOpacity
//                 style={[styles.key, { backgroundColor: key.color }]}
//                 activeOpacity={0.7} // Touch opacity effect
//                 onPress={() => handleInputChange(key.label)}
//               >
//                 <Text style={styles.keyText}>{key.label}</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           ))}
//         </View>

//         <View style={styles.row}>
//           {keys.slice(3, 6).map((key) => (
//             <Animated.View
//               key={key.label}
//               style={[
//                 styles.keyContainer,
//                 {
//                   width: buttonSize,
//                   height: buttonSize,
//                   transform: [{ scale: backgroundScale }],
//                 },
//               ]}
//             >
//               <TouchableOpacity
//                 style={[styles.key, { backgroundColor: key.color }]}
//                 activeOpacity={0.7}
//                 onPress={() => handleInputChange(key.label)}
//               >
//                 <Text style={styles.keyText}>{key.label}</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           ))}
//         </View>

//         <View style={styles.row}>
//           {keys.slice(6, 9).map((key) => (
//             <Animated.View
//               key={key.label}
//               style={[
//                 styles.keyContainer,
//                 {
//                   width: buttonSize,
//                   height: buttonSize,
//                   transform: [{ scale: backgroundScale }],
//                 },
//               ]}
//             >
//               <TouchableOpacity
//                 style={[styles.key, { backgroundColor: key.color }]}
//                 activeOpacity={0.7}
//                 onPress={() => handleInputChange(key.label)}
//               >
//                 <Text style={styles.keyText}>{key.label}</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           ))}
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   keyboardContainer: {
//     backgroundColor: '#f8f8f8',
//     borderTopWidth: 1,
//     borderColor: '#ccc',
//   },
//   keyboard: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginVertical: 10, // Add vertical margin for spacing between rows
//   },
//   keyContainer: {
//     marginHorizontal: 10, // Add horizontal margin for spacing between keys
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   key: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     backgroundColor: '#eceefe',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//     width: '100%', // Ensure the button takes full width within the container
//     height: '100%', // Ensure the button takes full height within the container
//   },
//   keyText: {
//     fontSize: 20,
//     color: '#003366',
//   },
// });

// export default CustomKeyboard;

import React, { useContext, useRef, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const CustomKeyboard = () => {
  const {
    focusRowIndex,
    focusColIndex,
    inputValues,
    expectedValues,
    setInputValues,
    setVisitedCells,
    switchToRandomUnvisitedCell,
    isSubmitted,
    isSubmitEnabled,
    setIsSubmitted,
    setIsSubmitEnabled,
    handleAutoSubmit, 
    handleRestart,
    setShowScoreboard,
    isKeyboardVisible,
    keyboardReplacementContent
  } = useContext(AppContext);

  const blinkAnim = useRef(new Animated.Value(1)).current;

  // Start blinking animation when the game is submitted
  useEffect(() => {
    if (isSubmitted) {
      startBlinking();
    }
  }, [isSubmitted]);
  
  useEffect(() => {
    if (isSubmitEnabled) {
      handleAutoSubmit();
    }
  }, [isSubmitEnabled]);

  const startBlinking = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleInputChange = useCallback((text) => {
    const cellKey = `${focusRowIndex},${focusColIndex}`;
    let currentCellValue = inputValues[cellKey] || '';
    const expectedValueLength = expectedValues[cellKey]?.toString().length || 0;
  
    if (text === 'C') {
      currentCellValue = '';
    } else if (text === 'del') {
      currentCellValue = currentCellValue.slice(0, -1);
    } else {
      currentCellValue += text;
  
      // Prevent currentCellValue from exceeding expectedValue length
      if (currentCellValue.length > expectedValueLength) {
        currentCellValue = currentCellValue.slice(0, expectedValueLength);
      }
    }
  
    // Update input values
    setInputValues((prevValues) => ({
      ...prevValues,
      [cellKey]: currentCellValue,
    }));
  
    // Mark the cell as visited
    setVisitedCells((prev) => new Set(prev).add(cellKey));
  
    // Move to the next unvisited cell if input matches the expected length with a delay
    if (currentCellValue.length === expectedValueLength) {
      setTimeout(() => {
        switchToRandomUnvisitedCell();
      }, 20); // Delay of 200ms before switching to next cell
    }
  }, [focusRowIndex, focusColIndex, inputValues, setVisitedCells, switchToRandomUnvisitedCell, expectedValues]);
  
  const keys = [
    { label: '1', color: '#eceefe' },
    { label: '2', color: '#eceefe' },
    { label: '3', color: '#eceefe' },
    { label: '4', color: '#eceefe' },
    { label: '5', color: '#eceefe' },
    { label: '6', color: '#eceefe' },
    { label: '7', color: '#eceefe' },
    { label: '8', color: '#eceefe' },
    { label: '9', color: '#eceefe' },
    { label: '.', color: '#eceefe' },
    { label: '0', color: '#eceefe' },
    { label: 'del', color: '#eceefe' },
  ];
  
  const handleViewScoreboard = () => {
    setShowScoreboard(true);
  };

  if (!isKeyboardVisible) {
    return (
      <View style={styles.keyboardReplacement}>
        {keyboardReplacementContent}
      </View>
    );
  }

  return (
    <View style={[
      styles.keyboard, 
      { 
        backgroundColor: isSubmitEnabled ? '#f0f0f0' : 'white', 
        borderTopWidth: isSubmitEnabled ? 0 : 1 // Set to 0 when isSubmitEnabled is true, otherwise 1
      }
  ]}>
      {/* Conditional rendering based on isSubmitEnabled */}
      {!isSubmitEnabled ? (
        <>
          <View style={styles.row}>
            {keys.slice(0, 3).map((key) => (
              <TouchableOpacity
                key={key.label}
                style={[styles.key, { backgroundColor: key.color }]}
                onPress={() => handleInputChange(key.label)}
              >
                <Text style={styles.keyText}>{key.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            {keys.slice(3, 6).map((key) => (
              <TouchableOpacity
                key={key.label}
                style={[styles.key, { backgroundColor: key.color }]}
                onPress={() => handleInputChange(key.label)}
              >
                <Text style={styles.keyText}>{key.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            {keys.slice(6, 9).map((key) => (
              <TouchableOpacity
                key={key.label}
                style={[styles.key, { backgroundColor: key.color }]}
                onPress={() => handleInputChange(key.label)}
              >
                <Text style={styles.keyText}>{key.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.key, { backgroundColor: '#FFFFFF' }]}
              onPress={() => handleInputChange('.')}
            >
              <Text style={styles.keyText}>.</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.key, { backgroundColor: '#eceefe' }]}
              onPress={() => handleInputChange('0')}
            >
              <Text style={styles.keyText}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.key, { backgroundColor: '#FFFFFF' }]}
              onPress={() => handleInputChange('del')}
            >
              <Ionicons name="backspace-outline" size={24} color="#003366" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TouchableOpacity 
          style={[styles.submitButton, { backgroundColor: isSubmitEnabled ? '#29387b' : '#d3d3d3' }]} 
          onPress={handleViewScoreboard} 
          disabled={!isSubmitEnabled}
        >
          <Text style={styles.submitButtonText}>View Scoreboard</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 4,
  },
  key: {
    width: '32%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#eceefe',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  keyText: {
    fontSize: 20,
    color: '#003366',
    fontWeight:'500',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,

  },
  submitButton: {
    backgroundColor: '#f0f0f0',
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 18,
    height:48,
    marginBottom:15
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomKeyboard;





