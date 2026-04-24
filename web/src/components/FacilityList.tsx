// 우측 패널. 부모가 결정한 모드(near / district / category / idle) 에 따라 헤더와 목록을 렌더.
import FacilityCard from '@/components/FacilityCard';
import type { Facility } from '@/types/facility';

export type ListMode = 'near' | 'district' | 'category' | 'idle';

type Props = {
  mode: ListMode;
  district: string | null;
  facilities: Facility[];
  userLocation?: { lat: number; lng: number } | null;
  distances?: number[];
  categoryLabel?: string;
};

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-slate-200 bg-white px-5 pt-5 pb-4">
      <h2 className="text-xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
        {subtitle}
      </p>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center p-8 text-center">
      <p className="max-w-xs text-sm font-medium text-slate-700">{children}</p>
    </div>
  );
}

export default function FacilityList({
  mode,
  district,
  facilities,
  userLocation,
  distances,
  categoryLabel,
}: Props) {
  if (mode === 'near') {
    return (
      <>
        <Header title="내 주변 시설" subtitle={`가까운 순 ${facilities.length}개`} />
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3">
          {facilities.length === 0 ? (
            <Empty>필터와 일치하는 시설이 주변에 없습니다.</Empty>
          ) : (
            facilities.map((f, i) => (
              <FacilityCard
                key={f.id}
                facility={f}
                distanceM={distances?.[i]}
                userLocation={userLocation}
              />
            ))
          )}
        </div>
      </>
    );
  }

  if (mode === 'district' && district) {
    return (
      <>
        <Header title={district} subtitle={`시설 ${facilities.length}개`} />
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3">
          {facilities.length === 0 ? (
            <Empty>선택한 카테고리에 해당하는 시설이 없습니다.</Empty>
          ) : (
            facilities.map((f) => (
              <FacilityCard
                key={f.id}
                facility={f}
                userLocation={userLocation}
              />
            ))
          )}
        </div>
      </>
    );
  }

  if (mode === 'category') {
    return (
      <>
        <Header
          title={categoryLabel ?? '카테고리'}
          subtitle={`서울 전체 ${facilities.length}개`}
        />
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3">
          {facilities.length === 0 ? (
            <Empty>활성화된 카테고리가 없습니다.</Empty>
          ) : (
            facilities.map((f) => (
              <FacilityCard
                key={f.id}
                facility={f}
                userLocation={userLocation}
              />
            ))
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="서울 공공시설" subtitle="구를 선택해주세요" />
      <div className="flex flex-1 items-center justify-center bg-slate-50 p-8 text-center">
        <p className="max-w-xs text-sm font-medium text-slate-700">
          왼쪽 지도에서 구를 클릭하거나 상단 카테고리 필터를 선택하면 시설 목록이 여기에 나타납니다.
        </p>
      </div>
    </>
  );
}
