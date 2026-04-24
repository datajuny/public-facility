# 모범 계획서 · 서울 공공시설 찾기 앱

## 이 문서가 뭐야?

- 당신이 `plan-prompt.md` 를 Claude Code에 넣으면 **당신만의 계획서**가 나옵니다. 그 계획서가 이 문서와 많이 다르다면, 이 문서를 그대로 따라가도 괜찮습니다.
- 이 문서의 **복붙 프롬프트 4개**를 순서대로 Claude Code에 입력하면 완성된 앱이 나옵니다.
- 각 단계마다 **"이게 화면에 보여야 한다"** 체크리스트가 붙어 있습니다. 통과하지 못했다면 다음 단계로 넘어가지 마세요.

---

## 바이브 코딩 · 당신이 주도해야 하는 4가지

AI와 함께 코딩할 때는 **AI가 잘하는 일**과 **당신이 결정해야 하는 일**이 나뉩니다.

### AI에게 맡겨도 되는 것
이제는 언어 문법을 몰라도 되는 시대가 왔습니다.
- Tailwind 클래스명 · CSS 문법
- Next.js App Router 문법
- Leaflet API 호출 방식
- TypeScript 타입 정의 문법

위와 같은 문법은 AI가 훨씬 잘 다룹니다. 토이 프로젝트나 1인 서비스라면 문법을 몰라도 괜찮습니다. 다만 직무가 개발자라면 본인의 전문 분야는 잘 알아두어야겠지요. 예를 들어 웹 개발자라면 웹 문법을 능숙하게 읽고 쓸 수 있어야 합니다. 요즘 기업에서 운영되는 코드는 AI가 작성하더라도 최종 검수는 사람이 하기 때문입니다.

### 당신이 반드시 결정해야 하는 것

**1. 도메인 언어 · 폴더 구조**
이 앱의 핵심 개념은 "시설(Facility)"과 "구(District)"입니다. 폴더와 파일 이름에 그 개념이 드러나야 합니다. 프로젝트 규모가 커질수록 AI는 관련 파일을 찾기 어려워합니다. 그래서 파일 이름을 도메인 중심으로 지어두는 것이 중요합니다.

```
✅ web/src/components/FacilityCard.tsx     · 이름만 봐도 이 앱이 무엇을 하는지 알 수 있다
❌ src/components/Card.tsx              · 일반적인 이름 · 무슨 카드인지 나중에 헷갈린다
❌ src/components/MapComponent.tsx      · "Component" 접미사는 불필요하다
```

AI가 일반적인 이름(`utils.ts`, `Card.tsx`)을 제안하면 **"도메인 이름으로 바꿔줘 — 이 앱은 시설(Facility)이 중심이야"** 라고 되돌려 말해주세요.

**2. 디자인은 구체적인 수치로 정해두기**
"예쁘게 해줘"는 매번 다른 결과를 만듭니다. 색 · 여백 · 레이아웃은 **숫자와 HEX 코드**로 고정해두세요.

💡 이렇게 디자인 수치를 한 곳에 모아두는 것을 **"테마(theme) 파일"** 이라고 부릅니다. 이 프로젝트에서도 `web/src/styles/theme.ts` 를 만들어 구 경계선 스타일 같은 디자인 토큰을 모아둡니다. CLAUDE.md에 적어둔 것이 "어떤 수치를 쓸지에 대한 약속"이라면, theme.ts는 그 약속을 코드로 구현한 파일이에요. 앞으로 색을 바꾸고 싶을 때 theme.ts 한 곳만 수정하면 모든 파일에 반영됩니다. 색이 여러 파일에 흩어져 있으면 나중에 하나하나 찾아 바꾸느라 번거로워집니다.

<https://coolors.co/> 에서 원하는 색 조합을 골라볼 수 있습니다. 저도 앱을 만들 때 이 사이트를 사용했습니다. 색이 너무 많으면 오히려 지저분해집니다. 2~3가지 색만 써도 충분히 깔끔한 디자인이 나옵니다.

```
❌ "선택된 구는 파란색으로"
✅ "선택된 구는 #0ea5e9 채움, opacity 0.35, 테두리 #0369a1, weight 2.5"
```

수치를 한 번 정해두면 AI가 모든 파일에서 같은 값을 재사용합니다. 일관성은 반복이 아니라 **선언**으로 만들어집니다.

**3. 데이터 간의 약속**
이 앱은 두 개의 데이터 파일(시설 데이터 · 지도 GeoJSON)을 연결해서 동작합니다. 시설 데이터의 "구 이름"과 지도 데이터의 "구 이름"이 **정확히 같은 형식**(한글, 예: "강남구")이어야 합니다.

이런 데이터 간의 약속은 코드를 쓰기 전에 먼저 확인해서 CLAUDE.md에 적어두세요. 형식이 하나라도 어긋나면 구를 클릭해도 아무 시설이 나타나지 않습니다. 게다가 디버깅이 까다로워서 "왜 안 나오지?" 한참 헤매다가 결국 매칭 규칙이 틀렸음을 발견하게 됩니다.

**4. 상호작용 · UX 결정**
"구 클릭 → 선택 전환 · 배지 갱신 · 카드 목록 교체 · 하이라이트 색 변경." 이 흐름은 당신이 원하는 사용자 경험입니다. AI는 당신이 말하지 않으면 모릅니다. 작업을 시키기 전에 **한 문장으로 정리해두세요.**

### 한 줄 요약

> **AI에게는 "어떻게"를 맡기고, 당신은 "무엇을 · 왜 · 어떤 이름으로"를 챙기세요.**

이 모범 계획서의 Step 0(CLAUDE.md)이 바로 이 원칙을 구체적으로 정리하는 작업입니다.

---

## 전 구간 공통 디자인 규칙

이 규칙을 CLAUDE.md 와 각 Step 프롬프트에 녹여 넣었습니다. **회색/흐린 글씨를 쓰지 말 것**이 핵심.

