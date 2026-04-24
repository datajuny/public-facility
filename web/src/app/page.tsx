// 지도 페이지. MapClient 래퍼를 통해 브라우저에서만 Leaflet 지도를 렌더링한다.
import MapClient from '@/components/MapClient';

export default function Home() {
  return (
    <main className="h-screen w-screen bg-white">
      <MapClient />
    </main>
  );
}
