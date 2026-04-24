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
✅ src/components/FacilityCard.tsx     · 이름만 봐도 이 앱이 무엇을 하는지 알 수 있다
❌ src/components/Card.tsx              · 일반적인 이름 · 무슨 카드인지 나중에 헷갈린다
❌ src/components/MapComponent.tsx      · "Component" 접미사는 불필요하다
```

AI가 일반적인 이름(`utils.ts`, `Card.tsx`)을 제안하면 **"도메인 이름으로 바꿔줘 — 이 앱은 시설(Facility)이 중심이야"** 라고 되돌려 말해주세요.

**2. 디자인은 구체적인 수치로 정해두기**
"예쁘게 해줘"는 매번 다른 결과를 만듭니다. 색 · 여백 · 레이아웃은 **숫자와 HEX 코드**로 고정해두세요.

💡 이렇게 디자인 수치를 한 곳에 모아두는 것을 **"테마(theme) 파일"** 이라고 부릅니다. 이 프로젝트에서도 `src/styles/theme.ts` 를 만들어 구 경계선 스타일 같은 디자인 토큰을 모아둡니다. CLAUDE.md에 적어둔 것이 "어떤 수치를 쓸지에 대한 약속"이라면, theme.ts는 그 약속을 코드로 구현한 파일이에요. 앞으로 색을 바꾸고 싶을 때 theme.ts 한 곳만 수정하면 모든 파일에 반영됩니다. 색이 여러 파일에 흩어져 있으면 나중에 하나하나 찾아 바꾸느라 번거로워집니다.

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
이 폴더 루트에 아래 내용 그대로 `CLAUDE.md` 를 만들어줘. 한 글자도 바꾸지 말고.

---
# 우리 동네 공공시설 찾기

## 한 줄 설명
서울 25개 구 지도에서 구를 누르면 그 구의 공공시설 카드가 뜨는 웹앱.

## 스택
- Next.js 14+ (App Router) + TypeScript + Tailwind
- Leaflet + react-leaflet (클라이언트 전용)
- Node 20+

## 데이터 (이미 있음, 건드리지 말 것)
- `config/facilities.json` — Facility[] 306개
  필드: id, name, category, district, address, phone, hours, lat, lng
- `config/seoul_municipalities_geo_simple.json` — 서울 25구 GeoJSON
- 두 파일은 '구 이름'(한글)으로 연결합니다. Facility.district 값과 feature.properties.name 값이 동일해야 합니다.

## 디자인
- 기본: 배경 흰색, 텍스트 slate-900
- **Tailwind 클래스**는 그대로 사용 (Tailwind 자체가 토큰 시스템)
  - 카드: `bg-white rounded-xl shadow-sm border border-slate-200 p-4`
  - 레이아웃: 데스크톱(md+) 좌(지도) flex-[2] / 우(패널) flex-1 · 모바일 위(지도) 60vh / 아래(패널) 40vh
- **Leaflet 스타일(HEX)은 `src/styles/theme.ts` 한 곳에만** 존재.
  - 컴포넌트는 `districtStyle.default` / `districtStyle.selected` 같은 이름으로만 참조.
  - 색을 바꾸려면 theme.ts 만 수정. 다른 파일·CLAUDE.md 에 HEX 복붙 금지.

## 지도 규칙
- 중심 [37.5665, 126.9780], zoom 11
- 타일 OpenStreetMap
- 지도 컴포넌트는 'use client'
- 지도 사용 페이지는 next/dynamic + { ssr: false }
- import 'leaflet/dist/leaflet.css' 필수

## 폴더 구조
src/
  app/
    layout.tsx
    page.tsx        # 상태 보유 ('use client')
    globals.css
  components/
    MapClient.tsx   # 'use client' · dynamic({ssr:false}) 래퍼
    SeoulMap.tsx    # 'use client' · 실제 Leaflet 지도
    FacilityList.tsx
    FacilityCard.tsx
  lib/
    facilities.ts   # getAllFacilities, getFacilitiesByDistrict
  styles/
    theme.ts        # 디자인 토큰 (구 경계선 Leaflet 스타일 등)
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
CLAUDE.md 를 먼저 다 읽은 뒤 아래를 순서대로 진행해줘.

1. Next.js 프로젝트 초기화
   - 주의: 현재 폴더에 `config/`, `prompt/`, `public_data/`, `CLAUDE.md` 가 이미 있어서 `create-next-app .` 이 거부해.
     → 이 파일들을 임시로 상위 폴더(`../_init-backup/`)로 옮기고, 초기화가 끝나면 원래 자리로 복원해. `.gitignore` 는 Next.js 가 새로 만들어주니 백업할 필요 없음.
   - 초기화 커맨드
     `npx create-next-app@latest . --ts --eslint --tailwind --src-dir --app --import-alias "@/*" --no-turbopack --yes`
   - 끝나면 백업 폴더 삭제.

2. Leaflet 설치
   `npm i leaflet react-leaflet` 그리고 `npm i -D @types/leaflet`

3. `src/types/facility.ts` — Facility 타입 (필드는 CLAUDE.md 참고)

4. `src/lib/facilities.ts` — 두 함수
   - `getAllFacilities(): Facility[]` (`config/facilities.json` import해서 반환)
   - `getFacilitiesByDistrict(district: string): Facility[]`

5. `src/styles/theme.ts` 생성 — Leaflet GeoJSON 스타일을 한 곳에 모은다
   export const districtStyle = {
     default:  { color: '#1e293b', weight: 1.5, fillColor: '#94a3b8', fillOpacity: 0.15 },
     selected: { color: '#0369a1', weight: 2.5, fillColor: '#0ea5e9', fillOpacity: 0.35 },
   } as const;

6. `src/components/SeoulMap.tsx` 생성
   - 'use client', `import 'leaflet/dist/leaflet.css'`
   - `import { districtStyle } from '@/styles/theme'`
   - <MapContainer center={[37.5665, 126.9780]} zoom={11} className="h-full w-full">
   - OSM <TileLayer> 추가
   - <GeoJSON> 으로 `config/seoul_municipalities_geo_simple.json` 표시
   - 스타일은 `districtStyle.default` 그대로 적용

7. `src/components/MapClient.tsx` 생성 — 지도를 브라우저에서만 로드하는 클라이언트 래퍼
   - 'use client'
   - `const SeoulMap = dynamic(() => import('@/components/SeoulMap'), { ssr: false, loading: () => <div className="h-full w-full bg-slate-100" /> });`
   - 기본 export 로 `<SeoulMap />` 반환
   - 이렇게 래퍼로 분리해야 Next.js 16 의 `BAILOUT_TO_CLIENT_SIDE_RENDERING` 이슈를 피할 수 있어.

8. `src/app/page.tsx` 는 서버 컴포넌트 그대로 두고 `<MapClient />` 를 렌더
   `<main className="h-screen w-screen bg-white"><MapClient /></main>`

9. `src/app/layout.tsx` 의 `<html>` 과 `<body>` 에 `suppressHydrationWarning` 을 추가
   - Dark Reader, Grammarly 같은 브라우저 확장이 `<html>` 에 속성을 주입해서 Hydration 경고가 뜨는 걸 방지.
   - `<html lang="ko">` 로 언어도 한국어 설정.

10. `npm run dev` 를 백그라운드로 실행

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
- `BAILOUT_TO_CLIENT_SIDE_RENDERING` 관련 Hydration 에러 → `dynamic + ssr:false` 를 `page.tsx` 에서 직접 쓰지 말고 `MapClient` 래퍼에 담을 것. page.tsx 는 서버 컴포넌트여야 함.
- "A tree hydrated but some attributes didn't match" → 브라우저 확장(Dark Reader 등)이 원인. layout.tsx 의 `<html>`/`<body>` 에 `suppressHydrationWarning` 추가
- "Map container is being reused by another instance" → `.next` 폴더 삭제하고 dev 재시작

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

1. src/app/page.tsx 에 useState<string | null>(null) 로 selectedDistrict 상태 추가

2. SeoulMap 에 두 prop 추가: selectedDistrict: string | null, onSelectDistrict: (name: string) => void
   - <GeoJSON> 의 onEachFeature 에서 click 리스너 → onSelectDistrict(feature.properties.name)
   - style 를 (feature) => feature?.properties?.name === selectedDistrict ? districtStyle.selected : districtStyle.default 로 교체 (theme.ts 에서 이미 import 되어 있음)
   - 중요: <GeoJSON> 에 key={selectedDistrict ?? 'none'} 로 재마운트
   - 지도 위에 배지 하나 (absolute top-4 left-4 z-[1000] bg-white/90 rounded-lg shadow px-3 py-1.5 text-sm) — 선택 전 "구를 선택해주세요", 선택 후 "선택: {구이름}"

3. src/components/FacilityCard.tsx — props로 Facility 하나
   - 카드 컨테이너는 CLAUDE.md 카드 스타일 그대로
   - 상단: 이름 font-semibold + 카테고리 회색 뱃지 (bg-slate-100 text-xs px-2 py-0.5 rounded-full)
   - 중간: 주소 text-sm text-slate-600, 운영시간 text-xs text-slate-500
   - 하단: 전화번호 한 줄 (text-sm text-slate-700) — 텍스트 "☎ {phone}" (링크 없이 단순 표시)

4. src/components/FacilityList.tsx — props: district: string | null
   - district 없음 → <div className="p-6 text-slate-500">왼쪽 지도에서 구를 선택해주세요.</div>
   - district 있음 → 상단 헤더(border-b p-4, 구이름 text-lg font-bold, "시설 N개" text-sm text-slate-500) + 리스트(flex-1 overflow-y-auto p-4 space-y-3)
   - 시설 0개면 "등록된 시설이 없습니다"
   - getFacilitiesByDistrict(district) 로 조회

5. src/app/page.tsx 레이아웃 교체
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

1. src/app/layout.tsx 의 metadata 를 교체:
   export const metadata = {
     title: "우리 동네 공공시설 찾기",
     description: "서울 25개 구의 공공시설을 지도에서 찾아보세요.",
   };

2. src/app/page.tsx 의 dynamic(() => import('@/components/SeoulMap'), ...) 에 로딩 플레이스홀더 추가:
   { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-slate-100" /> }

3. src/app/globals.css 맨 아래에 한 줄 추가 (Step 2의 배지가 지도에 가려지는 것을 방지):
   .leaflet-container { z-index: 0; }

끝나면 "Step 3 검증해보세요" 라고 알려줘.
```

### 검증 ✅
- [ ] 브라우저 탭 제목이 **"우리 동네 공공시설 찾기"**
- [ ] 페이지를 새로고침하면 지도 자리에 잠깐 회색 펄스 플레이스홀더가 뜬다
- [ ] 배지가 지도 뒤로 가려지지 않고 잘 보인다
- [ ] Step 1 · 2의 모든 기능이 그대로 동작한다

---

## 전체 종료 검증 (9개 모두 통과해야 완성)

1. [ ] 탭 제목이 **"우리 동네 공공시설 찾기"**
2. [ ] 새로고침 시 지도 자리에 회색 펄스 플레이스홀더
3. [ ] 좌측 2/3 에 서울 지도 + 25구 경계
4. [ ] 좌측 상단 배지에 "구를 선택해주세요"
5. [ ] 우측 1/3 에 "왼쪽 지도에서 구를 선택해주세요"
6. [ ] **강남구 클릭** → 파란색 하이라이트 · 배지 갱신 · 카드 목록 등장
7. [ ] **종로구 클릭** → 하이라이트와 카드 교체
8. [ ] DevTools 모바일 뷰 → 지도 60vh 위 / 패널 40vh 아래
9. [ ] 브라우저 콘솔 · 터미널에 에러 없음

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
