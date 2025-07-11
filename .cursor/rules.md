# ThreadMagnet 프로젝트 규칙

## 1. 커밋 메시지 컨벤션

- feat: 새로운 기능 추가
- fix: 버그 수정
- edit: 기존 기능/문서/UI 등 소규모 수정 (비공식 확장)
- docs: 문서 수정, README, 주석 등
- style: 코드 스타일 변경 (세미콜론, 들여쓰기 등)
- refactor: 리팩토링 (동작 변경 없음)
- perf: 성능 개선
- test: 테스트 코드 추가/수정
- build: 빌드 시스템 수정 (예: vite, webpack, deps 등)
- ci: CI/CD 설정 변경
- chore: 기타 변경사항 (패키지 업데이트, 설정 파일 등)
- revert: 커밋 되돌리기

> 커밋 메시지는 항상 간결하고 압축적으로 작성해야 함.

## 2. 패키지 매니저 사용 규칙

- lock 파일이 존재하면 해당 파일에 맞는 패키지 매니저 사용
- lock 파일이 없으면 기본적으로 pnpm 사용
- 알 수 없는 경우 패키지 매니저 선택을 질문

## 3. 작업 파일 관리

- task.txt의 각 Task 완료 시, 해당 Task의 "- 작업전"을 "- 작업완료"로 변경
- 항상 파일 전체 라인 수를 확인하고, 끝까지 꼼꼼히 검토

## 4. 폴더 구조

- FSD(Folder-by-Feature) 기반 구조 사용: `app/`, `entities/`, `features/`, `shared/`, `widgets/`

## 5. 코드 스타일

- TypeScript, TailwindCSS, shadcn/ui 권장
- 다크모드 및 반응형 지원 필수

## 6. 기타

- 모든 작업/설명/커밋 메시지는 한글로 작성
- 추가 규칙이 필요할 경우 .cursor/rules.md에 업데이트

## 7. mcp(Multimodal Command Platform) 활용 규칙

- Firebase 등 외부 서비스 연동 및 관리 작업 시 mcp 명령어/도구를 적극적으로 활용
- 특히 Firebase 관련 프로젝트 연결, SDK 초기화, 인증, Firestore/Storage/RemoteConfig/배포 등은 mcp를 우선적으로 사용
- 수동 CLI/콘솔 작업보다 mcp 자동화 도구를 선호하며, 불가피한 경우에만 직접 명령어 사용
- mcp 사용 예시 및 결과는 작업 내역에 명확히 기록
