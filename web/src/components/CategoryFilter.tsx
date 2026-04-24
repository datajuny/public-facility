// 카테고리 필터 칩. 비어있으면 전체 표시, 하나 이상 선택되면 해당 카테고리만 필터링.
// 선택 여부와 무관하게 텍스트는 항상 진하게 읽기 쉽도록.
'use client';

import { colorFor } from '@/styles/theme';

type Props = {
  categories: string[];
  active: Set<string>;
  onToggle: (category: string) => void;
};

export default function CategoryFilter({ categories, active, onToggle }: Props) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex gap-1.5 rounded-full bg-white/95 p-1 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-md">
      {categories.map((c) => {
        const isActive = active.has(c);
        const color = colorFor(c);
        return (
          <button
            key={c}
            onClick={() => onToggle(c)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all"
            style={
              isActive
                ? { backgroundColor: color, color: 'white' }
                : { backgroundColor: 'transparent', color: '#0f172a' }
            }
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: isActive ? 'white' : color }}
            />
            {c}
          </button>
        );
      })}
    </div>
  );
}
