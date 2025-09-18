import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Avatar, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Icon size={80} icon="account" style={styles.avatar} />
            <Text variant="headlineSmall" style={styles.name}>
              田中 太郎
            </Text>
            <Text variant="bodyMedium" style={styles.email}>
              tanaka@example.com
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              アカウント設定
            </Text>
            <Divider style={styles.divider} />
            
            <Button
              mode="outlined"
              onPress={() => console.log('プロフィール編集')}
              icon={() => <Ionicons name="person-outline" size={20} color="#666" />}
              style={styles.menuButton}
            >
              プロフィール編集
            </Button>

            <Button
              mode="outlined"
              onPress={() => console.log('設定')}
              icon={() => <Ionicons name="settings-outline" size={20} color="#666" />}
              style={styles.menuButton}
            >
              設定
            </Button>

            <Button
              mode="outlined"
              onPress={() => console.log('ヘルプ')}
              icon={() => <Ionicons name="help-circle-outline" size={20} color="#666" />}
              style={styles.menuButton}
            >
              ヘルプ
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={() => console.log('ログアウト')}
              icon={() => <Ionicons name="log-out-outline" size={20} color="white" />}
              buttonColor="#e74c3c"
            >
              ログアウト
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
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
  profileCard: {
    margin: 16,
    elevation: 4,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: '#3498db',
  },
  name: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  email: {
    color: '#666',
  },
  card: {
    margin: 16,
    marginTop: 0,
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  menuButton: {
    marginBottom: 8,
    justifyContent: 'flex-start',
  },
});

export default ProfileScreen;