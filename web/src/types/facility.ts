// 서울 공공시설(Facility) 도메인 타입 정의
export type Facility = {
  id: string;
  name: string;
  category: string;
  district: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
};
