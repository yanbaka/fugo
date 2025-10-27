import { Category } from '../types';

export interface CategoryWithIcon {
  name: Category;
  icon: string;
}

export const categories: CategoryWithIcon[] = [
  { name: '旅行', icon: 'airplane' },
  { name: 'グルメ・料理', icon: 'food' },
  { name: 'ファッション', icon: 'tshirt-crew' },
  { name: '映画', icon: 'film' },
  { name: '音楽', icon: 'music' },
  { name: 'アニメ・漫画', icon: 'book' },
];
