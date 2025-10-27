import { EncounterHistoryItem } from '../types';

export const mockEncounterHistory: EncounterHistoryItem[] = [
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
];
