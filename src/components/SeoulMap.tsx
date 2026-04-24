// 서울 25개 구 경계 GeoJSON 오버레이를 포함한 Leaflet 지도 컴포넌트.
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { FeatureCollection } from 'geojson';

import { districtStyle } from '@/styles/theme';
import seoulGeo from '../../config/seoul_municipalities_geo_simple.json';

const SEOUL_CENTER: [number, number] = [37.5665, 126.978];
const DEFAULT_ZOOM = 11;

export default function SeoulMap() {
  return (
    <MapContainer
      center={SEOUL_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={seoulGeo as FeatureCollection}
        style={districtStyle.default}
      />
    </MapContainer>
  );
}
