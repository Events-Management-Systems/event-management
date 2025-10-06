import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error tracking service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    // Reset error state to re-render children
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
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
            onClick={this.handleReset}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>

          {/* Error details for developers */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 bg-white text-left p-4 rounded-lg shadow-md max-w-xl overflow-auto">
              <h2 className="text-lg font-semibold text-red-600 mb-2">
                Error Details (Dev Only)
              </h2>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {this.state.error && this.state.error.toString()}
              </pre>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }

    // No error → render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
