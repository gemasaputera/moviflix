import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeSlider from '../../components/HomeSlider';
import { useQuery } from '@tanstack/react-query';

// Mocks
jest.mock('@tanstack/react-query');
jest.mock('@/lib/api');
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  }
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>
}));

// Mock data
const mockMovies = {
  results: [
    {
      id: 1,
      title: 'Movie 1',
      overview: 'Overview 1',
      backdrop_path: '/path1.jpg'
    },
    {
      id: 2,
      title: 'Movie 2',
      overview: 'Overview 2',
      backdrop_path: '/path2.jpg'
    },
    {
      id: 3,
      title: 'Movie 3',
      overview: 'Overview 3',
      backdrop_path: '/path3.jpg'
    }
  ]
};

describe('HomeSlider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    (useQuery as jest.Mock).mockReturnValue({
      data: mockMovies,
      isLoading: false
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the first slide initially', () => {
    render(<HomeSlider />);
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Overview 1')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true
    });
    const { container } = render(<HomeSlider />);
    expect(container.firstChild).toBeNull();
  });

  it('links to movie detail page', () => {
    render(<HomeSlider />);
    const link = screen.getByRole('link', { name: 'Movie 1' });
    expect(link).toHaveAttribute('href', '/movies/1');
  });
});
