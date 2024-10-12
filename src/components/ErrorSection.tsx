import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ErrorSection {
  onRetry: () => void;
}

export default function ErrorSection({ onRetry }: ErrorSection) {
  return (
    <div
      data-testid="error-section"
      className="min-h-screen bg-black text-white flex items-center justify-center"
    >
      <div className="max-w-md w-full px-4 py-8 bg-gray-900 rounded-lg shadow-lg text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-6 text-red-600" />
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-400 mb-6">
          We couldn`&apos;`t load the movie details. Please check your internet
          connection and try again.
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          <RefreshCcw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
}
