import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';
import useTimer from '../hooks/useTimer';
import { Ionicons } from '@expo/vector-icons'; 

const Header = () => {
  const { setIsGameStarted, isSubmitted } = useContext(AppContext);
  const { time, startTimer, pauseTimer, resetTimer, isRunning } = useTimer(); 
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window'); 

  const [hasStarted, setHasStarted] = useState(false); 
  const [isPaused, setIsPaused] = useState(false); 

  const handleStart = () => {
    if (!isSubmitted) { // Check if the game is not submitted
      setHasStarted(true);
      setIsGameStarted(true);
      startTimer(); 
    }
  };

  const togglePause = () => {
    if (isPaused) {
      startTimer(); // Resume timer
      setIsGameStarted(true);
    } else {
      pauseTimer(); // Pause timer
      setIsGameStarted(false);
    }
    setIsPaused(!isPaused); // Toggle pause state
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.headerContainer, { width: screenWidth * 0.98, height: screenHeight * 0.06 }]}>
        
        {/* Logo on the left side */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/1MATHTRIX.png')}
            style={[styles.logo, { width: screenWidth * 0.18, height: screenHeight * 0.04 }]}
            resizeMode="contain"
          />
        </View>

        {/* Start Button or Timer with Pause Button */}
        <View style={styles.timerWrapper}>
          {!hasStarted && !isSubmitted ? (
            <TouchableOpacity style={[styles.startButton, { paddingHorizontal: screenWidth * 0.04 }]} onPress={handleStart}>
              <Text style={[styles.startButtonText, { fontSize: screenWidth * 0.04 }]}>Start</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.timerContainer, { paddingHorizontal: screenWidth * 0.03 }]}>
              <Text style={[styles.timerText, { fontSize: screenWidth * 0.04 }]}>{time}</Text>
              {!isSubmitted && (
                <TouchableOpacity onPress={togglePause} style={styles.pauseButton}>
                  <Ionicons 
                    name={isPaused ? 'play-outline' : 'pause-outline'} 
                    size={screenWidth * 0.05} 
                    color="#fff" 
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // marginTop:35,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#4A90E2', 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
    paddingHorizontal: 15, // Adjusted padding
    paddingVertical: 8, // Adjusted padding
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, 
  },
  timerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', 
  },
  timerContainer: {
    flexDirection: 'row', 
    backgroundColor: '#FFA500', 
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10, 
  },
  startButton: {
    backgroundColor: '#FFA500', 
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  pauseButton: {
    borderRadius: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // width and height dynamically set in the render method based on screen size
  },
});

export default Header;