- **텍스트 명도**
  * 주요 텍스트: `text-slate-900` (제목·카드명) / `text-slate-800` (본문·주소)
  * 보조 텍스트: `text-slate-700 font-medium` (운영시간 등)
  * **사용 금지**: `text-slate-400`, `text-slate-500` (배경 위에서 읽히지 않음)
- **버튼/뱃지**
  * 주요 액션 버튼: `bg-slate-900 text-white` + 아이콘 + 라벨
  * 거리/상태 뱃지: `bg-slate-900 text-white` (흐린 sky-50 금지)
  * 카테고리 뱃지: 카테고리 색 + 흰 글씨 (활성) 또는 카테고리 색 + slate-900 글씨 (비활성)
- **지도 위 플로팅 UI** — 세 가지 요소가 있고, 모두 같은 공통 스타일을 공유
  * 공통 컨테이너: `bg-white/95 rounded-full shadow-lg ring-1 ring-slate-200/80 backdrop-blur-md z-[1000]`
  * **상단 좌측 배지** (구 선택 상태): `absolute top-4 left-4` + `inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-900`
  * **상단 중앙 필터 칩 바**: `absolute top-4 left-1/2 -translate-x-1/2` + `flex gap-1.5 p-1`
  * **상단 우측 내 주변 버튼**: `absolute top-4 right-4` + `inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium`
  * z-index 보조: `.leaflet-container { z-index: 0 }` (globals.css)
- **지도 타일**
  * OSM 기본 대신 CartoDB Voyager: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`
  * 훨씬 세련된 도시 지도 느낌
- **카드**
  * `rounded-2xl border border-slate-200 bg-white p-4 shadow-sm`
  * hover: `hover:-translate-y-0.5 hover:shadow-md transition-all`
  * 왼쪽에 카테고리 색 **악센트 바 1px** (`absolute left-0 top-0 h-full w-1`)

---

## Step 0 · 프로젝트 규칙 정리하기 (CLAUDE.md)

### CLAUDE.md가 뭔데요?

Claude Code가 프로젝트 폴더를 열 때마다 **가장 먼저 읽는 메모장**입니다. 여기에 "이 프로젝트는 이런 스택, 이런 색, 이런 폴더 구조를 쓴다"를 한 번 적어두면, 이후 대화 내내 AI가 그 규칙을 따라갑니다. 당신과 AI 사이의 **프로젝트 계약서** 같은 역할을 합니다.

### 왜 먼저?

CLAUDE.md에 스택 · 색 · 폴더 · 도메인 규칙을 한 번 정리해두면, 이후 Step 1~3에서 "이거 어떻게 해야 해?"를 매번 다시 설명할 필요가 없어집니다.

💡 **바이브 코딩 포인트**
CLAUDE.md에 들어갈 것: 당신이 결정한 것 (디자인 수치, 폴더 구조, 도메인 이름, 데이터 간의 약속).
들어가지 않을 것: 문법 · hook · 라이브러리 사용법. 이런 건 AI가 그때그때 판단합니다.

### 복붙 프롬프트

```
이 폴더 루트(codebase/)에 아래 내용 그대로 `CLAUDE.md` 를 만들어줘. 한 글자도 바꾸지 말고.

---
# 우리 동네 공공시설 찾기

## 한 줄 설명
서울 25개 구 지도에서 구를 누르면 그 구의 공공시설 카드가 뜨는 웹앱.

## 스택
- Next.js 14+ (App Router) + TypeScript + Tailwind
- Leaflet + react-leaflet (클라이언트 전용)
- Node 20+

## 저장소 구조
Next.js 앱은 `web/` 서브폴더에 둡니다. 루트의 `config/`, `prompt/`, `public_data/`
는 데이터 · 프롬프트 · 원본 CSV. **모든 개발 커맨드는 `web/` 안에서 실행**합니다.

```
codebase/
├── CLAUDE.md
├── config/              # 데이터 (건드리지 말 것)
├── prompt/              # 강의 프롬프트
├── public_data/         # 원본 CSV (참고용)
└── web/                 # Next.js 프로젝트 루트
```

## 데이터 (이미 있음, 건드리지 말 것)
- `config/facilities.json` — Facility[] 306개
  필드: id, name, category, district, address, phone, hours, lat, lng
- `config/seoul_municipalities_geo_simple.json` — 서울 25구 GeoJSON
- 두 파일은 '구 이름'(한글)으로 연결합니다. Facility.district 값과 feature.properties.name 값이 동일해야 합니다.
- `web/` 내부 코드에서는 `@data/...` 별칭으로 import. 예: `import raw from '@data/facilities.json'`

## 디자인
- 기본: 배경 흰색, 텍스트 slate-900
- **Tailwind 클래스**는 그대로 사용 (Tailwind 자체가 토큰 시스템)
  - 카드: `bg-white rounded-xl shadow-sm border border-slate-200 p-4`
  - 레이아웃: 데스크톱(md+) 좌(지도) flex-[2] / 우(패널) flex-1 · 모바일 위(지도) 60vh / 아래(패널) 40vh
- **Leaflet 스타일(HEX)은 `web/src/styles/theme.ts` 한 곳에만** 존재.
  - 컴포넌트는 `districtStyle.default` / `districtStyle.selected` 같은 이름으로만 참조.
  - 색을 바꾸려면 theme.ts 만 수정. 다른 파일·CLAUDE.md 에 HEX 복붙 금지.

## 지도 규칙
- 중심 [37.5665, 126.9780], zoom 11
- 타일 OpenStreetMap
- 지도 컴포넌트는 'use client'
- 지도 사용 페이지는 next/dynamic + { ssr: false } (MapClient 래퍼에 담을 것)
- import 'leaflet/dist/leaflet.css' 필수

## Next.js 설정 · 반드시
`web/next.config.ts` 는 상위 폴더의 `config/` 를 빌드에 포함하기 위해 아래 설정을 가진다.
```ts
outputFileTracingRoot: path.join(__dirname, ".."),
turbopack: { root: path.join(__dirname, "..") }
```
이게 없으면 Turbopack 이 `@data/...` import 를 거부한다.

