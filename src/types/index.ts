export type RootStackParamList = {
  Home: undefined;
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