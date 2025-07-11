# FSD (Feature-Sliced Design) 구조

## 폴더 구조 설명

### `app/`

- Next.js App Router 기반 페이지 및 레이아웃
- 라우팅 관련 컴포넌트

### `entities/`

- 비즈니스 엔티티 (User, Thread, History 등)
- 도메인 모델 및 타입 정의

### `features/`

- 비즈니스 기능 단위 (auth, thread-generation, history 등)
- 각 기능별 컴포넌트, 훅, 유틸리티

### `shared/`

- 공통으로 사용되는 컴포넌트, 유틸리티, 상수
- UI 컴포넌트, 헬퍼 함수, 타입 정의

### `widgets/`

- 여러 기능을 조합한 복합 컴포넌트
- 페이지 레벨의 큰 단위 컴포넌트

## 사용 규칙

- 각 레이어는 하위 레이어만 참조 가능
- 같은 레이어 내에서는 서로 참조 가능
- 상위 레이어는 하위 레이어를 참조할 수 없음
