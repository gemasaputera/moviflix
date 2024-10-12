'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchMovieDetails } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LabelDate from '@/components/LabelDate';
import SkeletonDetailMovie from '@/components/SkeletonDetailMovie';
import ErrorSection from '@/components/ErrorSection';

export default function MovieDetail() {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: movie,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id as string)
  });

  if (isLoading) return <SkeletonDetailMovie />;
  if (isError) return <ErrorSection onRetry={() => refetch()} />;
  if (!movie) return <ErrorSection onRetry={() => router.back()} />;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200"
        >
          <ArrowLeft className="text-white" size={24} />
          <span className="sr-only">Back</span>
        </Button>

        {/* Content */}
        <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={288}
                  height={288 / 2}
                  className="w-full md:w-80 h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex items-center text-sm mb-4">
                  <span className="text-green-500 font-semibold mr-2">
                    {(movie.vote_average * 10).toFixed(0)}% Match
                  </span>
                  <span className="mr-2">
                    <LabelDate date={movie.release_date} type="year" />
                  </span>
                  {movie.adult && (
                    <span className="border border-gray-600 px-1 mr-2">
                      18+
                    </span>
                  )}
                  {!movie.adult && (
                    <span className="border border-gray-600 px-1 mr-2">
                      PG-13
                    </span>
                  )}
                  <span>
                    {movie.runtime >= 60
                      ? `${Math.floor(movie.runtime / 60)}h ${
                          movie.runtime % 60
                        }m`
                      : `${movie.runtime}m`}
                  </span>
                </div>

                <p className="text-lg mb-6">{movie.overview}</p>

                {/* <div className="flex space-x-4 mb-8">
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded flex items-center transition-colors duration-200">
                    <Play className="mr-2" size={20} />
                    Play
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded flex items-center transition-colors duration-200">
                    <Plus className="mr-2" size={20} />
                    My List
                  </button>
                </div> */}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    About {movie.title}
                  </h2>
                  <p className="text-gray-400">
                    Director: {movie.director}
                    <br />
                  </p>
                  {movie.cast?.length > 0 && (
                    <>
                      <h2 className="text-xl font-semibold mb-2">Cast</h2>
                      <ul className="list-disc list-inside mb-4 text-gray-400">
                        {movie.cast.slice(0, 5).map((actor) => (
                          <li key={actor.id}>{actor.name}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
