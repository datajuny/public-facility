// 공공시설 데이터 로더. config/facilities.json 을 읽어 필터링 함수를 제공한다.
import type { Facility } from '@/types/facility';
import raw from '@data/facilities.json';

const ALL = raw as Facility[];

export function getAllFacilities(): Facility[] {
  return ALL;
}

export function getFacilitiesByDistrict(district: string): Facility[] {
  return ALL.filter((f) => f.district === district);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(ALL.map((f) => f.category))).sort();
}
