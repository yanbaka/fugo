import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log('ログインボタンが押されました');

    if (isLoggedIn) {
      // ログアウト処理
      setIsLoggedIn(false);
      console.log('ログアウトしました');
      // ここに実際のログアウト処理を追加
    } else {
      // ログイン処理
      setIsLoggedIn(true);
      console.log('ログインしました');
      // ここに実際のログイン処理を追加
    }
  };

  return (
    <FAB
      icon={() => (
        <Ionicons
          name={isLoggedIn ? 'log-out-outline' : 'log-in-outline'}
          size={16}
          color="#666"
        />
      )}
      style={styles.loginFab}
      onPress={handleLogin}
      mode="flat"
      size="small"
      customSize={36}
      label={isLoggedIn ? 'ログアウト' : 'ログイン'}
    />
  );
};

const styles = StyleSheet.create({
  loginFab: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'white',
    zIndex: 1000,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

export default LoginButton;
