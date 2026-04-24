// 지도 페이지. 선택된 구 상태를 보유하고 지도와 시설 리스트를 연결한다.
'use client';

import { useState } from 'react';
import MapClient from '@/components/MapClient';
import FacilityList from '@/components/FacilityList';

export default function Home() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  return (
    <main className="flex h-screen flex-col md:flex-row bg-white">
      <div className="relative h-[60vh] md:h-auto md:flex-[2]">
        <MapClient
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
        />
        <div className="absolute top-4 left-4 z-[1000] bg-white/90 rounded-lg shadow px-3 py-1.5 text-sm">
          {selectedDistrict ? `선택: ${selectedDistrict}` : '구를 선택해주세요'}
        </div>
      </div>
      <aside className="h-[40vh] md:h-auto md:flex-1 border-t md:border-t-0 md:border-l border-slate-200 flex flex-col">
        <FacilityList district={selectedDistrict} />
      </aside>
    </main>
  );
}
