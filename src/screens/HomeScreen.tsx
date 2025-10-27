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
import { COLORS, STYLES } from '../styles/theme';
import { styles } from '../styles/homeScreenStyle';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

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
    'アニメ・漫画',
  ];

  // カテゴリの選択/解除を切り替える関数
  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // 特定のカテゴリを解除する関数
  const removeCategory = (category: Category) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  // フィルタリングされた履歴データ
  const filteredHistory = useMemo(() => {
    let filtered = encounterHistory;

    // テキスト検索
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.userName &&
            item.userName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // カテゴリフィルター（複数選択対応）
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.some((category) =>
          item.categories.includes(category)
        )
      );
    }

    // 日時順でソート（新しい順）
    return filtered.sort(
      (a, b) => b.encounterDateTime.getTime() - a.encounterDateTime.getTime()
    );
  }, [encounterHistory, searchQuery, selectedCategories]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const formatDateTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

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
    setSelectedCategories([]);
  };

  return (
    <View style={[STYLES.container]}>
      <SafeAreaView style={styles.safeArea}>
        {/* 検索バー */}
        <Surface
          style={[STYLES.mainWindow, styles.searchSurface]}
          elevation={0}
        >
          <Searchbar
            placeholder="名前や場所で検索..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={[STYLES.subWindow]}
            inputStyle={styles.searchInput}
            iconColor={COLORS.iconColor}
            placeholderTextColor={COLORS.textLight}
          />
        </Surface>

        {/* カテゴリフィルター */}
        <Surface
          style={[STYLES.mainWindow, styles.filterSurface]}
          elevation={0}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            <Surface
              style={[
                STYLES.button,
                selectedCategories.length === 0 && styles.selectedChip,
              ]}
              elevation={0}
            >
              <Button
                mode="text"
                onPress={() => setSelectedCategories([])}
                textColor={
                  selectedCategories.length === 0
                    ? COLORS.textAccent
                    : COLORS.textPrimary
                }
                labelStyle={STYLES.smallText}
              >
                すべて
              </Button>
            </Surface>
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <Surface
                  key={category}
                  style={[STYLES.button, isSelected && styles.selectedChip]}
                  elevation={0}
                >
                  <View style={styles.categoryButtonContainer}>
                    <Button
                      mode="text"
                      onPress={() => toggleCategory(category)}
                      textColor={
                        isSelected ? COLORS.textAccent : COLORS.textPrimary
                      }
                      labelStyle={STYLES.smallText}
                    >
                      {category}
                    </Button>
                    {isSelected && (
                      <IconButton
                        icon="close"
                        size={12}
                        iconColor={COLORS.textAccent}
                        onPress={() => removeCategory(category)}
                        style={styles.categoryCloseButton}
                      />
                    )}
                  </View>
                </Surface>
              );
            })}
          </ScrollView>
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
            <Surface
              style={[STYLES.textBox, styles.emptyMessageBox]}
              elevation={0}
            >
              <Text style={[STYLES.titleText, styles.emptyMessageTitle]}>
                {searchQuery || selectedCategories.length > 0
                  ? '見つかりませんでした'
                  : 'まだ誰ともすれ違っていません'}
              </Text>
              <Text style={[STYLES.subText, styles.emptyMessageText]}>
                {searchQuery || selectedCategories.length > 0
                  ? '別の条件で検索してみましょう'
                  : '外に出かけてみましょう！'}
              </Text>
              {(searchQuery || selectedCategories.length > 0) && (
                <Surface style={STYLES.accentButton} elevation={0}>
                  <Button
                    mode="text"
                    onPress={clearAllFilters}
                    textColor={COLORS.textAccent}
                    labelStyle={STYLES.smallText}
                  >
                    条件をクリア
                  </Button>
                </Surface>
              )}
            </Surface>
          ) : (
            <>
              <Surface
                style={[STYLES.accentButton, styles.resultCountSurface]}
                elevation={0}
              >
                <Text style={[STYLES.accentText, styles.resultCountText]}>
                  {filteredHistory.length}件の記録が見つかりました
                </Text>
              </Surface>

              {filteredHistory.map((item) => (
                <Surface
                  key={item.id}
                  style={[STYLES.textBox, styles.historyMessageBox]}
                  elevation={0}
                >
                  {/* ユーザー情報と日時 */}
                  <View style={styles.messageHeader}>
                    <View style={styles.userInfo}>
                      <Text style={[STYLES.accentText, styles.userName]}>
                        {item.userName || `ユーザー${item.userId}`}
                      </Text>
                      <Text style={[STYLES.subText, styles.location]}>
                        📍 {item.location}
                      </Text>
                    </View>
                    <Text style={[STYLES.smallText, styles.dateTime]}>
                      {formatDateTime(item.encounterDateTime)}
                    </Text>
                  </View>

                  <View style={styles.messageDivider} />

                  {/* 投稿内容 */}
                  <Text style={[STYLES.mainText, styles.messageText]}>
                    {item.text}
                  </Text>

                  {/* カテゴリ */}
                  <View style={styles.categoryTagContainer}>
                    {item.categories.map((category) => (
                      <Surface
                        key={category}
                        style={[STYLES.tag]}
                        elevation={0}
                      >
                        <Button
                          mode="text"
                          onPress={() => toggleCategory(category)}
                          textColor={COLORS.textPrimary}
                          labelStyle={STYLES.smallText}
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
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
