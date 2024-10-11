// import React, { useState, useContext, useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Animated, PanResponder } from 'react-native';
// import { AppContext } from '../context/AppContext';

// const LevelScreen = () => {
//   const { unlockedLevel, setSelectedLevel, setIsGameStarted, generateRandomHeaders } = useContext(AppContext);
//   const levelsPerPage = 12; // Number of levels per page
//   const [currentPage, setCurrentPage] = useState(0); // Current page for level navigation
//   const levels = Array.from({ length: 200 }, (_, i) => i + 1); // Generate 200 levels
  
//   const translateX = useRef(new Animated.Value(0)).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 10,
//       onPanResponderMove: Animated.event([null, { dx: translateX }], {
//         useNativeDriver: false,
//       }),
//       onPanResponderRelease: (evt, gestureState) => {
//         if (gestureState.dx > 50) {
//           goToPreviousPage(); // Swipe right for the previous page
//         } else if (gestureState.dx < -50) {
//           goToNextPage(); // Swipe left for the next page
//         }
//         Animated.spring(translateX, {
//           toValue: 0,
//           useNativeDriver: false,
//         }).start();
//       },
//     })
//   ).current;

//   // Function to select a level
//   const handleLevelSelect = (level) => {
//     if (level <= unlockedLevel) {
//       setSelectedLevel(level); // Set the selected level
//       generateRandomHeaders(level); // Generate the headers based on the level
//       setIsGameStarted(true); // Start the game
//     }
//   };

//   // Function to go to the previous page
//   const goToPreviousPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Function to go to the next page
//   const goToNextPage = () => {
//     if ((currentPage + 1) * levelsPerPage < levels.length) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Paginate levels
//   const paginatedLevels = levels.slice(currentPage * levelsPerPage, (currentPage + 1) * levelsPerPage);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <Text style={styles.headerText}>Select Level</Text>

//       {/* Levels wrapped in PanResponder for swipe detection */}
//       <Animated.View
//         style={[styles.levelNavigationContainer, { transform: [{ translateX }] }]}
//         {...panResponder.panHandlers}
//       >
//         <View style={styles.levelContainer}>
//           {paginatedLevels.map((level, index) => {
//             const isUnlocked = level <= unlockedLevel;
//             return (
//               <TouchableOpacity
//                 key={index}
//                 style={[styles.levelButton, isUnlocked ? styles.unlockedLevel : styles.lockedLevel]}
//                 onPress={() => handleLevelSelect(level)}
//                 disabled={!isUnlocked}
//               >
//                 <Text style={[styles.levelText, isUnlocked ? styles.unlockedText : styles.lockedText]}>{level}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </Animated.View>

//       {/* Pagination Buttons */}
//       <View style={styles.paginationButtons}>
//         <TouchableOpacity
//           onPress={goToPreviousPage}
//           style={[styles.navButton, currentPage === 0 && styles.disabledButton]}
//           disabled={currentPage === 0}
//         >
//           <Text style={styles.navButtonText}>{'<'}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={goToNextPage}
//           style={[styles.navButton, (currentPage + 1) * levelsPerPage >= levels.length && styles.disabledButton]}
//           disabled={(currentPage + 1) * levelsPerPage >= levels.length}
//         >
//           <Text style={styles.navButtonText}>{'>'}</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const { width: screenWidth } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginVertical: 20,
//     color: '#1E90FF',
//   },
//   levelNavigationContainer: {
//     width: screenWidth,
//   },
//   levelContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   levelButton: {
//     width: screenWidth * 0.18,
//     height: screenWidth * 0.18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 10,
//     borderRadius: 10,
//     borderWidth: 2,
//   },
//   unlockedLevel: {
//     backgroundColor: '#1E90FF',
//     borderColor: '#1C86EE',
//   },
//   lockedLevel: {
//     backgroundColor: '#B0C4DE',
//     borderColor: '#A9A9A9',
//   },
//   levelText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   unlockedText: {
//     color: '#fff',
//   },
//   lockedText: {
//     color: '#666',
//   },
//   paginationButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: screenWidth * 0.7,
//     marginVertical: 10,
//   },
//   navButton: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#007BFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25,
//     elevation: 5,
//   },
//   navButtonText: {
//     fontSize: 24,
//     color: '#fff',
//   },
//   disabledButton: {
//     backgroundColor: '#ccc',
//   },
// });

// export default LevelScreen;
