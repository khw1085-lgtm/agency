# figma-preview — 화면 구조

`src/app/figma-preview/page.tsx` 한 파일에 정의된 레이아웃. Figma 참조: `p8Iiu87Gzejo0QripFBTui`.

수정 요청 시 **Title Code** 사용. 예) `[S1-HERO]의 CONVERGENCE 문구 변경`, `[S2-HSCROLL] 패널 수 7개로`.

---

## 페이지 레이아웃 (최상위)

컴포넌트: `AgencyInteractive` (default export)
배경: `bg-white`
렌더 순서:

| # | Title Code       | 컴포넌트      | 파일/위치                                | 배경                     | Figma node  | 요약 |
|---|------------------|---------------|------------------------------------------|--------------------------|-------------|------|
| — | `[NAV]`          | `SiteNav`     | `figma-preview/page.tsx` (같은 파일)     | 투명                     | —           | 전역 스티키 네비. 배경 없음, 스크롤 중 섹션 테마 따라 폰트색 전환 |
| 1 | `[S1-HERO]`      | `Header`      | `figma-preview/page.tsx` (같은 파일)     | `bg-white`               | `8:2` (001) | 히어로 타이포 (롤링 문구) + 태그라인 + CTA |
| 2 | `[S2-SWIPE]`     | `Section002`  | `src/components/Section002.tsx`          | `bg-white`               | `8:1583`    | 스와이프 캐러셀 + 필름 스트립 stagger |
| 3 | `[S3-ABOUT]`     | `Section003`  | `src/components/Section003.tsx`          | `white → black` (스크롤) | —           | About. 스크롤 진행에 따라 배경/텍스트 반전 |

> 이전(제거됨): Marquee · Services · Stats · Process · Works · Journal · CTA · Footer

---

## 섹션 상세

### `[NAV]` — SiteNav (전역 스티키)

- 배경 없음, 텍스트만. `fixed top-0 z-50` 로 항상 보임.
- **테마 자동 전환**: scroll 중 네비 위치(32px 측정 라인)에 닿는 섹션의 `data-nav-theme` 값을 읽어
  - `"light"` → 검정 폰트 (`text-black`)
  - `"dark"` → 흰색 폰트 (`text-white`)
  - CSS transition `colors 300ms` 로 부드럽게 교체.
- **섹션 측 설정**: 각 섹션 최상위 엘리먼트에 `data-nav-theme="light"` 또는 `"dark"` 추가만 하면 됨.
- `[NAV.LOGO]` — `M-SYNC.` 로고
- `[NAV.LINKS]` — `NAV` 배열 9개 항목 (About, Project, Service, Digital Marketing, Contents, Management, Clients, Awards, Contact)
- `[NAV.MENU]` — 모바일 햄버거 버튼

### `[S1-HERO]` — Header

라이트 배경의 풀스크린(100svh) 오프닝. `data-nav-theme="light"`.

- `[S1-HERO.DOT]` — 상단 중앙 데코 점
- `[S1-HERO.TITLE]` — **롤링 타이틀** (`RollingHeroTitle` 컴포넌트)
  - font-weight: `semibold` (600)
  - size: `clamp(48px, 12vw, 172px)`
  - tracking: `-0.04em`
  - 2초 간격으로 `HERO_PHRASES` 를 y-slide + fade 로 교체 (overflow-hidden 마스크로 클립)
  - 기본 문구: `INTERACTIVE WEB`, `MOTION DESIGN`, `KINETIC CRAFT`, `LIVING INTERFACE`, `IMMERSIVE DIGITAL`
  - 튜닝: `HERO_PHRASES` 배열 / `HERO_ROLL_MS` 인터벌
- `[S1-HERO.TAGLINE]` — 하단 좌측 `A GLOBAL CREATIVE DESIGN STUDIO / FOR A DIGITAL-FIRST WORLD`
- `[S1-HERO.CTA]` — 하단 우측 `WORK ARCHIVES` pill 버튼 (hover 시 다크 반전)

### `[S2-SWIPE]` — Section002 (src/components/Section002.tsx)

**스와이프 캐러셀 (마우스 액션 전용).** Figma node `8:1583` 기준 999×509 회색 카드를 한 번에 한 장씩 중앙 정렬. `data-nav-theme="light"`.

