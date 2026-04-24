// 공공시설 단일 카드. 이름·카테고리·주소·운영시간·전화번호를 표시.
import type { Facility } from '@/types/facility';

type Props = {
  facility: Facility;
};

export default function FacilityCard({ facility }: Props) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold">{facility.name}</h3>
        <span className="bg-slate-100 text-xs px-2 py-0.5 rounded-full shrink-0">
          {facility.category}
        </span>
      </div>
      <p className="text-sm text-slate-600 mt-2">{facility.address}</p>
      {facility.hours && (
        <p className="text-xs text-slate-500 mt-1">{facility.hours}</p>
      )}
      {facility.phone && (
        <p className="text-sm text-slate-700 mt-2">☎ {facility.phone}</p>
      )}
    </article>
  );
}
