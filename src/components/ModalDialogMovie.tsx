import React, { useRef, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Movie, MoviesResponse } from '@/types/movie';
import { MovieCard } from './MovieCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMovies } from '@/lib/api';

interface ModalDialogMovieProps {
  title: string;
  opened: boolean;
  setIsModalOpen: (data: boolean) => void;
  category: string;
}

const ModalDialogMovie: React.FC<ModalDialogMovieProps> = ({
  title,
  opened,
  setIsModalOpen,
  category
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['movies-modal', category],
      queryFn: ({ pageParam = 1 }) => fetchMovies(pageParam, category),
      getNextPageParam: (lastPage: MoviesResponse) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
      enabled: opened
    });

  useEffect(() => {
    if (opened) {
      refetch();
    }
  }, [opened, refetch]);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (
        scrollHeight - scrollTop <= clientHeight * 1.5 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  if (!opened) return null;

  return (
    <Dialog open={opened} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-gray-800">
        <DialogHeader className="text-white">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div ref={scrollRef} className="overflow-y-auto h-[calc(80vh-4rem)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {isFetchingNextPage && (
            <div className="text-center py-4 text-white">Loading more...</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialogMovie;
