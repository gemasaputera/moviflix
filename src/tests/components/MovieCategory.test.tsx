import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCategory from '../../components/MovieCategory';
import { useQuery } from '@tanstack/react-query';

// Mocks
jest.mock('@tanstack/react-query');
jest.mock('@/lib/api');
jest.mock('.../../components/MovieCard', () => ({
  MovieCard: ({ movie }: { movie: any }) => (
    <div data-testid="movie-card">{movie.title}</div>
  )
}));
jest.mock('../../components/SkeletonCard', () => () => (
  <div data-testid="skeleton-card" />
));
jest.mock('../../components/ModalDialogMovie', () => ({
  __esModule: true,
  default: ({ opened, setIsModalOpen, title }: any) => (
    <div data-testid="modal-dialog">
      {opened && (
        <>
          <div>{title}</div>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </>
      )}
    </div>
  )
}));

const mockMovies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
  { id: 3, title: 'Movie 3' }
];

describe('MovieCategory', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { results: mockMovies },
      isLoading: false
    });
  });

  it('renders the category title', () => {
    render(<MovieCategory title="Popular Movies" category="popular" />);
    expect(screen.getByText('Popular Movies')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    render(<MovieCategory title="Popular Movies" category="popular" />);
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(10);
  });

  it('renders movies when data is loaded', () => {
    render(<MovieCategory title="Popular Movies" category="popular" />);
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it('shows "Explore more" button on hover', async () => {
    render(<MovieCategory title="Popular Movies" category="popular" />);
    const titleElement = screen.getByText('Popular Movies');
    fireEvent.mouseEnter(titleElement.parentElement!);
    await waitFor(() => {
      expect(screen.getByText('Explore more')).toBeInTheDocument();
    });
  });

  it('hides "Explore more" button on mouse leave', async () => {
    render(<MovieCategory title="Popular Movies" category="popular" />);
    const titleElement = screen.getByText('Popular Movies');
    fireEvent.mouseEnter(titleElement.parentElement!);
    fireEvent.mouseLeave(titleElement.parentElement!);
    await waitFor(() => {
      expect(screen.queryByText('Explore more')).not.toBeInTheDocument();
    });
  });

  it('opens modal when "Explore more" is clicked', async () => {
    render(<MovieCategory title="Popular Movies" category="popular" />);
    const titleElement = screen.getByText('Popular Movies');
    fireEvent.mouseEnter(titleElement.parentElement!);
    const exploreButton = await screen.findByText('Explore more');
    fireEvent.click(exploreButton);
    expect(screen.getByTestId('modal-dialog')).toHaveTextContent(
      'Popular Movies'
    );
  });

  it('calls fetchMovies with correct parameters', () => {
    render(<MovieCategory title="Popular Movies" category="popular" />);
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['movies', 'popular'],
      queryFn: expect.any(Function)
    });
  });
});
