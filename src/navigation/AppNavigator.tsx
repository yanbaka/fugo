import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const AppNavigator = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { 
      key: 'home', 
      title: 'ホーム', 
      focusedIcon: () => <Ionicons name="home" size={24} />,
      unfocusedIcon: () => <Ionicons name="home-outline" size={24} />
    },
    { 
      key: 'profile', 
      title: 'プロフィール', 
      focusedIcon: () => <Ionicons name="person" size={24} />,
      unfocusedIcon: () => <Ionicons name="person-outline" size={24} />
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default AppNavigator;