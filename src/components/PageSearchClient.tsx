// ClientSideSearch.tsx
'use client';

import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieList } from '@/components/MovieList';
import { searchMovies } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ErrorSection from '@/components/ErrorSection';
import SkeletonCard from '@/components/SkeletonCard';

export default function PageSearchClient() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const term = searchParams.get('term');
    if (term) {
      setSearchTerm(term);
    }
  }, [searchParams]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['search', searchTerm],
    queryFn: ({ pageParam = 1 }) => searchMovies(searchTerm, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: searchTerm.length > 0,
    initialPageParam: 1
  });

  const infiniteScrollRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <>
      {searchTerm && (
        <p className="text-xl font-medium">
          Results for{' '}
          <strong>
            <i>{searchTerm}</i>
          </strong>
        </p>
      )}

      {!searchTerm && (
        <p className="text-sm font-medium">
          Type something in the search bar to find movies...
        </p>
      )}
      {isLoading && (
        <div className="flex space-x-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {isError && <ErrorSection onRetry={() => refetch()} />}

      {movies.length > 0 && <MovieList movies={movies} />}

      <div ref={infiniteScrollRef}>
        {isFetchingNextPage && (
          <div className="text-white">Loading more...</div>
        )}
      </div>

      {movies.length === 0 && searchTerm && !isLoading && (
        <p>No results found for &quot;{searchTerm}&quot;</p>
      )}
    </>
  );
}
