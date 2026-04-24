// 서울 25개 구 경계 + 시설 마커 클러스터링 + 사용자 위치 표시 지도.
'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Marker,
  Popup,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type { FeatureCollection, Feature } from 'geojson';

import { districtStyle } from '@/styles/theme';
import { facilityIcon } from '@/lib/facilityMarker';
import { buildKakaoMapUrl } from '@/lib/directions';
import type { Facility } from '@/types/facility';
import seoulGeo from '@data/seoul_municipalities_geo_simple.json';

const SEOUL_CENTER: [number, number] = [37.5665, 126.978];
const DEFAULT_ZOOM = 11;

type Props = {
  selectedDistrict: string | null;
  onSelectDistrict: (name: string) => void;
  userLocation?: { lat: number; lng: number } | null;
  facilities: Facility[];
};

function openDirections(f: Facility, origin?: { lat: number; lng: number } | null) {
  const url = buildKakaoMapUrl({ name: f.name, lat: f.lat, lng: f.lng }, origin);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export default function SeoulMap({
  selectedDistrict,
  onSelectDistrict,
  userLocation,
  facilities,
}: Props) {
  return (
    <MapContainer
      center={SEOUL_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
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
      <MarkerClusterGroup chunkedLoading>
        {facilities.map((f) => (
          <Marker
            key={f.id}
            position={[f.lat, f.lng]}
            icon={facilityIcon(f.category)}
          >
            <Popup>
              <div className="text-sm min-w-[180px]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  {f.category}
                </div>
                <div className="font-semibold text-slate-900 mt-0.5">{f.name}</div>
                <div className="text-slate-800 mt-1 text-xs">{f.address}</div>
                {f.phone && (
                  <div className="text-xs font-semibold text-slate-800 mt-1">
                    ☎ {f.phone}
                  </div>
                )}
                <button
                  onClick={() => openDirections(f, userLocation ?? null)}
                  className="mt-2 inline-flex items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {userLocation ? '내 위치에서 길찾기' : '길찾기'}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      {userLocation && (
        <CircleMarker
          center={[userLocation.lat, userLocation.lng]}
          radius={8}
          pathOptions={{
            fillColor: '#0ea5e9',
            fillOpacity: 0.7,
            color: 'white',
            weight: 2,
          }}
        />
      )}
    </MapContainer>
  );
}
