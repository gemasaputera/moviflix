import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex-none relative w-48">
      <div className="aspect-[2/3] rounded-lg bg-gray-700 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600 to-transparent skeleton-shimmer" />
    </div>
  );
};

export default SkeletonCard;
