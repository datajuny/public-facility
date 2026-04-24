서울 공공시설 찾기 앱을 Next.js로 만들려고 해.

이런 앱이야:
- 서울 지도가 크게 뜨고, 25개 구 경계가 그려져 있음
- 구를 클릭하면 그 구의 공공시설 목록이 카드로 나옴
- 각 카드에 이름, 카테고리, 주소, 운영시간, 전화번호가 표시됨

기술 스택은 이렇게 가려고 해:
- Next.js (App Router) + TypeScript
- 지도는 Leaflet + react-leaflet
- 스타일은 Tailwind CSS

데이터는 이미 config 폴더에 준비해뒀어:

- config/seoul_municipalities_geo_simple.json
  서울 25개 구 경계 GeoJSON 파일.
  type: "FeatureCollection", features 배열에 구 25개.
  각 feature.properties.name 에 한글 구 이름 (예: "강남구", "종로구").
  각 feature.geometry.coordinates 에 구 경계를 이루는 위도/경도 좌표 배열.

- config/facilities.json
  서울 공공시설 306개 배열. 출처는 서울 열린데이터광장의 CSV 3종 통합.
  카테고리는 3가지: "공공도서관"(215), "야경명소"(51), "장난감도서관"(40).
  각 항목 필드: id, name, category, district, address, phone, hours, lat, lng.
  구 이름 매칭 키는 district, GeoJSON 의 properties.name 과 동일한 형식(한글).

클로드 코드를 공부하는 수강생 대상이라서, 빈 폴더에서 시작해서 완성까지 단계별로 계획을 세워줘.
맨 앞에는 CLAUDE.md(프로젝트 규칙을 정리하는 파일)를 만드는 단계부터 포함해줘. 이후 단계들은 이 CLAUDE.md에 정리된 규칙(색 · 레이아웃 · 폴더 구조 · 도메인 이름 · 데이터 형식)을 따라가야 해.
각 단계 끝날 때마다 "이러면 이게 보여야 한다"는 확인 지점도 같이 알려줘.
