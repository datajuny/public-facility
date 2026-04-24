// 지도 컴포넌트를 브라우저에서만 로드하기 위한 래퍼. dynamic+ssr:false 는 이 파일에만 존재.
'use client';

import dynamic from 'next/dynamic';
import type { Facility } from '@/types/facility';

const SeoulMap = dynamic(() => import('@/components/SeoulMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-slate-100" />,
});

type Props = {
  selectedDistrict: string | null;
  onSelectDistrict: (name: string) => void;
  userLocation?: { lat: number; lng: number } | null;
  facilities: Facility[];
};

export default function MapClient(props: Props) {
  return <SeoulMap {...props} />;
}
