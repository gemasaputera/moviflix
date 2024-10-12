// app/page.tsx
'use client';

import HomeSlider from '@/components/HomeSlider';
import MovieListClient from '@/components/MovieListClient';

export default function Home() {
  return (
    <div>
      <HomeSlider />
      <div className="container mx-auto">
        <MovieListClient />
      </div>
    </div>
  );
}
