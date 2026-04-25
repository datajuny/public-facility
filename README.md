# 우리 동네 공공시설 찾기

서울 25개 구 지도에서 구를 누르면 그 동네의 공공시설을 카드로 보여주는 **Next.js 웹앱**.
**Claude Code 입문 강의** 의 실습 레포입니다.

**→ 완성 데모: [public-facility.vercel.app](https://public-facility.vercel.app/)**

---

## 📚 실습 방법

이 레포는 **코드를 직접 타이핑하지 않고, 프롬프트를 Claude Code 에 넣어서** 앱을 만드는 실습용입니다.

### 1. Clone

```bash
git clone https://github.com/datajuny/public-facility.git
cd public-facility
```

### 2. Claude Code 실행 + Plan 모드

```bash
claude --dangerously-skip-permissions
# 실행 후 Shift + Tab 두 번 → Plan 모드 진입
```

### 3. 프롬프트 붙여넣기

`prompt/plan-prompt.md` 의 내용을 복사해서 Plan 모드에 그대로 붙여넣기 → 단계별 계획이 생성됩니다.

### 4. 계획 승인 후 구현

Claude Code 가 `web/` 서브폴더에 Next.js 앱을 만들어가요. 각 단계 끝에 확인 포인트를 보고 동작을 확인하면서 진행합니다.

> 💡 `prompt/plan-reference.md` 에 **모범 계획서**가 있어요. 본인이 받은 계획과 비교해보세요.

---

## 🌳 브랜치 구조

| 브랜치 | 내용 | 용도 |
|--------|------|------|
| `main` | 프롬프트 + 데이터 | **수강생 시작 지점** |
| `solution` | main + 완성된 Next.js 코드 | 강사 완성본 · 막혔을 때 참고 |

막혔을 때 완성본 실행:

```bash
git checkout solution
cd web
npm install
npm run dev
```

---

## 📁 저장소 구조 (main 브랜치)

```
public-facility/
├── CLAUDE.md                                    # 프로젝트 규칙 (Claude 가 자동 참조)
├── config/
│   ├── facilities.json                          # 공공시설 306개
│   └── seoul_municipalities_geo_simple.json     # 서울 25개 구 경계
├── prompt/
│   ├── plan-prompt.md                           # Plan 모드에 붙여넣을 프롬프트
│   └── plan-reference.md                        # 모범 계획서 (Step 0~5 전체)
└── public_data/                                 # 원본 CSV (참고용)
```

---

## 🛠 기술 스택 (완성본 기준)

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Leaflet** + **react-leaflet** (지도 렌더링)
- **react-leaflet-cluster** (마커 클러스터링)
- **CartoDB Voyager** 타일 지도

## 🚀 배포

Vercel 자동 배포 (solution 브랜치 기준)
- Root Directory: `web`
- Framework Preset: Next.js (자동 감지)
- `git push origin solution` → 자동 재배포

---

## 📊 데이터 출처

- **구 경계 GeoJSON**: [github.com/southkorea/seoul-maps](https://github.com/southkorea/seoul-maps) · 공개 라이선스
- **공공시설 데이터**: [서울 열린데이터광장](https://data.seoul.go.kr) CSV 3종을 통합
  - 서울시 공공도서관 현황정보 · 215개
  - 서울시 야경명소 정보 · 51개
  - 서울시 장난감 도서관 위치 현황 · 40개

`config/facilities.json` 은 이 3개 CSV 를 동일 스키마(`id, name, category, district, address, phone, hours, lat, lng`)로 정리한 결과물입니다. 야경명소의 서브카테고리는 `야경명소` 하나로 통일했습니다.

---

## ✨ 구현된 기능

- 🗺 서울 25개 구 경계 지도 (Leaflet + GeoJSON)
- 🖱 구 클릭 → 해당 구의 공공시설 카드 리스트
- 📍 **내 주변** 모드 (Geolocation API + 거리순 정렬)
- 🧭 카카오맵 **길찾기** 딥링크 (출발지 자동 주입)
- 🔵 시설 마커 + **자동 클러스터링** (카테고리별 색상)
- 🏷 카테고리 필터 칩 (지도·리스트 동시 필터링)
- 📱 반응형 레이아웃 (모바일 60vh 지도 / 40vh 패널)

---

## 📖 참고

- [Claude Code 공식 문서](https://docs.claude.com/claude-code)
- [Next.js App Router](https://nextjs.org/docs/app)
- [react-leaflet](https://react-leaflet.js.org/)

## 📄 라이선스

- 코드: MIT
- 데이터: 각 출처의 공개 라이선스를 따릅니다
