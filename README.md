# ThreadMagnet

ThreadMagnet은 주제, 타겟, 스타일만 입력하면 AI가 고품질 Thread 콘텐츠를 자동 생성해주는 웹 서비스입니다. 반말, 500자 이하, 복사 최적화, 히스토리/크레딧 관리, 반응형/다크모드 지원 등 다양한 기능을 제공합니다.

## 주요 기능

- AI 기반 Thread(쓰레드) 콘텐츠 자동 생성
- 주제/타겟/스타일 입력만으로 결과 생성
- 반말, 500자 이하, 복사 최적화
- 로그인 없이도 사용 가능, 로그인 시 크레딧/히스토리 관리
- 히스토리 저장/조회, 크레딧 차감/부족 안내
- shadcn/ui 기반 modern minimalism UI, 반응형, 다크모드

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS, shadcn/ui
- Firebase (Auth, Firestore, AI)
- Gemini API (firebase/ai)
- Vercel 배포

## 환경변수 예시 (.env.local)

```
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
GEMINI_API_KEY=...
```

## 배포 방법

1. GitHub 저장소에 push
2. Vercel에서 프로젝트 생성 및 GitHub 연동
3. 환경변수 등록 (위 예시 참고)
4. Deploy 클릭

## 향후 기능/로드맵

- SNS 공유 기능
- 결제/크레딧 충전 시스템
- Thread 템플릿/추천 기능
- 관리자 대시보드

---

문의/기여/이슈는 GitHub 저장소를 통해 남겨주세요.
