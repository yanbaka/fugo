import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import LoginButton from './src/components/LoginButton';

const App = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <AppNavigator />
        <LoginButton />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;