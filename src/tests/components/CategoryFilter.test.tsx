import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategoryFilter } from '../../components/CategoryFilter';

describe('CategoryFilter', () => {
  const categories = ['All', 'Action', 'Comedy', 'Drama'];
  const mockOnCategoryChange = jest.fn();

  it('renders all category buttons', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="All"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    categories.forEach((category) => {
      expect(
        screen.getByRole('button', { name: category })
      ).toBeInTheDocument();
    });
  });

  it('applies correct styling to active category', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="Action"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const activeButton = screen.getByRole('button', { name: 'Action' });
    const inactiveButton = screen.getByRole('button', { name: 'Comedy' });

    expect(activeButton).toHaveClass('bg-primary');
    expect(inactiveButton).toHaveClass('bg-background');
  });

  it('calls onCategoryChange when a category is clicked', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="All"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const comedyButton = screen.getByRole('button', { name: 'Comedy' });
    fireEvent.click(comedyButton);

    expect(mockOnCategoryChange).toHaveBeenCalledWith('Comedy');
  });
});