#### 인터랙션 스펙
- 섹션 자체는 **100vh 일반 플로우**, 핀 락 없음. 위/아래 스크롤은 자연스럽게 통과.
- **센터 진입 인트로 (1회) — 필름 스트립 stagger**: `useInView(amount: 0.7, once: true)` 로 섹션이 뷰포트 70% 이상 차지하는 순간
  → 각 카드가 개별로 **화면 왼쪽 바깥(`x: -1800px`) → 자기 자리**로 순차 flyin
  → `ENTRY_STAGGER = 0.22s` 간격 × `ENTRY_DURATION = 1.1s` duration
  → 마지막 카드까지 도착에 약 `2.0초` — 영화 필름 프레임이 한 장씩 지나가는 느낌
  → 인트로 중엔 드래그 비활성
- **스크롤 시간차 (패럴럭스)**: 각 카드가 다른 Y 속도로 이동
  → `PARALLAX_AMPS = [40, 90, 140, 90, 40]` — 가운데 카드가 가장 큰 폭으로 움직임
  → 섹션 전체 스크롤 구간 (`start end → end start`) 을 0~1 로 매핑해 각 카드 `y: +amp → -amp`
- **자동 전환 (인트로 이후)**: `AUTOPLAY_INTERVAL_MS = 2500ms` 마다 다음 카드로 자동 이동. 마지막 카드(`CARD_COUNT - 1`) 다음은 `0` 으로 순환 (modulo).
- **조작 (인트로 이후)**: 마우스 드래그/스와이프로 수동 전환도 가능 (드래그하면 해당 방향으로 즉시 이동, 다음 autoplay tick 은 그 시점부터 2.5초 후)
- **스프링 전환**: `stiffness 160 / damping 26 / mass 0.55`
- **드래그 판정**: 거리 `> 80px` 또는 속도 `> 400px/s` 면 다음 카드로
- **비활성 카드**: opacity 0.35 / scale 0.92 / blur 2px (인트로 중엔 모두 full opacity)

#### 카드 색상 (5종, index 순)
```ts
CARD_COLORS = [
  "#FF6B6B", // coral
  "#FFD166", // sunshine
  "#06D6A0", // teal
  "#118AB2", // ocean
  "#7209B7", // violet
]
```

#### 구조
- `[S2-SWIPE.LABEL]` — 좌상단 `002 · NN / 05` 라벨 (인트로 종료 후 페이드인)
- `[S2-SWIPE.TRACK]` — `motion.div` with `drag="x"` (인트로 중 drag 비활성)
  - `[S2-SWIPE.CARD]` — 5장의 컬러 카드. 999×509, 48px gap.
- `[S2-SWIPE.DOTS]` — 하단 진행 인디케이터 (인트로 종료 후 페이드인)

#### 튜닝 상수 (Section002.tsx 최상단)
```ts
CARD_WIDTH         = 999   // px, from Figma
CARD_HEIGHT        = 509   // px, from Figma
CARD_GAP           = 48    // px
CARD_COUNT         = 5
CARD_COLORS        = [...] // 5종 HEX
AUTOPLAY_INTERVAL_MS = 2500 // ms — 자동 전환 주기 (마지막→첫 순환)
ENTRY_STAGGER      = 0.22  // s — 카드별 flyin 간격
ENTRY_DURATION     = 1.1   // s — 개별 카드 진입 duration
PARALLAX_AMPS      = [40, 90, 140, 90, 40]  // px — 카드별 Y 패럴럭스 폭
DRAG_THRESHOLD     = 80    // px
VELOCITY_THRESHOLD = 400   // px/s
SPRING = { stiffness: 160, damping: 26, mass: 0.55 }
```

수정 요청 예:
- `[S2-SWIPE] 패널 N개` → `CARD_COUNT`, `CARD_COLORS`, `PARALLAX_AMPS` 길이 조정
- `[S2-SWIPE] 인트로 더 느리게` → `ENTRY_STAGGER`↑ 또는 `ENTRY_DURATION`↑
- `[S2-SWIPE] 인트로 매번 재생` → `useInView({ once: true })` 의 `once` 제거
- `[S2-SWIPE] 자동 전환 속도 바꿔` → `AUTOPLAY_INTERVAL_MS` 조정 (예: 4000)
- `[S2-SWIPE] 자동 전환 끄기` → autoplay `useEffect` 블록 제거 또는 `if (true) return;`
- `[S2-SWIPE] 패럴럭스 더 강하게` → `PARALLAX_AMPS` 값 증가
- `[S2-SWIPE] 카드 색상 변경` → `CARD_COLORS` 배열 수정
- `[S2-SWIPE] 더 민감하게 드래그` → `DRAG_THRESHOLD` 감소 (예: 40)

---

