// import React, { useContext,useEffect } from 'react';
// import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
// import { AppContext } from '../context/AppContext';
// import useTimer from '../hooks/useTimer';

// const Header = () => {
//   const { isSubmitted, handleRestart } = useContext(AppContext);
//   const { time, resetTimer } = useTimer();

//  // console.log("Header component is rendering")

//   // useEffect(() => {
//   //   if (handleRestart) {
//   //     resetTimer(); 
//   //   }
//   // }, [handleRestart]);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.headerContainer}>
//         <View style={styles.timerWrapper}>
//           <View style={styles.timerContainer}>
//             <Text style={styles.timerText}>{time}</Text>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// // Get screen dimensions to match the grid and header width
// const { width: screenWidth } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   safeArea: {
//     marginTop: 20,
//   },
//   headerContainer: {
//     width: screenWidth - 12, // Full width of the screen minus padding
//     backgroundColor: '#4A90E2', // Blue background for header
//     borderTopLeftRadius: 10, // Rounded corners for top-left
//     borderTopRightRadius: 10, // Rounded corners for top-right
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     justifyContent: 'center', // Align content to the center
//     alignItems: 'center', // Center align the time
//     alignSelf: 'center', // Center the header itself
//     shadowColor: '#000', // Add shadow for depth
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 6, // Elevation for Android shadow effect
//   },
//   timerWrapper: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%', // Take up full width of the header
//   },
//   timerContainer: {
//     backgroundColor: '#FFA500', // Orange background for the timer
//     borderRadius: 25, // Rounded corners for timer container
//     paddingHorizontal: 20, // Padding to make the timer container a bit wider
//   },
//   timerText: {
//     fontSize: 20, // Font size for the timer text
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });

// export default Header;

import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext';
import useTimer from '../hooks/useTimer';

const Header = () => {
  const { time } = useTimer();
  const { width: screenWidth } = Dimensions.get('window'); // Dynamically get the screen width

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.headerContainer, { width: screenWidth - 12 }]}>
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
    backgroundColor: '#4A90E2', // Blue background for header
    borderTopLeftRadius: 10, // Rounded corners for top-left
    borderTopRightRadius: 10, // Rounded corners for top-right
    paddingHorizontal: 20,
    paddingVertical: 10, // Increased vertical padding for better responsiveness
    justifyContent: 'center', // Align content to the center
    alignItems: 'center', // Center align the time
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
    width: '100%', // Take up full width of the header
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
});

export default Header;


