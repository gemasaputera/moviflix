import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex gap-2 mb-4">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          variant={activeCategory === category ? 'default' : 'outline'}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
