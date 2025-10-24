import { StyleSheet } from 'react-native';

export const COLORS = {
  // ベースカラー（白系）
  white: '#ffffff',
  lightGray: '#f5f5f5', // 薄いグレー（背景用）
  mediumGray: '#e0e0e0',
  darkGray: '#9e9e9e',

  // 渋谷mabls差し色
  mablsPurple: '#6366f1', // インディゴ系パープル
  mablsBlue: '#3b82f6', // ブルー
  mablsAccent: '#8b5cf6', // ライトパープル

  // テキストカラー
  textPrimary: '#1f2937', // ダークグレー
  textSecondary: '#6b7280', // ミディアムグレー
  textLight: '#9ca3af', // ライトグレー
  textAccent: '#ffff', // mabls色
  iconColor: '#4b5563',

  // ボーダー用カラー
  lightBorder: '#e5e7eb',
  mediumBorder: '#d1d5db',
  strongBorder: '#9ca3af',
};

export const STYLES = StyleSheet.create({
  // 基本コンテナ（薄いグレー背景）
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },

  // メインウィンドウ
  mainWindow: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    margin: 16,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  // サブウィンドウ
  subWindow: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  // テキストボックス
  textBox: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumBorder,
    padding: 16,
    margin: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  // 基本ボタン
  button: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumBorder,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  // アクセントボタン（mabls色）
  accentButton: {
    backgroundColor: COLORS.mablsPurple,
    borderRadius: 12,
    borderWidth: 0,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: COLORS.mablsPurple,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  // 選択されたボタン
  selectedButton: {
    backgroundColor: COLORS.mablsAccent,
    borderColor: COLORS.mablsPurple,
    borderWidth: 2,
  },

  // タグ
  tag: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },

  // タイトルテキスト
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontFamily: 'System',
    letterSpacing: 0.5,
  },

  // メインテキスト
  mainText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'System',
    lineHeight: 24,
    fontWeight: '400',
  },

  // サブテキスト
  subText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    fontWeight: '400',
  },

  // 小さなテキスト
  smallText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    fontWeight: '500',
  },

  // アクセントテキスト
  accentText: {
    color: COLORS.white,
    fontFamily: 'System',
    fontWeight: '600',
  },

  // ボタンテキスト（基本ボタン用）
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  // アクセントボタンテキスト（白文字）
  accentButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },

  // 選択されたボタンテキスト（白文字）
  selectedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export const THEME = {
  colors: COLORS,
  styles: STYLES,
};
