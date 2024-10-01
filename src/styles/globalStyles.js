import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
  },
  header: {
    height: 60,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  keyboardContainer: {
    height: 200,
    justifyContent: 'flex-end',
  },
  submitButton: {
    backgroundColor: '#29387b',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
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
  },
  restartButtonText: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default globalStyles;
