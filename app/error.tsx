'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Something went wrong!
        </h2>

        <p className="text-text-secondary mb-6">
          We encountered an error while loading BaseBounties. Please try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="btn-secondary"
          >
            Go Home
          </button>
        </div>

        {error.digest && (
          <p className="text-xs text-text-secondary mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
