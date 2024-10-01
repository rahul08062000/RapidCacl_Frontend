import React, { useContext, useRef, useEffect } from 'react';
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
    handleAutoSubmit, // Use handleAutoSubmit instead of handleSubmitButton
    handleRestart,
    setShowScoreboard
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

  const handleInputChange = (text) => {
    const cellKey = `${focusRowIndex},${focusColIndex}`;
    let currentCellValue = inputValues[cellKey] || '';

    const expectedValue = expectedValues[cellKey];
    const expectedValueLength = expectedValue ? expectedValue.toString().length : 0;

    if (text === 'C') {
      currentCellValue = '';
    } else if (text === 'del') {
      currentCellValue = currentCellValue.slice(0, -1);
    } else {
      currentCellValue += text;
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [cellKey]: currentCellValue,
    }));

    setVisitedCells((prev) => new Set(prev).add(cellKey));

    if (currentCellValue.length === expectedValueLength) {
      switchToRandomUnvisitedCell();
    }
  };

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
    { label: 'C', color: '#f1f1f0' },
    { label: '0', color: '#eceefe' },
    { label: '.', color: '#f1f1f0' }
  ];

  const handleViewScoreboard = () => {
    setShowScoreboard(true);
  };

  return (
    <View style={styles.keyboard}>
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
        <TouchableOpacity style={[styles.key, styles.iconButton, { backgroundColor: '#f1f1f0' }]} onPress={() => handleInputChange('del')}>
          <Ionicons name="backspace-outline" size={24} color="#003366" />
        </TouchableOpacity>
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
        <TouchableOpacity style={[styles.key, { backgroundColor: '#f1f1f0' }]} onPress={() => handleInputChange('.')}>
          <Text style={styles.keyText}>.</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={[styles.key, { backgroundColor: '#f1f1f0' }]} onPress={() => handleInputChange('-')}>
          <Text style={styles.keyText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.key, { backgroundColor: '#f1f1f0' }]}
          onPress={() => handleInputChange('C')}
        >
          <Text style={styles.keyText}>C</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.key, { backgroundColor: '#eceefe' }]}
          onPress={() => handleInputChange('0')}
        >
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>

        {isSubmitted ? (
              <TouchableOpacity style={styles.viewScoreboardButton} onPress={handleViewScoreboard}>
                <Animated.Text style={[styles.restartButtonText, { opacity: blinkAnim }]}>
                  View Scoreboard
                </Animated.Text>
              </TouchableOpacity>
            ): (
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: isSubmitEnabled ? '#29387b' : '#d3d3d3' },
            ]}
            disabled={!isSubmitEnabled}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  key: {
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#eceefe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  keyText: {
    fontSize: 20,
    color: '#003366',
  },
  submitButton: {
    backgroundColor: '#29387b',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 'auto',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  restartButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 'auto',
  },
  restartButtonText: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconButton: {
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomKeyboard;
