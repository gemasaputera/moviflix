import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import ModalDialogMovie from './ModalDialogMovie';
import { MovieCard } from './MovieCard';
import { fetchMovies } from '@/lib/api';
import SkeletonCard from './SkeletonCard';

interface MovieCategoryProps {
  title: string;
  category: string;
}

const MovieCategory: React.FC<MovieCategoryProps> = ({ title, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['movies', category],
    queryFn: () => fetchMovies(1, category)
  });

  const movies = data?.results ?? [];

  return (
    <div className="mb-8 px-4">
      <div
        className="flex items-center mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        {isHovered && (
          <Button
            variant="ghost"
            className="ml-4 p-0 h-auto group hover:bg-transparent text-red-500 duration-300 hover:text-red-500/80"
            onClick={() => setIsModalOpen(true)}
          >
            Explore more{' '}
            <ChevronRight className="ml-2 duration-300 group-hover:ml-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {isLoading && [...Array(10)].map((_, i) => <SkeletonCard key={i} />)}

        {!isLoading &&
          movies
            .slice(0, 10)
            .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      <ModalDialogMovie
        opened={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={title}
        category={category}
      />
    </div>
  );
};

export default MovieCategory;
