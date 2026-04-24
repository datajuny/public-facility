// 서울 25개 구 경계 GeoJSON 오버레이. 구 클릭 시 선택 상태 갱신.
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { FeatureCollection, Feature } from 'geojson';

import { districtStyle } from '@/styles/theme';
import seoulGeo from '@data/seoul_municipalities_geo_simple.json';

const SEOUL_CENTER: [number, number] = [37.5665, 126.978];
const DEFAULT_ZOOM = 11;

type Props = {
  selectedDistrict: string | null;
  onSelectDistrict: (name: string) => void;
};

export default function SeoulMap({ selectedDistrict, onSelectDistrict }: Props) {
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
        key={selectedDistrict ?? 'none'}
        data={seoulGeo as FeatureCollection}
        style={(feature) =>
          feature?.properties?.name === selectedDistrict
            ? districtStyle.selected
            : districtStyle.default
        }
        onEachFeature={(feature: Feature, layer) => {
          layer.on('click', () => {
            const name = feature.properties?.name;
            if (typeof name === 'string') onSelectDistrict(name);
          });
        }}
      />
    </MapContainer>
  );
}
