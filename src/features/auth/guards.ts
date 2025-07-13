import { User } from 'firebase/auth';

// 로그인 유저만 Firestore 기록/크레딧 사용 가능
export function canUseCredit(user: User | null) {
  return !!user;
}

// 비로그인 유저는 생성만 가능 (히스토리/크레딧 사용 불가)
export function canOnlyCreate(user: User | null) {
  return !user;
}
