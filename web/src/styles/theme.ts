// 디자인 토큰. 지도(Leaflet) 관련 HEX 는 이 파일에만 존재한다.
export const districtStyle = {
  default: {
    color: '#1e293b',
    weight: 1.2,
    fillColor: '#94a3b8',
    fillOpacity: 0.08,
  },
  selected: {
    color: '#0369a1',
    weight: 2.5,
    fillColor: '#0ea5e9',
    fillOpacity: 0.28,
  },
} as const;

// 카테고리 색상 (마커와 필터 칩 공통). 값은 Tailwind 팔레트 기준.
export const categoryColors: Record<string, string> = {
  공공도서관: '#3b82f6',    // blue-500
  야경명소: '#a855f7',      // purple-500
  장난감도서관: '#ec4899',  // pink-500
};

export const DEFAULT_CATEGORY_COLOR = '#64748b';

export function colorFor(category: string): string {
  return categoryColors[category] ?? DEFAULT_CATEGORY_COLOR;
}
