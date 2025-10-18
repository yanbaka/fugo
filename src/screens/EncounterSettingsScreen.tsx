import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  Card,
  Button,
  Switch,
  Divider,
  List,
  IconButton,
  Chip,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import InitialSetupModal from '../components/InitialSetupModal';
import { UserPreferences, Category } from '../types';

const EncounterSettingsScreen = () => {
  const [isEncounterEnabled, setIsEncounterEnabled] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    interests: {
      categories: ['旅行', 'グルメ・料理'],
    },
    posts: [
      {
        id: '1',
        text: '美味しいカフェを探しています！',
        categories: ['グルメ・料理'],
      },
      {
        id: '2',
        text: '週末の旅行先を相談したいです',
        categories: ['旅行'],
      },
    ],
  });

  const handlePreferencesUpdate = useCallback(
    (preferences: UserPreferences) => {
      console.log('設定更新:', preferences);
      setUserPreferences(preferences);
      setShowSetupModal(false);
    },
    []
  );

  const toggleEncounter = useCallback(() => {
    setIsEncounterEnabled((prev) => !prev);
  }, []);

  const toggleNotification = useCallback(() => {
    setNotificationEnabled((prev) => !prev);
  }, []);

  const openSetupModal = useCallback(() => {
    setShowSetupModal(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* すれ違い機能の設定 */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              すれ違い機能
            </Text>
            <Divider style={styles.divider} />

            <List.Item
              title="すれ違い機能を有効にする"
              description="近くにいる人との情報交換を可能にします"
              left={(props) => (
                <List.Icon {...props} icon="account-multiple" color="#2196f3" />
              )}
              right={() => (
                <Switch
                  value={isEncounterEnabled}
                  onValueChange={toggleEncounter}
                />
              )}
            />

            <List.Item
              title="すれ違い通知"
              description="新しいすれ違いがあった時に通知します"
              left={(props) => (
                <List.Icon {...props} icon="bell" color="#ff9800" />
              )}
              right={() => (
                <Switch
                  value={notificationEnabled}
                  onValueChange={toggleNotification}
                  disabled={!isEncounterEnabled}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* 現在の興味・関心 */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                あなたの興味・関心
              </Text>
              <IconButton icon="pencil" size={20} onPress={openSetupModal} />
            </View>
            <Divider style={styles.divider} />

            <View style={styles.chipContainer}>
              {userPreferences.interests.categories.map((category) => (
                <Chip
                  key={category}
                  mode="outlined"
                  style={styles.chip}
                  textStyle={styles.chipText}
                >
                  {category}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* 発信したい情報 */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                発信したい情報
              </Text>
              <IconButton icon="pencil" size={20} onPress={openSetupModal} />
            </View>
            <Divider style={styles.divider} />

            {userPreferences.posts.length > 0 ? (
              userPreferences.posts.map((post, index) => (
                <Card key={post.id} style={styles.postCard}>
                  <Card.Content>
                    <Text variant="titleSmall" style={styles.postTitle}>
                      投稿 {index + 1}
                    </Text>
                    <Text variant="bodyMedium" style={styles.postText}>
                      {post.text}
                    </Text>
                    <View style={styles.chipContainer}>
                      {post.categories.map((category) => (
                        <Chip
                          key={category}
                          mode="flat"
                          style={styles.smallChip}
                          textStyle={styles.smallChipText}
                        >
                          {category}
                        </Chip>
                      ))}
                    </View>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Text variant="bodyMedium" style={styles.emptyText}>
                発信したい情報が設定されていません
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* プライバシー設定 */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              プライバシー設定
            </Text>
            <Divider style={styles.divider} />

            <List.Item
              title="すれ違い履歴を確認"
              description="過去のすれ違い記録を表示します"
              left={(props) => (
                <List.Icon {...props} icon="history" color="#2196f3" />
              )}
              right={(props) => <IconButton {...props} icon="chevron-right" />}
              onPress={() => console.log('すれ違い履歴画面へ遷移')}
            />

            <List.Item
              title="位置情報の共有範囲"
              description="100m以内"
              left={(props) => (
                <List.Icon {...props} icon="map-marker" color="#4caf50" />
              )}
              right={(props) => <IconButton {...props} icon="chevron-right" />}
              onPress={() => console.log('位置情報設定')}
            />

            <List.Item
              title="すれ違い履歴の保存期間"
              description="30日間"
              left={(props) => (
                <List.Icon {...props} icon="clock" color="#9c27b0" />
              )}
              right={(props) => <IconButton {...props} icon="chevron-right" />}
              onPress={() => console.log('履歴設定')}
            />
          </Card.Content>
        </Card>

        {/* 設定の再設定ボタン */}
        <Card style={styles.card}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={openSetupModal}
              icon={() => <Ionicons name="settings" size={20} color="white" />}
              style={styles.resetButton}
            >
              興味・発信情報を再設定する
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* すれ違い設定モーダル */}
      <InitialSetupModal
        visible={showSetupModal}
        onComplete={handlePreferencesUpdate}
      />
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
  card: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    margin: 4,
    backgroundColor: '#e3f2fd',
  },
  chipText: {
    fontSize: 12,
    color: '#1976d2',
  },
  postCard: {
    marginBottom: 12,
    elevation: 1,
    backgroundColor: '#fafafa',
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  postText: {
    marginBottom: 8,
    lineHeight: 20,
  },
  smallChip: {
    margin: 2,
    backgroundColor: '#fff3e0',
    height: 28,
  },
  smallChipText: {
    fontSize: 10,
    color: '#f57c00',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  resetButton: {
    marginTop: 8,
  },
});

export default EncounterSettingsScreen;
