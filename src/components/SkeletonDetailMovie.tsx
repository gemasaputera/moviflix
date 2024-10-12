import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-gray-700 rounded-md ${className}`}
      {...props}
    />
  );
}

export default function SkeletonDetailMovie() {
  const router = useRouter();
  return (
    <div
      data-testid="loading-skeleton"
      className="min-h-screen bg-black text-white"
    >
      <div className="relative">
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <Button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200"
        >
          <ArrowLeft className="text-white" size={24} />
          <span className="sr-only">Back</span>
        </Button>

        <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <Skeleton className="w-full md:w-80 h-120 rounded-lg" />
              </div>

              <div className="flex-grow">
                <Skeleton className="h-10 w-3/4 mb-2" />
                <div className="flex items-center space-x-2 mb-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>

                <Skeleton className="h-20 w-full mb-6" />

                <div className="flex space-x-4 mb-8">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>

                <div className="mb-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>

                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
