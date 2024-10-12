// src/tests/pages/HomePage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../app/page';

// Mock the child components
jest.mock('../../components/HomeSlider', () => {
  return function MockHomeSlider() {
    return <div data-testid="mock-home-slider">Mock Home Slider</div>;
  };
});

jest.mock('../../components/MovieListClient', () => {
  return function MockMovieListClient() {
    return (
      <div data-testid="mock-movie-list-client">Mock Movie List Client</div>
    );
  };
});

describe('Home Component', () => {
  it('renders HomeSlider and MovieListClient', () => {
    render(<Home />);

    // Check if HomeSlider is rendered
    const homeSlider = screen.getByTestId('mock-home-slider');
    expect(homeSlider).toBeInTheDocument();

    // Check if MovieListClient is rendered
    const movieListClient = screen.getByTestId('mock-movie-list-client');
    expect(movieListClient).toBeInTheDocument();
  });

  it('renders MovieListClient inside a container', () => {
    render(<Home />);

    const container = screen
      .getByTestId('mock-movie-list-client')
      .closest('.container');
    expect(container).toHaveClass('container');
    expect(container).toHaveClass('mx-auto');
  });
});
