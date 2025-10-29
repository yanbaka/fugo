import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const styles = StyleSheet.create({
  // 基本レイアウト
  safeArea: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },

  // 検索関連
  searchSurface: {
    marginTop: 0,
  },
  searchInput: {
    fontSize: 14,
    color: COLORS.textPrimary,
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
  chip: {
    marginLeft: 6,
  },
  selectedChip: {
    backgroundColor: COLORS.mablsPink,
    borderColor: COLORS.mablsPink,
  },
  categoryButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 4,
  },
  categoryCloseButton: {
    margin: 0,
    width: 20,
    height: 20,
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
    alignItems: 'center',
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
    marginTop: 8,
  },
  dateTime: {
    textAlign: 'right',
    fontSize: 10,
  },
  messageDivider: {
    height: 1,
    backgroundColor: COLORS.lightBorder,
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
