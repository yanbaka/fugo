export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  EncounterSettings: undefined;
  EncounterHistory: undefined;
  // 他のスクリーンがあればここに追加
};

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
}

export type Category = '旅行' | 'グルメ・料理' | 'ファッション' | '映画' | '音楽' | 'アニメ・漫画';

export interface InterestInfo {
  categories: Category[];
}

export interface PostInfo {
  id: string;
  text: string;
  categories: Category[];
}

export interface UserPreferences {
  interests: InterestInfo;
  posts: PostInfo[];
}

export interface EncounterSettings {
  isEnabled: boolean;
  notificationEnabled: boolean;
  shareRadius: number; // メートル単位
  historyRetentionDays: number;
}

export interface EncounterHistoryItem {
  id: string;
  text: string;
  categories: Category[];
  encounterDateTime: Date;
  location: string; // 地区名称
  userId: string;
  userName?: string;
}