'use client';

import { useEffect, useRef, RefObject } from 'react';

export function useInfiniteScroll(
  fetchNextPage: () => void,
  hasNextPage: boolean | undefined
): RefObject<HTMLDivElement> {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return loadMoreRef;
}
