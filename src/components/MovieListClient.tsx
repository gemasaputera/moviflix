// components/MovieListClient.tsx
'use client';

import MovieCategory from './MovieCategory';
import { categoryList } from '@/constants';
import { categoryItem } from '@/types';

export default function MovieListClient() {
  return (
    <div className="space-y-4 py-10">
      {categoryList.map((category: categoryItem) => (
        <MovieCategory
          category={category.value}
          title={category.title}
          key={category.value}
        />
      ))}
    </div>
  );
}
