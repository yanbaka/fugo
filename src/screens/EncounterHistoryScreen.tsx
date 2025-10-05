import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Text, 
  Card, 
  Chip, 
  Divider,
  List,
  FAB,
  Searchbar,
  Button,
  IconButton,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { EncounterHistoryItem, Category } from '../types';

const EncounterHistoryScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // サンプルデータ
  const [encounterHistory] = useState<EncounterHistoryItem[]>([
    {
      id: '1',
      text: '美味しいラーメン屋を探しています！特に豚骨ラーメンが好きです。',
      categories: ['グルメ・料理'],
      encounterDateTime: new Date('2024-01-15T14:30:00'),
      location: '渋谷区',
      userId: 'user001',
      userName: 'ラーメン太郎',
    },
    {
      id: '2',
      text: '今度京都に旅行に行きます。おすすめの観光スポットはありますか？',
      categories: ['旅行'],
      encounterDateTime: new Date('2024-01-14T11:20:00'),
      location: '新宿区',
      userId: 'user002',
      userName: '旅行好き花子',
    },
    {
      id: '3',
      text: '最新のアニメ映画について語りましょう！',
      categories: ['アニメ・漫画', '映画'],
      encounterDateTime: new Date('2024-01-13T16:45:00'),
      location: '港区',
      userId: 'user003',
      userName: 'アニメファン',
    },
    {
      id: '4',
      text: '今期のおすすめファッションブランドを教えてください',
      categories: ['ファッション'],
      encounterDateTime: new Date('2024-01-12T13:15:00'),
      location: '原宿',
      userId: 'user004',
      userName: 'おしゃれさん',
    },
    {
      id: '5',
      text: 'ジャズライブに一緒に行きませんか？',
      categories: ['音楽'],
      encounterDateTime: new Date('2024-01-11T19:30:00'),
      location: '六本木',
      userId: 'user005',
      userName: 'ジャズ愛好家',
    },
  ]);

  const categories: Category[] = [
    '旅行',
    'グルメ・料理', 
    'ファッション',
    '映画',
    '音楽',
    'アニメ・漫画'
  ];

  // フィルタリングされた履歴データ
  const filteredHistory = useMemo(() => {
    let filtered = encounterHistory;

    // テキスト検索
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.userName && item.userName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // カテゴリフィルター
    if (selectedCategory) {
      filtered = filtered.filter(item =>
        item.categories.includes(selectedCategory)
      );
    }

    // 日時順でソート（新しい順）
    return filtered.sort((a, b) => 
      b.encounterDateTime.getTime() - a.encounterDateTime.getTime()
    );
  }, [encounterHistory, searchQuery, selectedCategory]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // 実際のアプリでは、ここでAPIからデータを再取得
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const formatDateTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}時間前`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)}日前`;
    } else {
      return date.toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 検索バー */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="すれ違い履歴を検索..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
      </View>

      {/* カテゴリフィルター */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <Chip
            mode={selectedCategory === null ? 'flat' : 'outlined'}
            selected={selectedCategory === null}
            onPress={() => setSelectedCategory(null)}
            style={styles.categoryChip}
            textStyle={styles.categoryChipText}
          >
            すべて
          </Chip>
          {categories.map((category) => (
            <Chip
              key={category}
              mode={selectedCategory === category ? 'flat' : 'outlined'}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryChip}
              textStyle={styles.categoryChipText}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
        
        {(searchQuery || selectedCategory) && (
          <IconButton
            icon="close"
            size={20}
            onPress={clearAllFilters}
            style={styles.clearButton}
          />
        )}
      </View>

      {/* 履歴リスト */}
      <ScrollView
        style={styles.historyList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredHistory.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={64} color="#ccc" />
                <Text variant="titleMedium" style={styles.emptyTitle}>
                  {searchQuery || selectedCategory ? '該当する履歴がありません' : 'すれ違い履歴がありません'}
                </Text>
                <Text variant="bodyMedium" style={styles.emptyDescription}>
                  {searchQuery || selectedCategory 
                    ? '検索条件を変更してみてください' 
                    : 'すれ違い機能を有効にして外出してみましょう'}
                </Text>
                {(searchQuery || selectedCategory) && (
                  <Button
                    mode="outlined"
                    onPress={clearAllFilters}
                    style={styles.clearFiltersButton}
                  >
                    フィルターをクリア
                  </Button>
                )}
              </View>
            </Card.Content>
          </Card>
        ) : (
          <>
            <Text variant="bodySmall" style={styles.resultCount}>
              {filteredHistory.length}件のすれ違い履歴
            </Text>
            
            {filteredHistory.map((item) => (
              <Card key={item.id} style={styles.historyCard}>
                <Card.Content>
                  {/* ユーザー情報と日時 */}
                  <View style={styles.cardHeader}>
                    <View style={styles.userInfo}>
                      <Text variant="titleSmall" style={styles.userName}>
                        {item.userName || `ユーザー${item.userId}`}
                      </Text>
                      <Text variant="bodySmall" style={styles.location}>
                        📍 {item.location}
                      </Text>
                    </View>
                    <Text variant="bodySmall" style={styles.dateTime}>
                      {formatDateTime(item.encounterDateTime)}
                    </Text>
                  </View>

                  <Divider style={styles.cardDivider} />

                  {/* 投稿内容 */}
                  <Text variant="bodyMedium" style={styles.postText}>
                    {item.text}
                  </Text>

                  {/* カテゴリ */}
                  <View style={styles.chipContainer}>
                    {item.categories.map((category) => (
                      <Chip
                        key={category}
                        mode="flat"
                        style={styles.postChip}
                        textStyle={styles.postChipText}
                        onPress={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Chip>
                    ))}
                  </View>
                </Card.Content>
              </Card>
            ))}
          </>
        )}
      </ScrollView>

      {/* マップ表示FAB */}
      <FAB
        icon={() => <Ionicons name="map" size={20} color="white" />}
        style={styles.mapFab}
        onPress={() => console.log('マップ表示')}
        label="マップ"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchBar: {
    elevation: 2,
    backgroundColor: 'white',
  },
  searchInput: {
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingBottom: 8,
  },
  categoryScroll: {
    paddingRight: 16,
  },
  categoryChip: {
    marginRight: 8,
    backgroundColor: 'white',
  },
  categoryChipText: {
    fontSize: 12,
  },
  clearButton: {
    marginLeft: 'auto',
    marginRight: 8,
  },
  historyList: {
    flex: 1,
  },
  resultCount: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 8,
  },
  historyCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  location: {
    color: '#666',
  },
  dateTime: {
    color: '#999',
    textAlign: 'right',
  },
  cardDivider: {
    marginVertical: 8,
  },
  postText: {
    lineHeight: 20,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postChip: {
    margin: 2,
    backgroundColor: '#e8f5e8',
    height: 28,
  },
  postChipText: {
    fontSize: 10,
    color: '#2e7d32',
  },
  emptyCard: {
    margin: 16,
    elevation: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyDescription: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  clearFiltersButton: {
    marginTop: 8,
  },
  mapFab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#2196f3',
  },
});

export default EncounterHistoryScreen;