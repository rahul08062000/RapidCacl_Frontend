import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView } from 'react-native';

const LevelScreen = () => {
  const [unlockedLevel, setUnlockedLevel] = useState(1); // Default first level is open
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; // Define levels

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Get screen dimensions

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingHorizontal: screenWidth * 0.05 }]}>
        
        {/* Main content that takes up 80% of the screen */}
        <View style={[styles.contentContainer, { height: screenHeight * 0.8 }]}>
          {/* Title */}
          <Text style={styles.headerText}>Select a Level</Text>
          
          {/* Scrollable list of levels */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.levelContainer}>
              {levels.map((level, index) => {
                const isUnlocked = level <= unlockedLevel; // Check if the level is unlocked
                const isCurrentLevel = level === unlockedLevel; // Check if this is the currently unlocked level

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.levelButton,
                      isUnlocked ? styles.unlockedLevel : styles.lockedLevel, 
                      isCurrentLevel ? styles.currentLevel : null, 
                    ]}
                    onPress={() => {
                      if (isUnlocked) {
                        alert(`Level ${level} selected!`);
                      }
                    }}
                    disabled={!isUnlocked} // Disable button if the level is locked
                  >
                    <Text style={[styles.levelText, isUnlocked ? styles.unlockedText : styles.lockedText]}>
                      Level {level}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          
          {/* Button to unlock the next level */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                if (unlockedLevel < levels.length) {
                  setUnlockedLevel(unlockedLevel + 1); // Unlock the next level
                }
              }}
            >
              <Text style={styles.buttonText}>Unlock Next Level</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  levelButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  unlockedLevel: {
    backgroundColor: '#4CAF50', // Green for unlocked
    borderColor: '#388E3C',
  },
  lockedLevel: {
    backgroundColor: '#ccc', // Gray for locked levels
    borderColor: '#999',
  },
  currentLevel: {
    backgroundColor: '#FFD700', // Highlight current level in yellow
    borderColor: '#FFC107',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  unlockedText: {
    color: '#fff',
  },
  lockedText: {
    color: '#666',
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LevelScreen;
