# 우리 동네 공공시설 찾기

## 한 줄 설명
서울 25개 구 지도에서 구를 누르면 그 구의 공공시설 카드가 뜨는 웹앱.

## 스택
- Next.js 14+ (App Router) + TypeScript + Tailwind
- Leaflet + react-leaflet (클라이언트 전용)
- Node 20+

## 저장소 구조
이 저장소는 Next.js 앱을 `web/` 서브폴더에 둡니다. `codebase/` 루트에 있는
`config/`, `prompt/`, `public_data/` 는 데이터 · 프롬프트 · 원본 CSV 이며 앱
코드와 분리되어 있습니다.

```
codebase/
├── CLAUDE.md
├── config/              # 데이터 (건드리지 말 것)
├── prompt/              # 강의 프롬프트
├── public_data/         # 원본 CSV (참고용)
└── web/                 # Next.js 프로젝트 루트 (모든 개발 작업 이곳에서)
```

**모든 개발 커맨드(`npm run dev` 등)는 `web/` 안에서 실행합니다.**

## 데이터 (이미 있음, 건드리지 말 것)
- `config/facilities.json` — Facility[] 306개
  필드: id, name, category, district, address, phone, hours, lat, lng
- `config/seoul_municipalities_geo_simple.json` — 서울 25구 GeoJSON
- 매칭 키: `Facility.district === feature.properties.name` (한글 구 이름)
- `web/` 내부 코드는 `@data/...` 별칭으로 import (tsconfig paths + turbopack.root 설정)
  예: `import raw from '@data/facilities.json'`

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
- 지도 사용 페이지는 next/dynamic + { ssr: false }
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
- UI 텍스트 한국어
- 새 파일 최상단에 한국어 한 줄 주석으로 파일 목적
