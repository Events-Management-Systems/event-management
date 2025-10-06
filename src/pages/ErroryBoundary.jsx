import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleReset = () => {
    setError(null);
    setErrorInfo(null);
  };

  // Custom error boundary logic using try/catch and React.Children.map
  try {
    if (error) {
      throw error;
    }

    // Render children normally
    return children;
  } catch (err) {
    console.error("ErrorBoundary caught an error:", err);

    // Store error info for display
    if (!error) {
      setError(err);
      setErrorInfo({ componentStack: err.stack });
    }

    // Show fallback UI
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-red-50 text-center px-6">
        <h1 className="text-4xl font-bold text-red-700 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-600 mb-6">
          Don’t worry, it’s not you. An unexpected error occurred.  
          Please try again or contact support if the problem continues.
        </p>

        {/* Retry Button */}
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>

        {/* Show details only in development */}
        {process.env.NODE_ENV === "development" && error && (
          <div className="mt-6 bg-white text-left p-4 rounded-lg shadow-md max-w-xl overflow-auto">
            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Error Details (Dev Only)
            </h2>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {error.toString()}
            </pre>
            <pre className="text-xs text-gray-600 whitespace-pre-wrap">
              {errorInfo?.componentStack}
            </pre>
          </div>
        )}
      </div>
    );
  }
};

export default ErrorBoundary;

