// import React, { useContext } from 'react';
// import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
// import { AppProvider, AppContext } from './src/context/AppContext';
// import Header from './src/components/Header';
// import Form from './src/components/Form/Form';
// import Grid from './src/components/Grid/Grid';
// import CustomKeyboard from './src/components/CustomKeyboard';
// import GuessModeKeyboard from './src/components/GuessModeKeyboard';
// import Scoreboard from './src/components/Scoreboard'; 
// import LevelScreen from './src/components/LevelScreen ';
// import TabContent from './src/components/TabContent';

// const { height } = Dimensions.get('window'); 

// const MainContent = () => {
//   const { inputMode, showScoreboard,isGameStarted } = useContext(AppContext);

//   // return <LevelScreen/>

//   // Show the Scoreboard if showScoreboard is true
//   if (showScoreboard) {
//     return <Scoreboard />;
//   }

//   return (
//     <View style={styles.mainContentContainer}>
//     {/* Grid at the top */}
//     <View style={styles.gridContainer}>
//       <Grid />
//     </View>

//     {/* Form or keyboard section based on the game state */}
//     {!isGameStarted ? (
//       <View>
//       <View style={styles.formContainer}>
//         <Form />
//       </View>
//       <TabContent/>
//       </View>
//     ) : (
//       <View style={styles.keyboardContainer}>
//         {inputMode === 'CustomKeyboard' ? <CustomKeyboard /> : <GuessModeKeyboard />}
//       </View>
//     )}
//   </View>
//   );
// };

// const AppContent = () => {
//   const { isFormVisible, showScoreboard } = useContext(AppContext);

//   return (
//     <SafeAreaView style={styles.safeAreaContainer}>
//       {/* Render Header only when the form is not visible and scoreboard is not shown */}
//       {!isFormVisible && !showScoreboard && <Header />}
//       <MainContent />
//     </SafeAreaView>
//   );
// };

// const App = () => {
//   return (
//     <AppProvider>
//       <SafeAreaView style={styles.safeAreaContainer}>
//         <AppContent />
//       </SafeAreaView>
//     </AppProvider>
//   );
// };

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   mainContentContainer: {
//     flex: 1,
//     justifyContent: 'flex-start', 
//     backgroundColor: '#f0f0f0',
//   },
//   gridContainer: {
//     flex: 5, 
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   formContainer: {
//     flex: 1, 
//     marginBottom:height * 0.37,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f7f7f7',
//   },
//   keyboardContainer: {
//     height: height * 0.30, 
//     justifyContent: 'center',
//     marginVertical: 15,
//   },
// });

// export default App;

import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { AppProvider, AppContext } from './src/context/AppContext';
import Header from './src/components/Header';
import Form from './src/components/Form/Form';
import Grid from './src/components/Grid/Grid';
import CustomKeyboard from './src/components/CustomKeyboard';
import GuessModeKeyboard from './src/components/GuessModeKeyboard';
import Scoreboard from './src/components/Scoreboard'; 
import TabContent from './src/components/TabContent';
import LevelScreen from './src/components/LevelScreen ';

const { height } = Dimensions.get('window'); 

const MainContent = () => {
  const { inputMode, showScoreboard, isGameStarted } = useContext(AppContext);

  // return <LevelScreen/>

  // Show the Scoreboard if showScoreboard is true
  if (showScoreboard) {
    return <Scoreboard />;
  }

  return (
    <View style={styles.mainContentContainer}>
      {/* Grid at the top */}
      <View style={styles.gridContainer}>
        <Grid />
      </View>

      {/* Form or keyboard section based on the game state */}
      {!isGameStarted ? (
        <View style={styles.formAndTabContainer}>
          <View style={styles.formContainer}>
            <Form />
          </View>
          {/* TabContent below the form */}
          {/* <View style={styles.tabContentContainer}>
            <TabContent />
          </View> */}
        </View>
      ) : (
        <View style={styles.keyboardContainer}>
          {inputMode === 'CustomKeyboard' ? <CustomKeyboard /> : <GuessModeKeyboard />}
        </View>
      )}
    </View>
  );
};

const AppContent = () => {
  const { isFormVisible, showScoreboard } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Render Header only when the form is not visible and scoreboard is not shown */}
      {!isFormVisible && !showScoreboard && <Header />}
      <MainContent />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <AppContent />
      </SafeAreaView>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  mainContentContainer: {
    flex: 1,
    justifyContent: 'flex-start', 
    backgroundColor: 'white',
  },
  gridContainer: {
    flex: 3, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formAndTabContainer: {
    flex: 3, 
    justifyContent: 'flex-start',
  },
  formContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  tabContentContainer: {
    flex: 2, 
  },
  keyboardContainer: {
    height: height * 0.30, 
    justifyContent: 'center',
    marginVertical: 15,
  },
});

export default App;

// import React, { useContext } from 'react';
// import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
// import { AppProvider, AppContext } from './src/context/AppContext';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Header from './src/components/Header';
// import Grid from './src/components/Grid/Grid';
// import CustomKeyboard from './src/components/CustomKeyboard';
// import GuessModeKeyboard from './src/components/GuessModeKeyboard';
// import Scoreboard from './src/components/Scoreboard';
// import LevelScreen from './src/components/LevelScreen ';

// const { height } = Dimensions.get('window');

// const MainContent = () => {
//   const { isGameStarted, inputMode, showScoreboard } = useContext(AppContext);

//   if (showScoreboard) {
//     return <Scoreboard />;
//   }

//   if (!isGameStarted) {
//     return <LevelScreen />;
//   }

//   return (
//     <View style={styles.mainContentContainer}>
//       <View style={styles.gridContainer}>
//         <Grid />
//       </View>
//       <View style={styles.keyboardContainer}>
//         {inputMode === 'CustomKeyboard' ? <CustomKeyboard /> : <GuessModeKeyboard />}
//       </View>
//     </View>
//   );
// };

// const AppContent = () => {
//   const { isFormVisible, showScoreboard } = useContext(AppContext);

//   return (
//     <SafeAreaView style={styles.safeAreaContainer}>
//       {!isFormVisible && !showScoreboard && <Header />}
//       <MainContent />
//     </SafeAreaView>
//   );
// };

// const App = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//     <AppProvider>
//       <SafeAreaView style={styles.safeAreaContainer}>
//         <AppContent />
//       </SafeAreaView>
//     </AppProvider>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   mainContentContainer: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     backgroundColor: '#f0f0f0',
//   },
//   gridContainer: {
//     flex: 3,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   keyboardContainer: {
//     height: height * 0.30,
//     justifyContent: 'center',
//     marginVertical: 15,
//   },
// });

// export default App;


