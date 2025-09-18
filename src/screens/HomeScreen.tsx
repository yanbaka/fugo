import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Divider } from 'react-native-paper';
import MapComponent from '../components/MapComponent';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.welcomeTitle}>
              ホーム画面
            </Text>
            <Divider style={styles.divider} />
            <Text variant="bodyMedium" style={styles.welcomeText}>
              Google マップが統合されたホーム画面です。マップをタップしてマーカーを追加できます。
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.mapWrapper}>
          <MapComponent />
        </View>
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
  welcomeCard: {
    margin: 16,
    elevation: 4,
  },
  welcomeTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  welcomeText: {
    textAlign: 'center',
    lineHeight: 22,
    color: '#666',
  },
  mapWrapper: {
    height: 500,
    marginBottom: 16,
  },
});

export default HomeScreen;