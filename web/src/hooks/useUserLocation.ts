// 브라우저 Geolocation API 를 감싸는 훅. 상태와 요청 함수를 제공한다.
'use client';

import { useCallback, useState } from 'react';

export type UserLocationStatus =
  | 'idle'
  | 'loading'
  | 'granted'
  | 'denied'
  | 'unavailable';

export type UserLocation = { lat: number; lng: number };

export function useUserLocation() {
  const [status, setStatus] = useState<UserLocationStatus>('idle');
  const [location, setLocation] = useState<UserLocation | null>(null);

  const request = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatus('unavailable');
      return;
    }
    setStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus('granted');
      },
      (err) => {
        setStatus(err.code === err.PERMISSION_DENIED ? 'denied' : 'unavailable');
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
    );
  }, []);

  return { status, location, request };
}
