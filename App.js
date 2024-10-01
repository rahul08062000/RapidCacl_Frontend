import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { AppProvider, AppContext } from './src/context/AppContext';
import Header from './src/components/Header';
import Form from './src/components/Form/Form';
import Grid from './src/components/Grid/Grid';
import CustomKeyboard from './src/components/CustomKeyboard';
import GuessModeKeyboard from './src/components/GuessModeKeyboard';


const MainContent = () => {
  const { isFormVisible, inputMode  } = useContext(AppContext);

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
  const { isFormVisible } = useContext(AppContext);

  return (
    <>
      {/* Render Header only when the form is not visible */}
      {!isFormVisible && <Header />}
      <MainContent />
    </>
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
