// SearchBarClient.tsx
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from './SearchBar';

const SearchBarClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const term: string = searchParams.get('term') || '';

  const handleSearch = (term: string) => {
    router.push(`/search?term=${term}`);
  };

  return <SearchBar onSearch={handleSearch} initialValue={term} />;
};

export default SearchBarClient;
