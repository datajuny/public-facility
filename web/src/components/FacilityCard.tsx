// 공공시설 단일 카드. 이름·카테고리·주소·운영시간·전화번호·거리·길찾기 버튼.
import type { Facility } from '@/types/facility';
import { formatDistance } from '@/lib/distance';
import { buildKakaoMapUrl } from '@/lib/directions';
import { colorFor } from '@/styles/theme';

type Props = {
  facility: Facility;
  distanceM?: number;
  userLocation?: { lat: number; lng: number } | null;
};

export default function FacilityCard({
  facility,
  distanceM,
  userLocation,
}: Props) {
  const categoryColor = colorFor(facility.category);

  const handleDirections = () => {
    if (typeof window === 'undefined') return;
    const url = buildKakaoMapUrl(
      { name: facility.name, lat: facility.lat, lng: facility.lng },
      userLocation,
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* 왼쪽 컬러 악센트 바 */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: categoryColor }}
      />

      <div className="flex items-start justify-between gap-2 pl-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: `${categoryColor}1f`,
                color: categoryColor,
              }}
            >
              {facility.category}
            </span>
            {typeof distanceM === 'number' && (
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                {formatDistance(distanceM)}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 truncate font-semibold text-slate-900">
            {facility.name}
          </h3>
        </div>
      </div>

      <div className="mt-2 space-y-1 pl-2">
        <p className="text-sm text-slate-800">{facility.address}</p>
        {facility.hours && (
          <p className="text-xs font-medium text-slate-700">{facility.hours}</p>
        )}
        {facility.phone && (
          <p className="text-xs font-semibold text-slate-800">
            ☎ {facility.phone}
          </p>
        )}
      </div>

      <button
        onClick={handleDirections}
        className="mt-3 ml-2 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {userLocation ? '내 위치에서 길찾기' : '길찾기'}
      </button>
    </article>
  );
}
