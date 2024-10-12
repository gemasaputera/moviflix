// page.tsx

import { Suspense } from 'react';
import PageSearchClient from '../../components/PageSearchClient';

export default function Search() {
  return (
    <div className="container mx-auto py-8 space-y-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Search Movies</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PageSearchClient />
      </Suspense>
    </div>
  );
}
