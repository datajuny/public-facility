// 메인 페이지. 모든 상태(선택 구, 사용자 위치, 활성 카테고리)를 보유하고 자식에게 전파.
// 마운트 시 위치를 자동으로 요청하고, 카테고리 필터는 기본값으로 전부 활성.
'use client';

import { useEffect, useMemo, useState } from 'react';
import MapClient from '@/components/MapClient';
import FacilityList from '@/components/FacilityList';
import UserLocationButton from '@/components/UserLocationButton';
import CategoryFilter from '@/components/CategoryFilter';
import { useUserLocation } from '@/hooks/useUserLocation';
import {
  getAllCategories,
  getAllFacilities,
  getFacilitiesByDistrict,
} from '@/lib/facilities';
import { distanceInMeters } from '@/lib/distance';

const NEAR_ME_LIMIT = 10;
const ALL_CATEGORIES = getAllCategories();

type ListMode = 'near' | 'district' | 'category' | 'idle';

export default function Home() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const { status, location, request } = useUserLocation();

  // 기본값: 모든 카테고리 활성. 사용자는 칩을 눌러 특정 카테고리를 끌 수 있다.
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    () => new Set(ALL_CATEGORIES),
  );

  // 마운트 시 위치 자동 요청 (사용자가 권한 대화상자에서 허용/거부 선택)
  useEffect(() => {
    request();
  }, [request]);

  const toggleCategory = (c: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  // 지도 마커 = 활성 카테고리에 해당하는 시설만. 비면 마커 없음.
  const mapFacilities = useMemo(
    () => getAllFacilities().filter((f) => activeCategories.has(f.category)),
    [activeCategories],
  );

  // 우측 패널 모드 + 데이터
  const {
    mode,
    listFacilities,
    distances,
  }: { mode: ListMode; listFacilities: typeof mapFacilities; distances?: number[] } =
    useMemo(() => {
      if (location) {
        const ranked = mapFacilities
          .map((f) => ({
            f,
            d: distanceInMeters(location, { lat: f.lat, lng: f.lng }),
          }))
          .sort((a, b) => a.d - b.d)
          .slice(0, NEAR_ME_LIMIT);
        return {
          mode: 'near',
          listFacilities: ranked.map((r) => r.f),
          distances: ranked.map((r) => r.d),
        };
      }
      if (selectedDistrict) {
        const items = getFacilitiesByDistrict(selectedDistrict).filter((f) =>
          activeCategories.has(f.category),
        );
        return { mode: 'district', listFacilities: items };
      }
      // 카테고리 필터가 좁혀졌으면(전부 활성이 아니면) 'category' 모드
      if (activeCategories.size < ALL_CATEGORIES.length) {
        return { mode: 'category', listFacilities: mapFacilities };
      }
      return { mode: 'idle', listFacilities: [] };
    }, [location, selectedDistrict, activeCategories, mapFacilities]);

  const categoryLabel = useMemo(() => {
    if (activeCategories.size === 0) return '선택된 카테고리 없음';
    if (activeCategories.size === 1) return Array.from(activeCategories)[0];
    return `${activeCategories.size}개 카테고리`;
  }, [activeCategories]);

  return (
    <main className="flex h-screen flex-col md:flex-row bg-white">
      <div className="relative h-[60vh] md:h-auto md:flex-[2]">
        <MapClient
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
          userLocation={location}
          facilities={mapFacilities}
        />
        <div className="absolute top-4 left-4 z-[1000] inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-medium text-slate-900 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-md">
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${
              location || selectedDistrict ? 'bg-sky-500' : 'bg-slate-400'
            }`}
          />
          {location
            ? '내 주변 모드'
            : selectedDistrict
              ? selectedDistrict
              : '지도에서 구를 선택하세요'}
        </div>
        <UserLocationButton status={status} onRequest={request} />
        <CategoryFilter
          categories={ALL_CATEGORIES}
          active={activeCategories}
          onToggle={toggleCategory}
        />
      </div>
      <aside className="h-[40vh] md:h-auto md:flex-1 border-t md:border-t-0 md:border-l border-slate-200 flex flex-col">
        <FacilityList
          mode={mode}
          district={selectedDistrict}
          facilities={listFacilities}
          userLocation={location}
          distances={distances}
          categoryLabel={categoryLabel}
        />
      </aside>
    </main>
  );
}
