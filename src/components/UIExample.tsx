import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Text, Appbar, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const UIExample = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="My App" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              Welcome to Expo UI
            </Text>
            <Divider style={styles.divider} />
            <Text variant="bodyMedium" style={styles.text}>
              React Native PaperとExpo Vector
              Iconsを使用したUIコンポーネントです。
            </Text>

            <Button
              mode="contained"
              onPress={() => console.log('ボタンが押されました')}
              icon={() => <Ionicons name="heart" size={20} color="white" />}
              style={styles.button}
              buttonColor="#e74c3c"
            >
              押してください
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              その他のコンポーネント
            </Text>
            <Divider style={styles.divider} />

            <Button
              mode="outlined"
              onPress={() => console.log('アウトラインボタン')}
              icon={() => <Ionicons name="star" size={20} color="#3498db" />}
              style={styles.outlineButton}
            >
              アウトラインボタン
            </Button>

            <Button
              mode="text"
              onPress={() => console.log('テキストボタン')}
              icon={() => <Ionicons name="settings" size={20} color="#666" />}
            >
              テキストボタン
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: 10,
  },
  outlineButton: {
    marginBottom: 8,
  },
});

export default UIExample;
