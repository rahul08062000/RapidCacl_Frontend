import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { AppProvider, AppContext } from './src/context/AppContext';
import Header from './src/components/Header';
import Form from './src/components/Form/Form';
import Grid from './src/components/Grid/Grid';
import CustomKeyboard from './src/components/CustomKeyboard';
import GuessModeKeyboard from './src/components/GuessModeKeyboard';
import Scoreboard from './src/components/Scoreboard'; // Import your Scoreboard component

const MainContent = () => {
  const { inputMode, showScoreboard } = useContext(AppContext);

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

      {/* Form right below the grid */}
      <View style={styles.formContainer}>
        <Form />
      </View>

      {/* Keyboard section at the bottom */}
      <View style={styles.keyboardContainer}>
        {inputMode === 'CustomKeyboard' ? (
          <CustomKeyboard />
        ) : (
          <GuessModeKeyboard />
        )}
      </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  gridContainer: {
    flex: 3, // Take 3/6 of the available space
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 0.8, // Increase the height of the form to make it more prominent
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    paddingVertical: 10, // Reduce any unnecessary margin or padding
    marginVertical:10,
    zIndex:0
  },
  keyboardContainer: {
    height: 200, // Fixed height for the keyboard container
    justifyContent: 'center',
    marginVertical:25
  },
});

export default App;
