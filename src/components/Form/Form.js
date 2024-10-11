//old code without responsive

// import React, { useState, useContext, useRef } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Modal, ScrollView, Animated } from 'react-native';
// import { AppContext } from '../../context/AppContext';
// import globalStyles from '../../styles/globalStyles';

// const Form = () => {
//   const {
//     gridSize,
//     setGridSize,
//     difficulty,
//     setDifficulty,
//     selectedOperator,
//     setSelectedOperator,
//     inputMode,
//     setInputMode,
//   } = useContext(AppContext);

//   const gridSizeOptions = [6, 7, 8, 9, 10];
//   const difficultyOptions = ['Easy', 'Medium', 'Hard'];
//   const operatorOptions = ['+', '-', 'X', '/'];
//   const inputModeOptions = ['Guess', 'CustomKeyboard'];
//   const settingsOptions = ['Linear', 'Random', 'Sequential', 'Manually Sequential'];

//   const [currentPicker, setCurrentPicker] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const slideAnim = useRef(new Animated.Value(0)).current; // Animation for sliding up the modal

//   const { height: windowHeight, width: windowWidth } = Dimensions.get('window'); // Get screen dimensions

//   const handleSelection = (pickerType, option) => {
//     setSelectedOption(option);

//     switch (pickerType) {
//       case 'grid':
//         setGridSize(option);
//         break;
//       case 'difficulty':
//         setDifficulty(option);
//         break;
//       case 'operator':
//         setSelectedOperator(option);
//         break;
//       case 'inputMode':
//         setInputMode(option);
//         break;
//       case 'settings':
//         // Handle settings selection here if you need to store it in context
//         break;
//       default:
//         break;
//     }

//     // Close modal after selection
//     closeBottomSheet();
//   };

//   const togglePicker = (pickerType, options) => {
//     setCurrentPicker({ pickerType, options });
//     openBottomSheet();
//   };

//   // Open the bottom sheet with slide-up animation
//   const openBottomSheet = () => {
//     setIsModalVisible(true);
//     Animated.timing(slideAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   // Close the bottom sheet with slide-down animation
//   const closeBottomSheet = () => {
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setIsModalVisible(false);
//     });
//   };

//   const renderPickerOptions = (options, pickerType) => (
//     <ScrollView>
//       {options.map((option, index) => {
//         const isSelected = selectedOption === option;
//         return (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleSelection(pickerType, option)}
//             style={[
//               styles.keyContainer,
//               isSelected ? styles.selectedKeyContainer : null,
//             ]}
//           >
//             <Text style={[styles.keyText, isSelected ? styles.selectedKeyText : null]}>{option}</Text>
//           </TouchableOpacity>
//         );
//       })}
//     </ScrollView>
//   );

//   return (
//     <View style={[globalStyles.formContainer, styles.formWrapper]}>
//       <View style={styles.inputContainer}>
//         <TouchableOpacity onPress={() => togglePicker('grid', gridSizeOptions)} style={styles.circleButton}>
//           <Text style={styles.circleButtonText}>Grid Size</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => togglePicker('difficulty', difficultyOptions)} style={styles.circleButton}>
//           <Text style={styles.circleButtonText}>Difficulty</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => togglePicker('operator', operatorOptions)} style={styles.circleButton}>
//           <Text style={styles.circleButtonText}>Operator</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => togglePicker('inputMode', inputModeOptions)} style={styles.circleButton}>
//           <Text style={styles.circleButtonText}>Mode</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => togglePicker('settings', settingsOptions)} style={styles.circleButton}>
//           <Text style={styles.circleButtonText}>Settings</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Bottom Sheet Modal */}
//       <Modal
//         visible={isModalVisible}
//         transparent={true}
//         animationType="none" // Disable built-in animation, we handle it with Animated
//       >
//         <View style={styles.modalOverlay}>
//           <Animated.View
//             style={[
//               styles.bottomSheet,
//               {
//                 transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [windowHeight, 0] }) }],
//               },
//             ]}
//           >
//             <View style={styles.bottomSheetHeader}>
//               <Text style={styles.bottomSheetTitle}>Select an Option</Text>
//               <TouchableOpacity onPress={closeBottomSheet}>
//                 <Text style={styles.closeButton}>Close</Text>
//               </TouchableOpacity>
//             </View>
//             {currentPicker && renderPickerOptions(currentPicker.options, currentPicker.pickerType)}
//           </Animated.View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   formWrapper: {
//     // marginVertical: 40, 
//     // paddingHorizontal: 10, 
//     // paddingVertical: 10,
//     backgroundColor: '#f7f7f7',
//     borderRadius: 10,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between', 
//     flexWrap: 'nowrap', //single row
//   },
//   circleButton: {
//     width: 60, 
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#007BFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5, // Adjust margin to fit buttons more easily
//   },
//   circleButtonText: {
//     fontSize: 12, // Make text smaller to fit in the button
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal
//   },
//   bottomSheet: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     maxHeight: '40%', // Limit height to 40% of screen
//   },
//   bottomSheetHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   bottomSheetTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   closeButton: {
//     color: '#007BFF',
//     fontSize: 16,
//   },
//   keyContainer: {
//     width: '100%',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectedKeyContainer: {
//     backgroundColor: '#E0F7FA',
//   },
//   keyText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   selectedKeyText: {
//     fontWeight: 'bold',
//     color: '#007BFF',
//   },
// });

