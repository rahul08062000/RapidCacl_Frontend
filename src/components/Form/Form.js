import React, { useState, useContext, useRef } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, Animated, Easing } from 'react-native';
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
    setIsFormVisible,
    inputMode, 
    setInputMode,
  } = useContext(AppContext);

  const gridSizeOptions = [6, 7, 8, 9, 10];
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const operatorOptions = ['+', '-', 'X', '/'];
  const inputModeOptions = ['Guess', 'Custom Keyboard'];

  const [currentPicker, setCurrentPicker] = useState(null);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  const animateDropdown = (pickerType, shouldOpen) => {
    setIsAnimating(true);

    Animated.timing(animatedHeight, {
      toValue: shouldOpen ? 150 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => setIsAnimating(false));
  };

  const togglePicker = (pickerType) => {
    if (isAnimating) return;

    if (currentPicker === pickerType) {
      animateDropdown(pickerType, false);
      setCurrentPicker(null);
    } else {
      animateDropdown(currentPicker, false);
      setTimeout(() => {
        setCurrentPicker(pickerType);
        animateDropdown(pickerType, true);
      }, 300);
    }
  };

  const handleFormSubmit = () => {
    setIsFormVisible(false);
  };

  const renderPickerOptions = (options, selectedValue, onSelect, pickerType) => (
    <Animated.View style={[styles.pickerOptionsContainer, { height: animatedHeight }]}>
      <ScrollView>
        {options.map((option, index) => {
          const isSelected = selectedValue === option;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelect(option);
                togglePicker(pickerType); // Close after selection
              }}
              style={[styles.pickerOption, isSelected ? styles.selectedOption : null]}
            >
              <Text style={[styles.pickerOptionText, isSelected ? styles.selectedOptionText : null]}>
                {pickerType === 'grid' ? `${option} x ${option}` : option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );

  return (
    <View style={globalStyles.formContainer}>
      <Text style={styles.formTitle}>Select Your Choice</Text>

      {/* Grid Size Picker */}
      <TouchableOpacity onPress={() => togglePicker('grid')} style={styles.picker}>
        <Text style={styles.pickerText}>Grid Size: {gridSize} x {gridSize}</Text>
      </TouchableOpacity>
      {currentPicker === 'grid' &&
        renderPickerOptions(
          gridSizeOptions,
          gridSize,
          setGridSize,
          'grid'
        )}

      {/* Difficulty Picker */}
      <TouchableOpacity onPress={() => togglePicker('difficulty')} style={styles.picker}>
        <Text style={styles.pickerText}>Difficulty: {difficulty}</Text>
      </TouchableOpacity>
      {currentPicker === 'difficulty' &&
        renderPickerOptions(
          difficultyOptions,
          difficulty,
          setDifficulty,
          'difficulty'
        )}

      {/* Operator Picker */}
      <TouchableOpacity onPress={() => togglePicker('operator')} style={styles.picker}>
        <Text style={styles.pickerText}>Operator: {selectedOperator}</Text>
      </TouchableOpacity>
      {currentPicker === 'operator' &&
        renderPickerOptions(
          operatorOptions,
          selectedOperator,
          setSelectedOperator,
          'operator'
        )}
              {/* Input Mode Picker (Guess / Custom Keyboard) */}

        {/* <TouchableOpacity onPress={() => togglePicker('inputMode')} style={styles.picker}>
        <Text style={styles.pickerText}>Input Mode: {inputMode}</Text>
      </TouchableOpacity>
      {currentPicker === 'inputMode' &&
        renderPickerOptions(
          inputModeOptions,
          inputMode,
          setInputMode,
          'inputMode'
        )} */}

      {/* Submit Button */}
      <TouchableOpacity style={globalStyles.submitButton} onPress={handleFormSubmit}>
        <Text style={globalStyles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 40,
    color: '#2a2a2a',
  },
  picker: {
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  pickerOptionsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '90%',
    maxHeight: 150,
    marginBottom: 20,
    backgroundColor: '#fff',
    // overflow: 'hidden',
  },
  pickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#007BFF',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#007BFF',
  },
  selectedOptionText: {
    color: '#fff',
  },
});

export default Form;
