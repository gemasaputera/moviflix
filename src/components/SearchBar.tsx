'use client';
// components/SearchBar.tsx
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  initialValue: string;
  onSearch: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialValue
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="flex-grow"
        />
        {searchTerm && (
          <Button
            data-umami-event={`searching`}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-400/80 hover:bg-transparent"
            variant={'ghost'}
            type="submit"
          >
            <Search size={18} />
          </Button>
        )}
      </div>
    </form>
  );
};