## 폴더 구조 (web/ 내부)
web/src/
  app/
    layout.tsx        # <html>, <body> 에 suppressHydrationWarning 필수
    page.tsx          # 서버 컴포넌트 (MapClient 렌더)
    globals.css
  components/
    MapClient.tsx     # 'use client' · dynamic({ssr:false}) 래퍼
    SeoulMap.tsx      # 'use client' · 실제 Leaflet 지도
    FacilityList.tsx
    FacilityCard.tsx
  lib/
    facilities.ts     # getAllFacilities, getFacilitiesByDistrict
  styles/
    theme.ts          # 디자인 토큰 (구 경계선 Leaflet 스타일 등)
  types/
    facility.ts

## 기타
- UI 텍스트는 한국어
- 새 파일 최상단에 한국어 한 줄 주석으로 파일 목적 기술
---
```

### 검증 ✅
- [ ] `codebase/CLAUDE.md` 가 존재한다
- [ ] 내용이 위 프롬프트의 `---` 사이 텍스트와 동일하다

---

## Step 1 · 지도 + 25구 경계가 뜨는 상태까지

### 뭐 하는 단계?

프로젝트 초기화부터 서울 지도 위에 25구 경계선이 그려지는 화면까지 한 번에. AI가 스스로 처리할 수 있는 반복 작업(init, 타입 정의, JSON 로더)이라 **맡기고 결과만 확인**합니다.

💡 **바이브 코딩 포인트**
이 단계에서 AI가 파일 7~8개를 만듭니다. 하나하나 다 이해하려 들지 마세요. **화면으로 확인되는 것만** 보세요 (아래 체크리스트). 일단 "작동하는가"가 먼저입니다.

### 복붙 프롬프트

```
CLAUDE.md 를 먼저 다 읽은 뒤 아래를 순서대로 진행해줘. 모든 개발 커맨드는 `web/` 안에서 실행한다.

1. Next.js 프로젝트 초기화 · `codebase/web/` 폴더에
   codebase 루트에서 실행:
   `npx create-next-app@latest web --ts --eslint --tailwind --src-dir --app --import-alias "@/*" --no-turbopack --yes`
   이후 모든 작업 디렉터리는 `web/`.

2. Leaflet 설치 · `web/` 에서
   `cd web && npm i leaflet react-leaflet && npm i -D @types/leaflet`

3. `web/next.config.ts` 수정 — `codebase/config/` 를 빌드에 포함
   ```ts
   import type { NextConfig } from "next";
   import path from "path";

   const nextConfig: NextConfig = {
     outputFileTracingRoot: path.join(__dirname, ".."),
     turbopack: { root: path.join(__dirname, "..") },
   };
   export default nextConfig;
   ```

4. `web/tsconfig.json` 의 `compilerOptions.paths` 에 `@data/*` 별칭 추가
   `"@data/*": ["../config/*"]`
   그리고 `"include"` 배열에 `"../config/**/*.json"` 추가

5. `web/src/types/facility.ts` — Facility 타입 (필드는 CLAUDE.md 참고)

6. `web/src/lib/facilities.ts` — 두 함수
   - `getAllFacilities(): Facility[]` (`@data/facilities.json` import해서 반환)
   - `getFacilitiesByDistrict(district: string): Facility[]`

7. `web/src/styles/theme.ts` 생성 — Leaflet GeoJSON 스타일을 한 곳에 모은다
   ```ts
   export const districtStyle = {
     default:  { color: '#1e293b', weight: 1.2, fillColor: '#94a3b8', fillOpacity: 0.08 },
     selected: { color: '#0369a1', weight: 2.5, fillColor: '#0ea5e9', fillOpacity: 0.28 },
   } as const;
   ```
   (낮은 fillOpacity 로 지도 타일이 구 경계 뒤로 비치게 하여 가독성 확보. 진한 fill 은 답답해 보임.)

8. `web/src/components/SeoulMap.tsx` 생성
   - 'use client', `import 'leaflet/dist/leaflet.css'`
   - `import { districtStyle } from '@/styles/theme'`
   - `import seoulGeo from '@data/seoul_municipalities_geo_simple.json'`
   - <MapContainer center={[37.5665, 126.9780]} zoom={11} className="h-full w-full">
   - OSM <TileLayer> 추가
   - <GeoJSON data={seoulGeo as FeatureCollection} style={districtStyle.default} />

9. `web/src/components/MapClient.tsx` 생성 — 지도를 브라우저에서만 로드하는 클라이언트 래퍼
   - 'use client'
   - `const SeoulMap = dynamic(() => import('@/components/SeoulMap'), { ssr: false, loading: () => <div className="h-full w-full bg-slate-100" /> });`
   - 기본 export 로 `<SeoulMap />` 반환
   - 이렇게 래퍼로 분리해야 Next.js 16 의 `BAILOUT_TO_CLIENT_SIDE_RENDERING` 이슈를 피할 수 있어.

10. `web/web/src/app/page.tsx` 는 서버 컴포넌트 그대로 두고 `<MapClient />` 를 렌더
    `<main className="h-screen w-screen bg-white"><MapClient /></main>`

11. `web/web/src/app/layout.tsx` 의 `<html>` 과 `<body>` 에 `suppressHydrationWarning` 을 추가
    - Dark Reader, Grammarly 같은 브라우저 확장이 `<html>` 에 속성을 주입해서 Hydration 경고가 뜨는 걸 방지.
    - `<html lang="ko">` 로 언어도 한국어 설정.

12. `web/` 에서 `npm run dev` 를 백그라운드로 실행

작업이 끝나면 "Step 1 검증해보세요" 라고 알려줘.
```

### 검증 ✅ (`http://localhost:3000`)
- [ ] 화면 전체를 서울 중심 OpenStreetMap 타일이 채운다
- [ ] 지도 위에 **25개 구 경계선**이 진한 회색으로 그려진다
- [ ] 구 내부는 연한 회색 반투명
- [ ] 드래그 · 줌이 동작한다
- [ ] 좌하단 "© OpenStreetMap" attribution이 보인다
- [ ] 브라우저 콘솔 · 터미널에 에러가 없다

