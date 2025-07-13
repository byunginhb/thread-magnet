export interface HistoryDoc {
  id: string;
  uid: string; // 사용자 uid
  content: string;
  createdAt: number; // timestamp (ms)
}
