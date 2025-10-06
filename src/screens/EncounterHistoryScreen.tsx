import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Text, 
  Card, 
  Chip, 
  Divider,
  FAB,
  Searchbar,
  Button,
  IconButton,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { EncounterHistoryItem, Category } from '../types';
import { MOTHER2_COLORS, MOTHER2_STYLES } from '../styles/mother2Theme';
import TileBackground from '../components/TileBackground';

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
    <View style={[MOTHER2_STYLES.container, styles.container]}>
      {/* タイル状背景 */}
      <TileBackground />
      
      <SafeAreaView style={styles.safeArea}>
        {/* ヘッダー */}
        <Surface style={[MOTHER2_STYLES.mainWindow, styles.headerSurface]} elevation={0}>
          <Text style={[MOTHER2_STYLES.titleText, styles.headerTitle]}>すれちがい つうしん</Text>
          <Text style={[MOTHER2_STYLES.subText, styles.headerSubtitle]}>～ れきし ～</Text>
        </Surface>

        {/* 検索バー */}
        <Surface style={[MOTHER2_STYLES.mainWindow, styles.searchSurface]} elevation={0}>
          <Searchbar
            placeholder="なまえや ばしょで さがす..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={[MOTHER2_STYLES.subWindow, styles.searchBar]}
            inputStyle={styles.searchInput}
            iconColor={MOTHER2_COLORS.iconColor}
            placeholderTextColor={MOTHER2_COLORS.textLight}
          />
        </Surface>

        {/* カテゴリフィルター */}
        <Surface style={[MOTHER2_STYLES.mainWindow, styles.filterSurface]} elevation={0}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            <Surface style={[
              MOTHER2_STYLES.button, 
              styles.categoryChip, 
              selectedCategory === null && styles.selectedChip
            ]} elevation={0}>
              <Button
                mode="text"
                onPress={() => setSelectedCategory(null)}
                textColor={selectedCategory === null ? MOTHER2_COLORS.textAccent : MOTHER2_COLORS.textPrimary}
                labelStyle={MOTHER2_STYLES.smallText}
              >
                すべて
              </Button>
            </Surface>
            {categories.map((category) => (
              <Surface 
                key={category} 
                style={[
                  MOTHER2_STYLES.button, 
                  styles.categoryChip, 
                  selectedCategory === category && styles.selectedChip
                ]} 
                elevation={0}
              >
                <Button
                  mode="text"
                  onPress={() => setSelectedCategory(category)}
                  textColor={selectedCategory === category ? MOTHER2_COLORS.textAccent : MOTHER2_COLORS.textPrimary}
                  labelStyle={MOTHER2_STYLES.smallText}
                >
                  {category}
                </Button>
              </Surface>
            ))}
          </ScrollView>
          
          {(searchQuery || selectedCategory) && (
            <Surface style={[MOTHER2_STYLES.accentButton, styles.clearButtonSurface]} elevation={0}>
              <IconButton
                icon="close"
                size={16}
                iconColor={MOTHER2_COLORS.iconColor}
                onPress={clearAllFilters}
              />
            </Surface>
          )}
        </Surface>

        {/* 履歴リスト */}
        <ScrollView
          style={styles.historyList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredHistory.length === 0 ? (
            <Surface style={[MOTHER2_STYLES.textBox, styles.emptyMessageBox]} elevation={0}>
              <Text style={[MOTHER2_STYLES.titleText, styles.emptyMessageTitle]}>
                {searchQuery || selectedCategory ? 'みつからなかった...' : 'まだ だれとも すれちがって いない'}
              </Text>
              <Text style={[MOTHER2_STYLES.subText, styles.emptyMessageText]}>
                {searchQuery || selectedCategory 
                  ? 'べつの じょうけんで さがしてみよう' 
                  : 'そとに でかけて みよう！'}
              </Text>
              {(searchQuery || selectedCategory) && (
                <Surface style={MOTHER2_STYLES.accentButton} elevation={0}>
                  <Button
                    mode="text"
                    onPress={clearAllFilters}
                    textColor={MOTHER2_COLORS.textAccent}
                    labelStyle={MOTHER2_STYLES.smallText}
                  >
                    じょうけんを クリア
                  </Button>
                </Surface>
              )}
            </Surface>
          ) : (
            <>
              <Surface style={[MOTHER2_STYLES.accentButton, styles.resultCountSurface]} elevation={0}>
                <Text style={[MOTHER2_STYLES.accentText, styles.resultCountText]}>
                  {filteredHistory.length}けんの きろく が みつかった
                </Text>
              </Surface>
              
              {filteredHistory.map((item) => (
                <Surface key={item.id} style={[MOTHER2_STYLES.textBox, styles.historyMessageBox]} elevation={0}>
                  {/* ユーザー情報と日時 */}
                  <View style={styles.messageHeader}>
                    <View style={styles.userInfo}>
                      <Text style={[MOTHER2_STYLES.accentText, styles.userName]}>
                        {item.userName || `ユーザー${item.userId}`}
                      </Text>
                      <Text style={[MOTHER2_STYLES.subText, styles.location]}>
                        📍 {item.location}
                      </Text>
                    </View>
                    <Text style={[MOTHER2_STYLES.smallText, styles.dateTime]}>
                      {formatDateTime(item.encounterDateTime)}
                    </Text>
                  </View>

                  <View style={styles.messageDivider} />

                  {/* 投稿内容 */}
                  <Text style={[MOTHER2_STYLES.mainText, styles.messageText]}>
                    {item.text}
                  </Text>

                  {/* カテゴリ */}
                  <View style={styles.categoryTagContainer}>
                    {item.categories.map((category) => (
                      <Surface key={category} style={[MOTHER2_STYLES.tag, styles.categoryTag]} elevation={0}>
                        <Button
                          mode="text"
                          onPress={() => setSelectedCategory(category)}
                          textColor={MOTHER2_COLORS.textAccent}
                          labelStyle={MOTHER2_STYLES.smallText}
                        >
                          {category}
                        </Button>
                      </Surface>
                    ))}
                  </View>
                </Surface>
              ))}
            </>
          )}
        </ScrollView>

        {/* FAB */}
        <Surface style={[MOTHER2_STYLES.accentButton, styles.mapFabSurface]} elevation={0}>
          <Button
            mode="text"
            onPress={() => console.log('マップ表示')}
            textColor={MOTHER2_COLORS.textAccent}
            labelStyle={MOTHER2_STYLES.smallText}
            icon={() => <Ionicons name="map" size={16} color={MOTHER2_COLORS.textAccent} />}
          >
            マップ
          </Button>
        </Surface>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  // 基本レイアウト
  container: {
    // MOTHER2_STYLES.containerを継承
  },
  safeArea: {
    flex: 1,
  },
  
  // ヘッダー関連
  headerSurface: {
    // MOTHER2_STYLES.mainWindowを継承
  },
  headerTitle: {
    // MOTHER2_STYLES.titleTextを継承
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  
  // 検索関連
  searchSurface: {
    marginTop: 0,
  },
  searchBar: {
    // MOTHER2_STYLES.subWindowを継承
  },
  searchInput: {
    fontSize: 14,
    color: MOTHER2_COLORS.textPrimary,
  },
  
  // フィルター関連
  filterSurface: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryScroll: {
    paddingRight: 8,
  },
  categoryChip: {
    marginRight: 6,
    minHeight: 36,
    justifyContent: 'center',
  },
  selectedChip: {
    backgroundColor: MOTHER2_COLORS.warmBeige,
    borderColor: MOTHER2_COLORS.darkBeige,
  },
  clearButtonSurface: {
    marginLeft: 'auto',
    minWidth: 40,
    minHeight: 40,
  },
  
  // リスト関連
  historyList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  resultCountSurface: {
    margin: 4,
    minHeight: 36,
    justifyContent: 'center',
  },
  resultCountText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // メッセージボックス関連
  historyMessageBox: {
    margin: 4,
  },
  messageHeader: {
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
    fontSize: 16,
  },
  location: {
    fontSize: 12,
  },
  dateTime: {
    textAlign: 'right',
    fontSize: 10,
  },
  messageDivider: {
    height: 1,
    backgroundColor: MOTHER2_COLORS.mediumBeige,
    marginVertical: 8,
  },
  messageText: {
    marginBottom: 12,
  },
  categoryTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryTag: {
    minHeight: 28,
    justifyContent: 'center',
  },
  
  // 空状態
  emptyMessageBox: {
    margin: 8,
    padding: 20,
    alignItems: 'center',
  },
  emptyMessageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyMessageText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  
  // FAB
  mapFabSurface: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    minHeight: 48,
    justifyContent: 'center',
  },
});

export default EncounterHistoryScreen;