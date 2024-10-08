import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Image } from 'react-native';
import { AppContext } from '../context/AppContext';
import useTimer from '../hooks/useTimer';

const Header = () => {
  const { time } = useTimer();
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window'); // Dynamically get the screen width

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.headerContainer, { width: screenWidth - 12, height: screenHeight * 0.06 }]}>

       {/* Logo on the right side */}
       <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/1MATHTRIX.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Timer on the left side */}
        <View style={styles.timerWrapper}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{time}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // safeArea: {
  //   marginTop: 20,
  // },
  headerContainer: {
    flexDirection: 'row', // Layout elements in a row
    justifyContent: 'space-between', // Push elements to opposite sides
    alignItems: 'center', // Center items vertically
    backgroundColor: '#4A90E2', // Blue background for header
    borderTopLeftRadius: 10, // Rounded corners for top-left
    borderTopRightRadius: 10, // Rounded corners for top-right
    paddingHorizontal: 20,
    paddingVertical: 10, // Increased vertical padding for better responsiveness
    alignSelf: 'center', // Center the header itself
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Elevation for Android shadow effect
  },
  timerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    backgroundColor: '#FFA500', // Orange background for the timer
    borderRadius: 25, // Rounded corners for timer container
    paddingHorizontal: 20, // Padding to make the timer container a bit wider
  },
  timerText: {
    fontSize: 20, // Font size for the timer text
    fontWeight: 'bold',
    color: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50, 
    height: 50,
    aspectRatio: 2,
  },
});

export default Header;
