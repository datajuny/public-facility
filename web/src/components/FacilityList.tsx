// 선택된 구의 공공시설 카드 목록. 비어있을 때는 플레이스홀더를 표시.
import { getFacilitiesByDistrict } from '@/lib/facilities';
import FacilityCard from '@/components/FacilityCard';

type Props = {
  district: string | null;
};

export default function FacilityList({ district }: Props) {
  if (!district) {
    return (
      <div className="p-6 text-slate-500">왼쪽 지도에서 구를 선택해주세요.</div>
    );
  }

  const items = getFacilitiesByDistrict(district);

  return (
    <>
      <div className="border-b p-4">
        <h2 className="text-lg font-bold">{district}</h2>
        <p className="text-sm text-slate-500">시설 {items.length}개</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-slate-500">등록된 시설이 없습니다</div>
        ) : (
          items.map((f) => <FacilityCard key={f.id} facility={f} />)
        )}
      </div>
    </>
  );
}