### `[S3-ABOUT]` — Section003 (src/components/Section003.tsx)

**About 섹션, 뷰포트 꽉 채우는 순간 블링크 반전(1회).** 100vh. 평상시 흰 배경 + 검정 텍스트. 섹션이 뷰포트 top 에 맞물리는 순간 딱 한 번 검정↔흰 깜빡임 후 원상 복귀.

#### 인터랙션 스펙
- `useScroll({ target, offset: ["start end", "start start"] })` 로 scrollYProgress 0→1 매핑
- `useMotionValueEvent` 로 progress ≥ `BLINK_TRIGGER_PROGRESS` (0.95) 첫 도달 시 블링크 시작
- 블링크 keyframe (0.8초):
  `0 → 0.1 → 0.25 → 0.4 → 0.55 → 0.7 → 1`
  `bg: 흰→검→흰→검→흰→검→흰`, `color: 검→흰→검→흰→검→흰→검`
- 블링크 종료 후 영구 흰 배경 유지
- `data-nav-theme` 도 동일 스케줄로 `light↔dark` 토글 → 상단 `[NAV]` 폰트색도 함께 깜빡임
- `useScrollLag` 로 콘텐츠에 전역 스크롤 시간차 적용

#### 구조
- `[S3-ABOUT.KICKER]` — 상단 좌측 `● About` (점 색상도 반전 대상)
- `[S3-ABOUT.TITLE]` — 메인 헤드라인
  - `WE ARE A SEOUL BASED (GLOBAL) AGENCY FOCUSING ON → MARKETING, UI/UX DESIGN CONTENTS STRATEGY DEVELOPMENT ● ENTERPRISE E - COMMERCE`
  - "(GLOBAL)" 부분만 `italic + font-serif` 로 포인트
  - size: `clamp(32px, 5vw, 76px)` / weight: medium / tracking: `-0.02em`
- `[S3-ABOUT.BODY]` — 우측 하단 한국어 설명 (muted)
- `[S3-ABOUT.STATS]` — 하단 3개 메타:
  - `ESTABLISHED: 2020`
  - `EMPLOYEES: 24+`
  - `LOCATION: SEOUL, KR`
  - 값은 placeholder — 실제 정보로 교체 가능

수정 요청 예:
- `[S3-ABOUT] 블링크 더 많이` → `BLINK_BG/BLINK_FG/BLINK_TIMES` 배열 길이 늘림
- `[S3-ABOUT] 블링크 더 빠르게` → `BLINK_DURATION` 감소 (예: 0.5)
- `[S3-ABOUT] 블링크 안 하고 영구 반전` → `animate` 를 `{ backgroundColor: "#000", color: "#fff" }` 고정
- `[S3-ABOUT] 블링크 매번 재생` → `blinkDone` 상태 제거하고 threshold 빠져나갔다 돌아오면 다시 실행
- `[S3-ABOUT] 메타 값 변경` → 하단 배열의 `value` 수정
- `[S3-ABOUT] 본문 카피 교체` → h2 / p 문단 교체

---

## 공통 시스템

### Scroll lag (전역 시간차 스크롤)

- 위치: `src/lib/useScrollLag.ts` (`useScrollLag()` 훅)
- 원리: `scrollY` (즉시) − `useSpring(scrollY)` (살짝 느리게 따라옴) = **lag delta** (px)
- 정지 상태에선 0, 스크롤 중에만 소량의 Y 오프셋 발생 → "마우스 움직임보다 살짝 느리게 콘텐츠가 따라옴" 감각
- 현재 적용처:
  - `[S1-HERO]` Header — 히어로 타이포 블록 + 하단 tagline/CTA 블록
  - `[S2-SWIPE]` — 카드 트랙 `y`, 좌상단 라벨
  - `[S3-ABOUT]` — 전체 콘텐츠 래퍼
- 새 섹션에서 쓸 때: `const lagY = useScrollLag()` → 콘텐츠 래퍼에 `style={{ y: lagY }}` 한 줄.
- 튜닝: `useScrollLag(amplitude)` 의 `amplitude` 인자 (기본 0.35).

---

## 공통 자원

- 모션: `framer-motion` (`motion`, `AnimatePresence`, `useScroll`, `useTransform`)
- 아이콘: `lucide-react` — `ArrowUpRight`, `Menu`
- **글로벌 스무스 스크롤**: Lenis (root layout 의 `SmoothScrollProvider` 에서 초기화 → 모든 라우트 자동 적용)
- 폰트: Inter (root layout)
