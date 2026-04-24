// 카카오맵 길찾기 딥링크 빌더. 출발지(옵션)와 도착지로 경로 URL 을 만든다.
type Point = {
  name: string;
  lat: number;
  lng: number;
};

type Origin = { lat: number; lng: number };

export function buildKakaoMapUrl(dest: Point, origin?: Origin | null): string {
  const isMobile =
    typeof navigator !== 'undefined' &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    const sp = origin ? `&sp=${origin.lat},${origin.lng}` : '';
    return `kakaomap://route?ep=${dest.lat},${dest.lng}${sp}&by=FOOT`;
  }

  const destEncoded = encodeURIComponent(dest.name);
  if (origin) {
    const originName = encodeURIComponent('내 위치');
    return `https://map.kakao.com/link/from/${originName},${origin.lat},${origin.lng}/to/${destEncoded},${dest.lat},${dest.lng}`;
  }
  return `https://map.kakao.com/link/to/${destEncoded},${dest.lat},${dest.lng}`;
}