### 막히면
- 지도가 회색만 뜸 → `<main>` 에 `h-screen w-screen` 이 있는지 확인
- `window is not defined` → `MapClient` 래퍼의 `dynamic({ ssr: false })` 누락
- CSS가 깨짐 → `import 'leaflet/dist/leaflet.css'` 누락
- `Module not found: Can't resolve '@data/...'` → `web/next.config.ts` 의 `turbopack.root` 또는 `tsconfig.json` 의 `paths` / `include` 누락
- `BAILOUT_TO_CLIENT_SIDE_RENDERING` 관련 Hydration 에러 → `dynamic + ssr:false` 를 `page.tsx` 에서 직접 쓰지 말고 `MapClient` 래퍼에 담을 것. page.tsx 는 서버 컴포넌트여야 함.
- "A tree hydrated but some attributes didn't match" → 브라우저 확장(Dark Reader 등)이 원인. layout.tsx 의 `<html>`/`<body>` 에 `suppressHydrationWarning` 추가
- "Map container is being reused by another instance" → `web/.next` 폴더 삭제하고 dev 재시작

💡 **바이브 코딩 포인트 · 에러 대응**
에러 메시지는 **전체를 그대로** Claude Code에 붙여넣으세요. 요약해서 전달하면 AI가 엉뚱한 곳을 고칩니다.

---

## Step 2 · 구 클릭 → 시설 카드

### 뭐 하는 단계?

이 앱의 **핵심 경험**입니다. 구를 클릭하면 (1) 그 구만 파란색으로 강조되고, (2) 상단 배지가 갱신되며, (3) 우측 패널에 시설 카드 목록이 뜹니다.

💡 **바이브 코딩 포인트**
상호작용은 **한 문장으로 정의 → AI가 구현**. 당신이 "클릭했을 때 이 세 가지가 동시에 바뀐다"를 먼저 글로 정리해두면, `useState` · `onEachFeature` · 재마운트 처리 같은 구현은 AI가 알아서 해줍니다.

### 복붙 프롬프트

```
이제 인터랙션을 붙이자.

1. web/src/app/page.tsx 에 useState<string | null>(null) 로 selectedDistrict 상태 추가

2. SeoulMap 에 두 prop 추가: selectedDistrict: string | null, onSelectDistrict: (name: string) => void
   - <GeoJSON> 의 onEachFeature 에서 click 리스너 → onSelectDistrict(feature.properties.name)
   - style 를 (feature) => feature?.properties?.name === selectedDistrict ? districtStyle.selected : districtStyle.default 로 교체 (theme.ts 에서 이미 import 되어 있음)
   - 중요: <GeoJSON> 에 key={selectedDistrict ?? 'none'} 로 재마운트
   - 지도 위에 배지 하나 (공통 플로팅 UI 규칙 준수)
     `absolute top-4 left-4 z-[1000] inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-medium text-slate-900 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-md`
     안에 작은 원형 dot (h-1.5 w-1.5 rounded-full) + 텍스트. 선택 전 회색 dot + "구를 선택해주세요", 선택 후 sky-500 dot + 구이름.

3. web/src/components/FacilityCard.tsx — props로 Facility 하나
   - 카드 컨테이너: `rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md relative overflow-hidden`
   - 상단: 이름 `font-semibold text-slate-900` + 카테고리 뱃지 `bg-slate-100 text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full`
     (Step 5 에서 카테고리 색상 뱃지로 바뀌지만 Step 2 는 회색으로 시작)
   - 중간: 주소 `text-sm text-slate-800`, 운영시간 `text-xs font-medium text-slate-700`
     **주의**: 회색(slate-400/500) 사용 금지. 공통 디자인 규칙 참조.
   - 하단: 전화번호 `text-xs font-semibold text-slate-800` — "☎ {phone}" (Step 4 에서 길찾기 버튼 추가 예정, 이 Step 에선 단순 표시)

4. web/src/components/FacilityList.tsx — props: district: string | null
   - district 없음 → 중앙 정렬 안내 (p-8, text-sm font-medium text-slate-700)
   - district 있음 → 상단 헤더(border-b bg-white p-5, 구이름 `text-xl font-bold text-slate-900`, "시설 N개" `text-xs font-semibold uppercase tracking-wider text-slate-600`) + 리스트(flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3)
   - 시설 0개면 "등록된 시설이 없습니다"
   - getFacilitiesByDistrict(district) 로 조회

5. web/src/app/page.tsx 레이아웃 교체
   <main className="flex h-screen flex-col md:flex-row bg-white">
     <div className="relative h-[60vh] md:h-auto md:flex-[2]">
       {/* SeoulMap + 배지 */}
     </div>
     <aside className="h-[40vh] md:h-auto md:flex-1 border-t md:border-t-0 md:border-l border-slate-200 flex flex-col">
       <FacilityList district={selectedDistrict} />
     </aside>
   </main>

끝나면 "Step 2 검증해보세요" 라고 알려줘.
```

### 검증 ✅ (`http://localhost:3000`)
- [ ] 좌측 지도 위 배지에 "구를 선택해주세요"
- [ ] 우측 패널에 "왼쪽 지도에서 구를 선택해주세요"
- [ ] **강남구 클릭** → 강남구만 파란색 · 배지가 "선택: 강남구" · 우측에 강남구 헤더 + "시설 N개" + 카드들
- [ ] 카드에 이름 · 카테고리 뱃지 · 주소 · 운영시간 · 전화번호가 모두 표시된다
- [ ] **종로구 클릭** → 강남구 색이 빠지고 종로구가 파란색, 카드 목록이 교체된다
- [ ] **우측 패널만** 세로 스크롤된다 (페이지 전체는 스크롤되지 않음)
- [ ] 브라우저 콘솔에 에러가 없다

