import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import LoginButton from './src/components/LoginButton';
import InitialSetupModal from './src/components/InitialSetupModal';
import { UserPreferences } from './src/types';

const App = () => {
  const [showSetupModal, setShowSetupModal] = useState(true);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  const handleSetupComplete = (preferences: UserPreferences) => {
    console.log('設定完了:', preferences);
    setUserPreferences(preferences);
    setShowSetupModal(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <AppNavigator />
        <LoginButton />
        
        <InitialSetupModal
          visible={showSetupModal}
          onComplete={handleSetupComplete}
        />
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