// 지도 컴포넌트를 브라우저에서만 로드하기 위한 래퍼. dynamic+ssr:false 는 이 파일에만 존재.
'use client';

import dynamic from 'next/dynamic';

const SeoulMap = dynamic(() => import('@/components/SeoulMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100" />,
});

export default function MapClient() {
  return <SeoulMap />;
}
