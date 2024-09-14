import React, { Component } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  componentDidCatch(error: Error) {
    if (error) {
      this.setState({ hasError: true });
    }
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="bg-light">
          <div className="flex flex-col gap-[40px] items-center justify-center h-screen bg-light">
            <h1 className="text-6xl font-bold text-red-600">
              Something went wrong.
            </h1>
            <span className="text-red-500">{this.state.errorMessage}</span>
            <p className="mt-4 text-gray-900 font-bold">
              Please try refreshing the page or come back later.
            </p>
            <button
              className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 transition duration-300 ease"
              type="button"
              onClick={this.refreshPage}
            >
              Reload Page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
