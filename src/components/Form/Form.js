import React, { useState, useContext, useRef } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
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
    setIsKeyboardVisible,
    setKeyboardReplacementContent,
  } = useContext(AppContext);

  const gridSizeOptions = [6, 7, 8, 9, 10];
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const operatorOptions = ['+', '-', 'X', '/'];
  const inputModeOptions = ['Guess', 'CustomKeyboard'];
  const settingsOptions = ['Linear', 'Random', 'Sequential', 'Manually Sequential'];

  const [currentPicker, setCurrentPicker] = useState(null);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const windowWidth = Dimensions.get('window').width; // Get screen width

  const animateDropdown = (pickerType, shouldOpen) => {
    setIsAnimating(true);
    Animated.timing(animatedHeight, {
      toValue: shouldOpen ? 150 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => setIsAnimating(false));
  };

  const handleSelection = (pickerType, option) => {
    setSelectedOption(option);

    // Update the correct state based on pickerType
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

    // Close the picker after selection and show keyboard
    setIsKeyboardVisible(true);
    setCurrentPicker(null);
    setKeyboardReplacementContent(null);
  };

  const togglePicker = (pickerType, options) => {
    if (isAnimating) return;
    if (currentPicker === pickerType) {
      // Close dropdown and show the keyboard
      animateDropdown(pickerType, false);
      setCurrentPicker(null);
      setIsKeyboardVisible(true);
      setKeyboardReplacementContent(null);
    } else {
      // Open dropdown and hide the keyboard
      animateDropdown(currentPicker, false);
      setTimeout(() => {
        setCurrentPicker(pickerType);
        animateDropdown(pickerType, true);
        setIsKeyboardVisible(false);
        setKeyboardReplacementContent(renderPickerOptions(options, pickerType));
      }, 300);
    }
  };

  const renderPickerOptions = (options, pickerType) => (
    <View style={[styles.keyboardReplacementContainer, { width: windowWidth }]}>
      <ScrollView>
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelection(pickerType, option)} // Call handleSelection
              style={[
                styles.keyContainer,
                { backgroundColor: isSelected ? '#eceefe' : '#ffffff' },
              ]}
            >
              <Text style={styles.keyText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={globalStyles.formContainer}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => togglePicker('grid', gridSizeOptions)} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>{gridSize}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePicker('difficulty', difficultyOptions)} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>{difficulty}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePicker('operator', operatorOptions)} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>{selectedOperator}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePicker('inputMode', inputModeOptions)} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>{inputMode}</Text>
        </TouchableOpacity>
        {/* Settings button added to the same row */}
        <TouchableOpacity onPress={() => togglePicker('settings', settingsOptions)} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap', // Added wrap in case buttons exceed width
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  circleButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  // Keyboard replacement dropdown container
  keyboardReplacementContainer: {
    height: 200, // Match CustomKeyboard height
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // Match CustomKeyboard background
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  // Full-width key container inside dropdown
  keyContainer: {
    width: '100%', // Take full width
    height: 50, // Match CustomKeyboard key height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Initial background color
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  keyText: {
    fontSize: 20,
    color: '#003366',
    fontWeight: '500',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});

export default Form;
