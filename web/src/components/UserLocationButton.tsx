// 지도 우상단 "내 주변" 버튼. 상태에 따라 아이콘/라벨/색이 바뀐다.
'use client';

import type { UserLocationStatus } from '@/hooks/useUserLocation';

type Props = {
  status: UserLocationStatus;
  onRequest: () => void;
};

const LABELS: Record<UserLocationStatus, string> = {
  idle: '내 주변',
  loading: '위치 확인 중',
  granted: '내 주변',
  denied: '권한 거부됨',
  unavailable: '위치 사용 불가',
};

export default function UserLocationButton({ status, onRequest }: Props) {
  const isError = status === 'denied' || status === 'unavailable';
  const isBusy = status === 'loading';
  const isActive = status === 'granted';

  const base =
    'absolute top-4 right-4 z-[1000] inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium shadow-lg ring-1 ring-slate-200/80 backdrop-blur-md transition-all';
  const tone = isError
    ? 'bg-red-50 text-red-700 ring-red-200'
    : isActive
      ? 'bg-sky-500 text-white ring-sky-400'
      : 'bg-white/95 text-slate-700 hover:bg-white';
  const busy = isBusy ? 'opacity-70 cursor-wait' : 'cursor-pointer';

  return (
    <button
      onClick={onRequest}
      disabled={isBusy}
      className={`${base} ${tone} ${busy}`}
      aria-label="내 주변 시설 찾기"
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
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2" />
      </svg>
      {LABELS[status]}
    </button>
  );
}
