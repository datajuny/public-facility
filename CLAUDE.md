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
- 매칭 키: `Facility.district === feature.properties.name` (한글 구 이름)

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
- UI 텍스트 한국어
- 새 파일 최상단에 한국어 한 줄 주석으로 파일 목적
