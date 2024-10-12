import { Movie } from '@/types/movie';
import Link from 'next/link';
import Image from 'next/image';
import LabelDate from './LabelDate';

interface MovieListProps {
  movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`}>
          <div className="flex-none relative w-full md:w-48 group duration-300 hover:scale-105">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto md:h-72 object-cover rounded-md"
              width={288}
              height={288 / 2}
            />
            <p className="mt-2 text-sm text-white">{movie.title}</p>
            <div className="absolute p-4 top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent hover:block ">
              <p className="text-xs text-white">
                <LabelDate date={movie.release_date} type="year" />
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
