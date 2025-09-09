import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UIExample from '../components/UIExample';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UIExample />
    </SafeAreaView>
  );
};

export default HomeScreen;