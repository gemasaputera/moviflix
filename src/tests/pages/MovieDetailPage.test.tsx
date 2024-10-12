import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieDetail from '../../app/movies/[id]/page';
import { fetchMovieDetails } from '@/lib/api';
import userEvent from '@testing-library/user-event';
import { useParams, useRouter } from 'next/navigation';

// Mocks
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn()
}));
jest.mock('@/lib/api', () => ({
  fetchMovieDetails: jest.fn()
}));
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  }
}));

// Mock data
const mockMovie = {
  id: '123',
  title: 'Test Movie',
  overview: 'This is a test movie',
  backdrop_path: '/test-backdrop.jpg',
  poster_path: '/test-poster.jpg',
  vote_average: 7.5,
  release_date: '2023-01-01',
  adult: false,
  runtime: 120,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' }
  ],
  director: 'Test Director',
  cast: [
    { id: 1, name: 'Actor 1' },
    { id: 2, name: 'Actor 2' }
  ]
};

describe('MovieDetail Component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
  const mockRouter = { back: jest.fn() };
  const mockParams = { id: '123' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue(mockParams);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders movie details correctly', async () => {
    (fetchMovieDetails as jest.Mock).mockResolvedValue(mockMovie);

    render(
      <QueryClientProvider client={queryClient}>
        <MovieDetail />
      </QueryClientProvider>
    );

    await waitFor(
      () => {
        expect(screen.getByText('Test Movie')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(screen.getByText('This is a test movie')).toBeInTheDocument();
    expect(screen.getByText('75% Match')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('PG-13')).toBeInTheDocument();
    expect(screen.getByText('2h 0m')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Director: Test Director')).toBeInTheDocument();
    expect(screen.getByText('Actor 1')).toBeInTheDocument();
    expect(screen.getByText('Actor 2')).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', async () => {
    (fetchMovieDetails as jest.Mock).mockResolvedValue(mockMovie);

    render(
      <QueryClientProvider client={queryClient}>
        <MovieDetail />
      </QueryClientProvider>
    );

    const backButton = await screen.findByRole('button', { name: /back/i });
    await userEvent.click(backButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
