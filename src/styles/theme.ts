import { StyleSheet } from 'react-native';

export const COLORS = {
  // メインカラー（ベージュ系同系色）
  softBeige: '#f5f0e8', // 淡いベージュ（メインカラー）
  warmBeige: '#ede0d3', // 温かみのあるベージュ（アクセントカラー）
  lightBeige: '#faf7f2', // 極淡ベージュ（ニュートラルカラー）

  // バリエーション
  white: '#ffffff', // 純白
  mediumBeige: '#d4c4b0', // 少し濃いベージュ
  darkBeige: '#c4b5a0', // より濃いベージュ
  creamBeige: '#f8f4ee', // クリーム色

  // タイル用カラー（コントラストを強化）
  tileLight: '#f8f3eb', // 明るいタイル（少し濃く）
  tileDark: '#ede5d6', // 暗いタイル（より濃く）
  tileStroke: '#d4c4b0', // タイルのストローク（より濃く）

  // ボーダー用カラー（境界線を強化）
  strongBorder: '#b8a488', // 強いボーダー
  mediumBorder: '#c4b5a0', // ミディアムボーダー
  lightBorder: '#d4c4b0', // ライトボーダー

  // テキストカラー（濃く修正）
  textPrimary: '#5d4a37', // より濃いベージュ系ダークテキスト
  textSecondary: '#7a6247', // より濃いベージュ系ミディアムテキスト
  textLight: '#9d8169', // ベージュ系ライトテキスト（元のtextAccentの色）
  textAccent: '#4a3728', // 最も濃いベージュ系アクセント
  iconColor: '#6b5544', // アイコン用の濃い色
};

// タイル状の背景パターンを作成するための関数
export const createTileBackground = () => {
  return {
    // SVGパターンのような視覚効果をCSSで実現
    backgroundColor: COLORS.lightBeige,
    backgroundImage: `
      linear-gradient(45deg, ${COLORS.tileLight} 25%, transparent 25%), 
      linear-gradient(-45deg, ${COLORS.tileLight} 25%, transparent 25%), 
      linear-gradient(45deg, transparent 75%, ${COLORS.tileDark} 75%), 
      linear-gradient(-45deg, transparent 75%, ${COLORS.tileDark} 75%)
    `,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  };
};

export const STYLES = StyleSheet.create({
  // 基本コンテナ（タイル状背景）
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBeige,
    // React Nativeではbackground-imageが使えないため、別の方法でタイル効果を実現
  },

  // タイル状背景パターン
  tileBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.lightBeige,
    // パターンの代わりに複数のビューでタイル効果を作成
  },

  // タイル単体（境界線を強化）
  tile: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: COLORS.tileLight,
    borderWidth: 1, // 0.5から1に変更
    borderColor: COLORS.tileStroke,
  },

  // 交互のタイル
  tileAlternate: {
    backgroundColor: COLORS.tileDark,
  },

  // メインウィンドウ（境界線を強化）
  mainWindow: {
    backgroundColor: COLORS.softBeige,
    borderRadius: 20,
    borderWidth: 3, // 1から3に変更
    borderColor: COLORS.strongBorder, // より濃いボーダー色
    margin: 12,
    padding: 20,
    shadowColor: COLORS.strongBorder,
    shadowOffset: {
      width: 0,
      height: 4, // シャドウを大きく
    },
    shadowOpacity: 0.2, // シャドウを濃く
    shadowRadius: 10,
    elevation: 5, // エレベーションを上げる
    // 内側のシャドウ効果を追加
    shadowInset: true,
  },

  // サブウィンドウ（境界線を強化）
  subWindow: {
    backgroundColor: COLORS.creamBeige,
    borderRadius: 16,
    borderWidth: 2, // 1から2に変更
    borderColor: COLORS.mediumBorder,
    padding: 16,
    shadowColor: COLORS.mediumBorder,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  // テキストボックス（境界線を強化）
  textBox: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 2, // 1から2に変更
    borderColor: COLORS.strongBorder, // より濃いボーダー
    padding: 20,
    margin: 8,
    shadowColor: COLORS.strongBorder,
    shadowOffset: {
      width: 0,
      height: 3, // シャドウを大きく
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  // 基本ボタン（境界線を強化）
  button: {
    backgroundColor: COLORS.creamBeige,
    borderRadius: 25,
    borderWidth: 2, // 1から2に変更
    borderColor: COLORS.mediumBorder,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: COLORS.mediumBorder,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },

  // アクセントボタン（境界線を強化）
  accentButton: {
    backgroundColor: COLORS.warmBeige,
    borderRadius: 25,
    borderWidth: 3, // 1から3に変更
    borderColor: COLORS.strongBorder, // より濃いボーダー
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: COLORS.strongBorder,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  // 選択されたボタン（境界線を強化）
  selectedButton: {
    backgroundColor: COLORS.mediumBeige,
    borderColor: COLORS.strongBorder,
    borderWidth: 3, // より太い境界線
  },

  // タグ（境界線を強化）
  tag: {
    backgroundColor: COLORS.warmBeige,
    borderRadius: 20,
    borderWidth: 2, // 1から2に変更
    borderColor: COLORS.strongBorder,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
    shadowColor: COLORS.mediumBorder,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  // タイトルテキスト
  titleText: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontFamily: 'System',
    letterSpacing: 0.5,
    textShadowColor: COLORS.lightBorder, // テキストシャドウ追加
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    color: COLORS.textAccent,
    fontFamily: 'System',
    fontWeight: '600',
  },
});

export const THEME = {
  colors: COLORS,
  styles: STYLES,
};
