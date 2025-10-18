import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import {
  Portal,
  Modal,
  Surface,
  Text,
  Button,
  Checkbox,
  TextInput,
  Card,
  IconButton,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Category, PostInfo, UserPreferences } from '../types';

const { height } = Dimensions.get('window');

interface InitialSetupModalProps {
  visible: boolean;
  onComplete: (preferences: UserPreferences) => void;
}

const CATEGORIES: Category[] = [
  '旅行',
  'グルメ・料理',
  'ファッション',
  '映画',
  '音楽',
  'アニメ・漫画',
];

const InitialSetupModal: React.FC<InitialSetupModalProps> = ({
  visible,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [interestCategories, setInterestCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<PostInfo[]>([
    { id: '1', text: '', categories: [] },
    { id: '2', text: '', categories: [] },
    { id: '3', text: '', categories: [] },
  ]);

  const toggleInterestCategory = useCallback((category: Category) => {
    setInterestCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const togglePostCategory = useCallback(
    (postId: string, category: Category) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                categories: post.categories.includes(category)
                  ? post.categories.filter((c) => c !== category)
                  : [...post.categories, category],
              }
            : post
        )
      );
    },
    []
  );

  // updatePostText関数を安定化
  const updatePostText = useCallback((postId: string, text: string) => {
    setPosts((prev) => {
      return prev.map((post) => {
        if (post.id === postId) {
          return { ...post, text };
        }
        return post;
      });
    });
  }, []);

  const addNewPost = useCallback(() => {
    const newId = (posts.length + 1).toString();
    setPosts((prev) => [...prev, { id: newId, text: '', categories: [] }]);
  }, [posts.length]);

  const removePost = useCallback(
    (postId: string) => {
      if (posts.length > 1) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      }
    },
    [posts.length]
  );

  const handleNext = useCallback(() => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  }, [currentStep]);

  const handleComplete = useCallback(() => {
    const preferences: UserPreferences = {
      interests: { categories: interestCategories },
      posts: posts.filter((post) => post.text.trim() !== ''),
    };
    onComplete(preferences);
  }, [interestCategories, posts, onComplete]);

  // バリデーション結果をメモ化
  const isStep1Valid = useMemo(() => {
    return interestCategories.length > 0;
  }, [interestCategories]);

  // ステップ2は常にバリデーション通過（入力内容に関わらず）
  const isStep2Valid = true;

  // PostItem コンポーネントをメモ化
  const PostItem = useCallback(
    ({ post, index }: { post: PostInfo; index: number }) => (
      <Card key={post.id} style={styles.postCard}>
        <Card.Content>
          <View style={styles.postHeader}>
            <Text variant="titleSmall">投稿 {index + 1}</Text>
            {posts.length > 1 && (
              <IconButton
                icon="close"
                size={20}
                onPress={() => removePost(post.id)}
              />
            )}
          </View>

          <TextInput
            key={`textinput-${post.id}`}
            label="発信したい内容（任意）"
            // value={post.text}
            onChangeText={(text) => updatePostText(post.id, text)}
            multiline
            numberOfLines={3}
            style={styles.textInput}
            mode="outlined"
            blurOnSubmit={false}
            returnKeyType="done"
          />

          <Text variant="bodySmall" style={styles.categoryLabel}>
            関連カテゴリ:
          </Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((category) => (
              <View key={category} style={styles.checkboxItem}>
                <Checkbox
                  status={
                    post.categories.includes(category) ? 'checked' : 'unchecked'
                  }
                  onPress={() => togglePostCategory(post.id, category)}
                />
                <Text
                  variant="bodySmall"
                  style={styles.checkboxLabel}
                  onPress={() => togglePostCategory(post.id, category)}
                >
                  {category}
                </Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    ),
    [posts.length, updatePostText, removePost, togglePostCategory]
  );

  // フッターボタンコンポーネントをメモ化
  const FooterButtons = useMemo(() => {
    if (currentStep === 1) {
      return (
        <Button
          mode="contained"
          onPress={handleNext}
          disabled={!isStep1Valid}
          style={styles.footerButton}
          contentStyle={styles.buttonContent}
        >
          次へ
        </Button>
      );
    } else {
      return (
        <View style={styles.footerButtons}>
          <Button
            mode="outlined"
            onPress={() => setCurrentStep(1)}
            style={[styles.footerButton, styles.backButton]}
            contentStyle={styles.buttonContent}
          >
            戻る
          </Button>
          <Button
            mode="contained"
            onPress={handleComplete}
            disabled={!isStep2Valid}
            style={styles.footerButton}
            contentStyle={styles.buttonContent}
          >
            完了
          </Button>
        </View>
      );
    }
  }, [currentStep, isStep1Valid, isStep2Valid, handleNext, handleComplete]);

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.modalContainer}
      >
        <Surface style={styles.modalSurface} elevation={4}>
          {/* ヘッダー */}
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.title}>
              すれ違い設定
            </Text>
            <Text variant="bodySmall" style={styles.stepIndicator}>
              ステップ {currentStep} / 2
            </Text>
          </View>

          <Divider />

          {/* コンテンツ部分 */}
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {currentStep === 1 ? (
              // ステップ1: 興味のあるカテゴリ
              <View style={styles.step}>
                <Text variant="titleMedium" style={styles.stepTitle}>
                  興味のあるカテゴリ
                </Text>
                <Text variant="bodySmall" style={styles.stepDescription}>
                  興味のあるカテゴリを選択してください（複数選択可）
                </Text>

                <View style={styles.categoryContainer}>
                  {CATEGORIES.map((category) => (
                    <View key={category} style={styles.checkboxItem}>
                      <Checkbox
                        status={
                          interestCategories.includes(category)
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => toggleInterestCategory(category)}
                      />
                      <Text
                        variant="bodyMedium"
                        style={styles.checkboxLabel}
                        onPress={() => toggleInterestCategory(category)}
                      >
                        {category}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              // ステップ2: 発信したい情報
              <View style={styles.step}>
                <Text variant="titleMedium" style={styles.stepTitle}>
                  自分が発信したい情報
                </Text>
                <Text variant="bodySmall" style={styles.stepDescription}>
                  発信したい内容とカテゴリを設定してください（任意）
                </Text>

                {posts.map((post, index) => (
                  <PostItem key={post.id} post={post} index={index} />
                ))}

                <Button
                  mode="outlined"
                  onPress={addNewPost}
                  icon={() => <Ionicons name="add" size={20} color="#2196f3" />}
                  style={styles.addButton}
                >
                  投稿を追加
                </Button>
              </View>
            )}
          </ScrollView>

          {/* フッター */}
          <Divider />
          <View style={styles.footer}>{FooterButtons}</View>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 10,
    marginTop: 50,
    marginBottom: 50,
  },
  modalSurface: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: height * 0.8,
    flexDirection: 'column',
  },
  header: {
    padding: 16,
    alignItems: 'center',
    minHeight: 80,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepIndicator: {
    color: '#666',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  step: {
    padding: 16,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDescription: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    flex: 1,
  },
  postCard: {
    marginBottom: 16,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  textInput: {
    marginBottom: 12,
  },
  categoryLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  addButton: {
    marginTop: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    minHeight: 80,
    justifyContent: 'center',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    flex: 1,
    minHeight: 48,
  },
  buttonContent: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
});

export default InitialSetupModal;
