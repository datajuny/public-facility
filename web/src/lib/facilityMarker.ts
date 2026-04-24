// 시설 카테고리에 따라 색상이 다른 Leaflet divIcon. 테두리/그림자로 가독성 확보.
import L from 'leaflet';
import { colorFor } from '@/styles/theme';

export function facilityIcon(category: string): L.DivIcon {
  const color = colorFor(category);
  const html = `<span style="
    display:block;
    width:14px;
    height:14px;
    background:${color};
    border:2px solid #ffffff;
    border-radius:9999px;
    box-shadow:0 2px 6px rgba(15,23,42,0.25), 0 0 0 1px rgba(15,23,42,0.1);
  "></span>`;
  return L.divIcon({
    html,
    className: 'facility-marker',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -9],
  });
}
