'use client';

import { fetchMovies } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ['getUpcoming'],
    queryFn: () => fetchMovies(1, 'upcoming'),
    enabled: true
  });

  const nextSlide = useCallback(() => {
    if (data?.results) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % data.results.length);
    }
  }, [data?.results]);

  const prevSlide = useCallback(() => {
    if (data?.results) {
      setCurrentSlide(
        (prevSlide) =>
          (prevSlide - 1 + data.results.length) % data.results.length
      );
    }
  }, [data?.results]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAutoPlaying && data?.results) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, data?.results, nextSlide]);

  if (isLoading) return null;

  return (
    <section
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {data?.results?.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === currentSlide}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-16">
            <div className="container mx-auto px-4">
              <Link href={`/movies/${data?.results[currentSlide]?.id}`}>
                <h2 className="text-4xl font-bold mb-2 cursor-pointer">
                  {movie.title}
                </h2>
              </Link>
              <p className="text-sm font-medium max-w-2xl line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};

export default HomeSlider;
