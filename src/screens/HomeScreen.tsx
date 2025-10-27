import React, { useState, useMemo } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  Searchbar,
  Button,
  IconButton,
  Surface,
} from 'react-native-paper';
import { EncounterHistoryItem, Category } from '../types';
import { COLORS, STYLES } from '../styles/theme';
import { styles } from '../styles/homeScreenStyle';
import { mockEncounterHistory } from '../data/sampleData';
import { categories, CategoryWithIcon } from '../data/categories';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // サンプルデータ
  const [encounterHistory] =
    useState<EncounterHistoryItem[]>(mockEncounterHistory);

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
            {categories.map((categoryObj: CategoryWithIcon) => {
              const isSelected = selectedCategories.includes(categoryObj.name);
              return (
                <Surface
                  key={categoryObj.name}
                  style={[STYLES.button, isSelected && styles.selectedChip]}
                  elevation={0}
                >
                  <View style={styles.categoryButtonContainer}>
                    <Button
                      mode="text"
                      icon={categoryObj.icon}
                      onPress={() => toggleCategory(categoryObj.name)}
                      textColor={
                        isSelected ? COLORS.textAccent : COLORS.textPrimary
                      }
                      labelStyle={STYLES.smallText}
                    >
                      {categoryObj.name}
                    </Button>
                    {isSelected && (
                      <IconButton
                        icon="close"
                        size={12}
                        iconColor={COLORS.textAccent}
                        onPress={() => removeCategory(categoryObj.name)}
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