// export default Form;

//new code two buttons in 1 row

import React, { useState, useContext, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Modal, ScrollView, Animated } from 'react-native';
import { AppContext } from '../../context/AppContext';
import globalStyles from '../../styles/globalStyles';

const Form = () => {
  const {
    gridSize,
    setGridSize,
    difficulty,
    setDifficulty,
    selectedOperator,
    setSelectedOperator,
    inputMode,
    setInputMode,
  } = useContext(AppContext);

  const gridSizeOptions = [6, 7, 8, 9, 10];
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const operatorOptions = ['+', '-', 'X', '/'];
  const inputModeOptions = ['Guess', 'CustomKeyboard'];
  const settingsOptions = ['Linear', 'Random', 'Sequential', 'Manually Sequential'];

  const [currentPicker, setCurrentPicker] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const slideAnim = useRef(new Animated.Value(0)).current; // Animation for sliding up the modal

  const { height: windowHeight, width: windowWidth } = Dimensions.get('window'); // Get screen dimensions

  const handleSelection = (pickerType, option) => {
    setSelectedOption(option);

    switch (pickerType) {
      case 'grid':
        setGridSize(option);
        break;
      case 'difficulty':
        setDifficulty(option);
        break;
      case 'operator':
        setSelectedOperator(option);
        break;
      case 'inputMode':
        setInputMode(option);
        break;
      case 'settings':
        // Handle settings selection here if you need to store it in context
        break;
      default:
        break;
    }

    // Close modal after selection
    closeBottomSheet();
  };

  const togglePicker = (pickerType, options) => {
    setCurrentPicker({ pickerType, options });
    openBottomSheet();
  };

  // Open the bottom sheet with slide-up animation
  const openBottomSheet = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Close the bottom sheet with slide-down animation
  const closeBottomSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

  const renderPickerOptions = (options, pickerType) => (
    <ScrollView>
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelection(pickerType, option)}
            style={[
              styles.keyContainer,
              isSelected ? styles.selectedKeyContainer : null,
            ]}
          >
            <Text style={[styles.keyText, isSelected ? styles.selectedKeyText : null]}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  return (
    <View style={[globalStyles.formContainer, styles.formWrapper]}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => togglePicker('grid', gridSizeOptions)} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>Grid Size</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePicker('difficulty', difficultyOptions)} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>Difficulty</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => togglePicker('operator', operatorOptions)} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>Operator</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePicker('inputMode', inputModeOptions)} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>Mode</Text>
        </TouchableOpacity>
      </View>

      {/* Last row with a single centered button */}
      <View style={styles.centeredRow}>
        <TouchableOpacity onPress={() => togglePicker('settings', settingsOptions)} style={styles.centeredCircleButton}>
          <Text style={styles.circleButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none" // Disable built-in animation, we handle it with Animated
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [windowHeight, 0] }) }],
              },
            ]}
          >
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Select an Option</Text>
              <TouchableOpacity onPress={closeBottomSheet}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
            {currentPicker && renderPickerOptions(currentPicker.options, currentPicker.pickerType)}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginBottom: '4%',
  },
  circleButton: {
    width: Dimensions.get('window').width * 0.4, // Adjusted to take up half the width
    height: Dimensions.get('window').width * 0.18, // Adjusted height
    borderRadius: Dimensions.get('window').width * 0.09, // Circular button
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%', // Add some horizontal margin for spacing
  },
  circleButtonText: {
    fontSize: Dimensions.get('window').width * 0.035, // Dynamic font size
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center', 
    // marginTop: '5%', 
  },
  centeredCircleButton: {
    width: Dimensions.get('window').width * 0.4, 
    height: Dimensions.get('window').width * 0.18,
    borderRadius: Dimensions.get('window').width * 0.09,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    maxHeight: '45%', 
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    color: '#007BFF',
    fontSize: 16,
  },
  keyContainer: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedKeyContainer: {
    backgroundColor: '#E0F7FA',
  },
  keyText: {
    fontSize: 18,
    color: '#333',
  },
  selectedKeyText: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default Form;



