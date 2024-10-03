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
  const { isFormVisible, inputMode, showScoreboard } = useContext(AppContext);

  // Show the Scoreboard if showScoreboard is true
  if (showScoreboard) {
    return <Scoreboard />;
  }

  return (
    <View style={styles.container}>
      {isFormVisible ? (
        <Form />
      ) : (
        <>
          <Grid />
          <View style={styles.keyboardContainer}>
            {inputMode === 'CustomKeyboard' ? (
              <CustomKeyboard />
            ) : (
              <GuessModeKeyboard />
            )}
          </View>
        </>
      )}
    </View>
  );
};

const AppContent = () => {
  const { isFormVisible, showScoreboard } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Render Header only when the form is not visible */}
      {!isFormVisible && !showScoreboard && <Header />}
      <MainContent />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <AppProvider>
      {/* SafeAreaView ensures safe display across devices */}
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
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  keyboardContainer: {
    height: 200,
    justifyContent: 'flex-end',
  },
});

export default App;