### 막히면
- 클릭해도 색이 안 바뀜 → `<GeoJSON>` 의 `key={selectedDistrict ?? 'none'}` 누락
- 구 이름이 영어로 뜸 → `properties.name` 이 아니라 `name_eng` 를 읽고 있음
- 전체 페이지가 스크롤됨 → `aside` 에 `overflow-y-auto` 누락

---

## Step 3 · 마무리 · 페이지 타이틀 + 로딩 + z-index

### 뭐 하는 단계?

사용자 눈에 드러나는 자잘한 마무리. 탭 제목, 지도 로딩 중 플레이스홀더, 배지가 지도에 가려지지 않도록 하는 처리입니다.

💡 **바이브 코딩 포인트**
이 세 가지는 앱의 "기능"이 아니지만 **첫인상**을 바꿉니다. 기능을 완성한 뒤 이런 마무리를 분리해서 요청하면 AI가 범위를 잘 지킵니다. "기능은 건드리지 말고"라는 말을 붙여주세요.

### 복붙 프롬프트

```
마지막 정리. 기능은 건드리지 말고 아래 세 가지만 해줘.

1. web/src/app/layout.tsx 의 metadata 를 교체:
   export const metadata = {
     title: "우리 동네 공공시설 찾기",
     description: "서울 25개 구의 공공시설을 지도에서 찾아보세요.",
   };

2. web/src/components/MapClient.tsx 의 dynamic(() => import('@/components/SeoulMap'), ...) 로딩 플레이스홀더에 animate-pulse 추가:
   { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-slate-100" /> }

3. web/src/app/globals.css 맨 아래에 Leaflet UI 폴리쉬 블록 추가 (배지 가림 방지 + 팝업·줌·어트리뷰션 디자인 통일):
   ```css
   /* Leaflet 컨테이너가 전역 stacking context 를 만들어 배지를 가리지 않도록 */
   .leaflet-container { z-index: 0; font-family: inherit; }

   /* 팝업 스타일 재정의 — 둥근 모서리 + 미세 그림자 */
   .leaflet-popup-content-wrapper {
     border-radius: 12px;
     box-shadow: 0 10px 30px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.05);
     padding: 4px;
   }
   .leaflet-popup-content { margin: 10px 12px; line-height: 1.5; }
   .leaflet-popup-tip { box-shadow: 0 2px 6px rgba(15,23,42,0.05); }

   /* 줌 컨트롤 둥글게 */
   .leaflet-bar a {
     border-radius: 8px !important;
     width: 32px !important; height: 32px !important; line-height: 32px !important;
     color: #475569 !important;
   }
   .leaflet-bar a:hover { background-color: #f8fafc !important; }
   .leaflet-bar { border: none !important; box-shadow: 0 2px 8px rgba(15,23,42,0.12) !important; }

   /* Attribution 약간 투명 */
   .leaflet-control-attribution {
     background: rgba(255,255,255,0.7) !important;
     font-size: 10px !important;
     padding: 2px 6px !important;
   }

   /* 클러스터 색을 프로젝트 뉴트럴 톤으로 */
   .marker-cluster { background-color: rgba(148,163,184,0.25) !important; }
   .marker-cluster div {
     background-color: rgba(71,85,105,0.95) !important;
     color: white !important;
     font-weight: 600 !important;
     font-size: 12px !important;
   }
   ```
   (이 블록 중 `.marker-cluster` 부분은 Step 5 에서 클러스터링을 쓸 때 의미가 생김. Step 3 에서 미리 넣어둬도 무해.)

끝나면 "Step 3 검증해보세요" 라고 알려줘.
```

### 검증 ✅
- [ ] 브라우저 탭 제목이 **"우리 동네 공공시설 찾기"**
- [ ] 페이지를 새로고침하면 지도 자리에 잠깐 회색 펄스 플레이스홀더가 뜬다
- [ ] 배지가 지도 뒤로 가려지지 않고 잘 보인다
- [ ] Step 1 · 2의 모든 기능이 그대로 동작한다

---

## Step 4 · 내 주변 찾기 + 길찾기 딥링크

### 뭐 하는 단계?

"구를 클릭한다" 만으로는 부족해요. 사용자가 **"지금 내 위치에서 가까운 곳이 어디야?"** 에 답하는 앱으로 만듭니다. 그리고 각 카드에 **카카오맵 길찾기 버튼** 을 달아 바로 길안내가 뜨게.

💡 **바이브 코딩 포인트**
이런 "실제 쓸만한 앱" 기능은 특별한 라이브러리가 필요한 게 아니에요. 브라우저 Geolocation API + 간단한 거리 계산 + 지도 앱 딥링크(`kakaomap://`) 3가지 조합. AI 에게 "이 세 개 조합해서 붙여줘" 라고 시키면 15분이면 나옵니다.

### 복붙 프롬프트

```
이제 "내 주변" 기능을 붙이자.

1. web/src/lib/distance.ts 생성 — Haversine 공식으로 두 좌표 사이 거리(미터) 계산
   `export function distanceInMeters(a: {lat, lng}, b: {lat, lng}): number`

2. web/src/lib/directions.ts 생성 — 길찾기 딥링크 빌더
   - 시그니처: `buildKakaoMapUrl(dest, origin?)` — origin 은 **사용자가 GPS 허용한 경우 현재 위치**
   - 모바일: `kakaomap://route?ep={lat},{lng}&by=FOOT` (origin 있으면 `&sp={lat},{lng}` 추가)
   - 데스크톱: origin 있으면 `/link/from/내 위치,...,/to/{name},...`, 없으면 `/link/to/{name},...`
   - 출발지 자동 주입이 핵심 UX — "내 위치에서 길찾기" 버튼 라벨도 이에 맞춰 변경

3. web/src/hooks/useUserLocation.ts 생성 — Geolocation 훅
   - 'use client'
   - 상태: `status: 'idle' | 'loading' | 'granted' | 'denied' | 'unavailable'`
   - `location: { lat: number, lng: number } | null`
   - `request()` 함수로 GPS 요청 시작 (useCallback 으로 stable 하게)
   - Geolocation 옵션: `{ enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }`
   - 권한 거부 시 status='denied' 로 설정

4. web/src/components/UserLocationButton.tsx 생성 — 우상단 "내 주변" 버튼
   - 위치: `absolute top-4 right-4 z-[1000]`
   - 아이콘(크로스헤어 SVG) + 라벨 한 줄, pill 형태
   - 상태별 스타일
     * idle: 흰 반투명 + slate-700 텍스트 + hover 흰색 + ring-slate-200
     * loading: 흰색 + 라벨 "위치 확인 중" + opacity-70 + cursor-wait + disabled
     * granted: **sky-500 배경 + 흰 텍스트** + 라벨 "내 주변"
     * denied: bg-red-50 + text-red-700 + ring-red-200 + 라벨 "권한 거부됨"
     * unavailable: 위와 동일하고 라벨 "위치 사용 불가"
   - 공통: `rounded-full px-3.5 py-1.5 text-xs font-medium shadow-lg ring-1 backdrop-blur-md`

5. web/src/components/SeoulMap.tsx 수정
   - prop 하나 추가: `userLocation?: { lat: number, lng: number } | null`
   - 위치가 있으면 파란 원 (CircleMarker) 으로 표시 (radius 8, fillColor #0ea5e9, fillOpacity 0.7, color white)

6. web/src/components/FacilityCard.tsx 수정
   - prop 추가: `distanceM?: number`, `userLocation?: { lat, lng } | null`
   - distanceM 있으면 카테고리 뱃지 옆에 진한 뱃지로 표시 (회색 배경 X → 슬레이트-900)
   - 본문 텍스트는 모두 `text-slate-700` 이상 (slate-400, slate-500 사용 금지 — 가독성 저하)
   - 하단에 길찾기 버튼 추가 (카테고리 색 악센트 디자인, 아이콘 + 라벨)
   - 라벨: userLocation 있으면 "내 위치에서 길찾기", 없으면 "길찾기"
   - **클릭 시 `window.open(buildKakaoMapUrl(facility, userLocation), '_blank', 'noopener,noreferrer')`** — 반드시 새 탭으로 열 것, 출발지 자동 주입.

7. web/src/components/FacilityList.tsx 수정
   - prop 추가: `userLocation?: { lat, lng } | null`
   - userLocation 이 있으면: 전체 시설을 거리 순 정렬 → 가장 가까운 10개 표시
     헤더는 "내 주변 시설 10개" 로 교체
   - 각 카드에 distanceM 계산해서 전달

8. web/src/app/page.tsx 수정
   - `const { location, status, request } = useUserLocation()` 추가
   - **마운트 시 위치 자동 요청**: `useEffect(() => { request(); }, [request])`
     → 사용자가 페이지 열자마자 권한 팝업 뜨고 허용하면 바로 "내 주변 모드" 진입
     → 거부해도 크래시 없음, 구 선택 모드 폴백
   - MapClient 에 `userLocation={location}` 전달
   - FacilityList 에 `userLocation={location}` 전달 (카드 길찾기의 출발지 주입에 필요)
   - `<UserLocationButton status={status} onRequest={request} />` 지도 우상단에 배치

끝나면 "Step 4 검증해보세요" 라고 알려줘.
```

### 검증 ✅
- [ ] **페이지 로드 직후 자동으로 위치 권한 팝업** 이 뜸 (허용 클릭)
- [ ] 허용 후 지도 우상단 버튼이 **sky-500 배경 + 흰 글씨 "내 주변"** 으로 활성화
- [ ] 지도에 **파란 원**(사용자 위치) 표시 (서울 기준 테스트)
- [ ] 우측 패널이 **"내 주변 시설" / "가까운 순 10개"** 로 바뀜
- [ ] 각 카드에 **거리 뱃지** (slate-900 배경 + 흰 글씨) 표시
- [ ] 각 카드 길찾기 버튼 라벨이 **"내 위치에서 길찾기"** 로 표시
- [ ] 클릭 시 새 탭으로 카카오맵이 열리고 **출발지가 자동으로 내 위치로** 설정됨
- [ ] 데스크톱 새 탭으로 열리고, 현재 앱 페이지는 그대로 유지
- [ ] 권한 거부 시 버튼이 "권한 거부됨" 빨간색으로 변하고 앱 크래시 없음

### 막히면
- HTTPS 가 아니면 Geolocation 동작 안 함 → Vercel 배포 URL 이나 localhost 는 OK, IP 주소는 안 됨
- "위치 확인 중" 에서 멈춤 → `enableHighAccuracy: true` 빼고 시도
- 카카오맵 앱 안 뜸 → 데스크톱에서는 fallback 웹 URL 이 열려야 함

---

## Step 5 · 시설 마커 + 카테고리 필터

### 뭐 하는 단계?

지금은 구 경계만 보여주는데, **306개 시설 핀이 지도에 전부** 찍히게 만듭니다. 줌아웃하면 자동 클러스터링. 상단에 카테고리 필터(공공도서관/야경명소 등) 를 달아 특정 카테고리만 보이게.

📝 **Step 2 와의 연결**
Step 2 에서 카드 카테고리 뱃지를 회색(`bg-slate-100`) 으로 해뒀어요. Step 5 에서 theme.ts 에 `categoryColors` 가 들어오면서 그 뱃지를 **카테고리 색 톤(배경 10% 투명 + 동일 색 글씨)** 으로 교체해야 합니다. Step 5 의 FacilityCard 수정 지시에 포함되어 있습니다.

💡 **바이브 코딩 포인트**
외부 라이브러리(`react-leaflet-cluster`)를 처음 쓰는 단계예요. 공식 문서 읽지 말고 AI 에게 "이거 써서 클러스터링 붙여줘" 라고 시키세요. AI 는 API 를 정확히 압니다. 당신은 **"카테고리별 색상" 같은 도메인 결정** 에 집중하세요.

### 복붙 프롬프트

```
이제 모든 시설을 지도 마커로 표시하고 카테고리 필터를 붙이자.

1. 패키지 설치 (cd web)
   `npm i react-leaflet-cluster`
   `npm i -D @types/leaflet.markercluster`

2. web/src/styles/theme.ts 수정 — 카테고리별 색상 + colorFor() 유틸 추가
   ```ts
   export const categoryColors: Record<string, string> = {
     공공도서관: '#3b82f6',    // blue-500
     야경명소: '#a855f7',      // purple-500
     장난감도서관: '#ec4899',  // pink-500
   };
   export const DEFAULT_CATEGORY_COLOR = '#64748b';
   export function colorFor(category: string): string {
     return categoryColors[category] ?? DEFAULT_CATEGORY_COLOR;
   }
   ```
   (facilities.json 의 `getAllCategories()` 가 돌려주는 3개 카테고리만 대응하면 됨)

3. web/src/lib/facilityMarker.ts 생성 — Leaflet divIcon 팩토리
   - 카테고리 이름을 받아 해당 색상 배경 원 모양 divIcon 리턴
   - 크기 18x18, 흰색 테두리 2px, 이중 그림자 (가독성)
   - Leaflet 의 `L.divIcon({ html, className: '', iconSize, iconAnchor, popupAnchor })` 사용
   - className 빈 문자열 필수 (Leaflet 기본 스타일 무효화)

4. web/src/components/FacilityCard.tsx 업그레이드 — 카테고리 색 악센트 도입
   - `import { colorFor } from '@/styles/theme'` 추가
   - `const categoryColor = colorFor(facility.category)` 계산
   - **왼쪽 악센트 바 추가** (카테고리 색상): `<span className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: categoryColor }} />`
     (카드 컨테이너에 `relative overflow-hidden` 추가)
   - **카테고리 뱃지를 카테고리 색 톤으로 교체**: Step 2 에서 `bg-slate-100` 으로 해뒀던 걸 아래로 변경
     ```tsx
     <span style={{ backgroundColor: `${categoryColor}1f`, color: categoryColor }}
       className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
       {facility.category}
     </span>
     ```
     (`1f` 는 hex 16진수 31 → 12% 투명도. 옅은 톤 배경 + 진한 카테고리 색 글씨)
   - 카드 `pl-2` 는 악센트 바(w-1=4px) 가려지지 않도록 텍스트 영역 왼쪽 여백 확보

5. web/src/components/CategoryFilter.tsx 생성 — 카테고리 토글 바
   - 지도 상단 중앙 absolute (`top-4 left-1/2 -translate-x-1/2 z-[1000]`)
   - 컨테이너: `bg-white/95 rounded-full p-1 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-md flex gap-1.5`
   - 칩 기본 클래스: `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all`
   - 칩 상태별 스타일 (inline style 로 카테고리별 색 주입)
     * 활성: `backgroundColor: 카테고리색, color: 'white'`, 점은 흰색
     * 비활성: `backgroundColor: 'transparent', color: '#0f172a' (slate-900)`, 점은 카테고리색
   - 활성/비활성 모두 **font-bold** 로 충분한 가독성 (회색/흐린 글씨 금지)
   - 클릭 시 Set 에 추가/제거 토글

6. web/src/components/SeoulMap.tsx 수정
   - prop 추가: `facilities: Facility[]` (필터 적용된 상태로 받음)
   - `MarkerClusterGroup` 안에 facilities 를 `Marker` 로 렌더
   - 각 Marker 의 position 은 [lat, lng], icon 은 facilityIcon(category)
   - Marker 에 `<Popup>` 으로 카테고리/이름/주소/전화/**길찾기 버튼** 표시
     * 팝업 텍스트도 slate-800 이상 진한 색 사용 (흐린 회색 금지)
     * 길찾기 버튼은 `window.open(buildKakaoMapUrl(f, userLocation), '_blank', 'noopener,noreferrer')`
       → userLocation 이 있으면 출발지로 자동 주입
     * 이렇게 지도와 오른쪽 카드 **양쪽에서** 길찾기 가능
   - 기존 GeoJSON 구 경계는 유지

7. web/src/app/page.tsx 수정 — 리스트 "모드" 개념 도입
   - `const [activeCategories, setActiveCategories] = useState<Set<string>>(() => new Set(전체 카테고리))`
     * **기본값: 모든 카테고리 활성** (모든 칩이 색 배경 + 흰 글씨)
     * 칩을 누르면 해당 카테고리가 제거(비활성) 되어 필터링됨
   - 지도용 `mapFacilities` = getAllFacilities() 를 activeCategories 로 필터 (폴백 없음, 비면 마커 0개)
   - 우측 패널용 `mode` 4가지: 'near' | 'district' | 'category' | 'idle'
     * 우선순위
       1. location 있으면 'near' (기존 10개 로직, activeCategories 로 필터 후 top 10)
       2. selectedDistrict 있으면 'district' (해당 구 + 카테고리 필터)
       3. **activeCategories.size < 전체 수** 면 'category' 모드
          → 필터가 좁혀졌으니 해당 카테고리 시설 전체 표시
       4. 위 셋 다 아니면(=전부 활성) 'idle' 안내 플레이스홀더
   - 지도 상단에 `<CategoryFilter>` 배치
   - MapClient 에 `mapFacilities` 전달
   - FacilityList 에 { mode, facilities, district, userLocation, distances, categoryLabel } 전달

   ⚠️ **UX 핵심 결정 — 왜 이렇게 복잡한가**
   - 칩 기본값을 전부 비활성으로 두면 "다 보여줘야지!" 하고 전체 토글이 더 자연스러운 사용자 경험에 어긋남
   - 기본 전부 활성 + 칩 끄기 = 필터링 은 "보여주는 게 기본, 보고 싶지 않은 걸 끈다" 멘탈 모델
   - 전부 활성(=필터 미적용)과 전부 비활성은 UX적으로 다름
     * 전부 활성: 기본 상태 → 모든 마커 보임 → 'idle' 모드 (구 선택 유도)
     * 전부 비활성: 사용자가 명시적으로 모두 끔 → 마커 0개 → 'category' 모드 + "선택된 카테고리 없음" 안내

8. web/src/components/FacilityList.tsx 수정
   - prop: `mode: 'near' | 'district' | 'category' | 'idle'` 를 받음
   - mode 별로 헤더 분기:
     * near   → "내 주변 시설" / "가까운 순 N개"
     * district → "{구이름}" / "시설 N개"
     * category → "{카테고리명 또는 'N개 카테고리'}" / "서울 전체 N개"
     * idle   → "서울 공공시설" / "구를 선택해주세요" + 안내 텍스트
   - 공통 Header 컴포넌트: `border-b border-slate-200 bg-white px-5 pt-5 pb-4`, 제목 `text-xl font-bold text-slate-900`, 서브 `text-xs font-semibold uppercase tracking-wider text-slate-600`
   - 리스트 영역: `flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3`
   - Empty 상태: `p-8 text-center` + `text-sm font-medium text-slate-700` (slate-400/500 금지)

   ⚠️ **왜 이렇게 복잡하게 나누나?**
   수강생이 "카테고리 필터만 눌렀는데 카드가 왜 안 나와?" 하는 UX 버그를 막기 위해서.
   지도 마커는 필터 따라 바뀌는데 리스트만 여전히 "구를 선택하세요" 라면 직관에 어긋남.
   필터가 좁혀지면 그 자체로 의미 있는 필터링이므로 리스트에도 반영.

끝나면 "Step 5 검증해보세요" 라고 알려줘.
```

### 검증 ✅
- [ ] 지도에 모든 시설 마커가 **카테고리별 다른 색**으로 표시
- [ ] 줌아웃 → 마커가 **숫자 들어간 클러스터** 로 묶임
- [ ] 줌인 → 개별 마커로 펼쳐짐
- [ ] 마커 클릭 → **popup 에 카테고리/이름/주소/전화 + 길찾기 버튼**
- [ ] 지도 popup 의 **길찾기 버튼 클릭 → 새 탭/창으로 카카오맵** (현재 페이지가 사라지면 안 됨)
- [ ] 상단에 카테고리 필터 칩들 표시
- [ ] **초기 상태: 모든 칩이 색 배경 활성** (공공도서관=blue, 야경명소=purple, 장난감도서관=pink)
- [ ] 모든 칩 활성 상태에서 지도에 **모든 마커 표시**, 우측은 "서울 공공시설 / 구를 선택해주세요" 안내
- [ ] **"공공도서관" 칩 클릭해서 비활성화** → 칩 투명 + 진한 글씨, 지도에 도서관 마커 사라짐, **우측에 "2개 카테고리 · 서울 전체 N개"** 리스트
- [ ] 다시 "공공도서관" 클릭 → 활성화 복귀
- [ ] 모든 칩 비활성화 → 지도 마커 없음, 우측에 "선택된 카테고리 없음" + "활성화된 카테고리가 없습니다"
- [ ] 강남구 선택 + 필터 좁힘 → 강남구의 해당 카테고리만 표시
- [ ] 구 클릭 / 내 주변 기능은 그대로 동작

### 막히면
- 마커 클러스터 CSS 가 깨짐 → `import 'leaflet.markercluster/dist/MarkerCluster.Default.css'` 추가
- 마커가 모두 검정색 → `divIcon` 의 `className: ''` (빈 문자열) 지정해 기본 스타일 무효화
- Marker 가 SSR 에러 → SeoulMap 은 이미 MapClient 안에서 ssr:false 로 로드되므로 OK

---

## 전체 종료 검증 (13개 모두 통과해야 완성)

1. [ ] 탭 제목이 **"우리 동네 공공시설 찾기"**
2. [ ] 새로고침 시 지도 자리에 회색 펄스 플레이스홀더
3. [ ] 좌측 2/3 에 서울 지도 + 25구 경계
4. [ ] 좌측 상단 배지에 "구를 선택해주세요"
5. [ ] 우측 1/3 에 "왼쪽 지도에서 구를 선택해주세요"
6. [ ] **강남구 클릭** → 파란색 하이라이트 · 배지 갱신 · 카드 목록 등장
7. [ ] **종로구 클릭** → 하이라이트와 카드 교체
8. [ ] DevTools 모바일 뷰 → 지도 60vh 위 / 패널 40vh 아래
9. [ ] 브라우저 콘솔 · 터미널에 에러 없음
10. [ ] 지도 우상단 "📍 내 주변" 버튼 → GPS 허용 → 파란 원 + 우측 "내 주변 시설 10개" + 거리 표시
11. [ ] 각 카드의 **🗺️ 길찾기 버튼** 동작 (모바일 앱 또는 웹)
12. [ ] 지도에 306개 마커 + 줌아웃 시 클러스터 + 카테고리별 색상
13. [ ] 상단 카테고리 필터 토글 → 마커와 카드 리스트 동시 필터링

---

## 다 끝났다면 · 바이브 코딩 복기

당신이 이 플랜에서 **AI에게 맡긴 일**
- `useState` · `onEachFeature` · `dynamic` · `ssr:false` 같은 문법
- TypeScript 타입 문법
- Tailwind 클래스 조합
- Leaflet · react-leaflet API

당신이 **주도한 일** (CLAUDE.md 에 적은 규칙 + theme.ts 에 박은 수치)
- 이 앱의 핵심 개념(Facility · District) → 폴더와 파일 이름
- 디자인 수치는 **theme.ts 한 곳에만**. CLAUDE.md 는 "어디에 두는지" 만 정함
- 데이터 간의 약속(한글 구 이름으로 두 파일을 연결)
- 상호작용 흐름(구를 클릭했을 때 동시에 바뀌는 세 가지)

**이 분담**이 바이브 코딩의 본질입니다. 앞으로 다른 앱을 만들 때도 똑같이 하세요. 당신은 "무엇을 · 왜 · 어떤 이름으로", AI는 "어떻게".
