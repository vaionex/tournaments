"use client";

import { Component } from "react";
import { Button } from "./button";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-red-500 bg-red-500/10 p-8">
          <h2 className="mb-4 text-xl font-semibold text-red-500">Something went wrong!</h2>
          <p className="mb-6 text-neutral-400">{this.state.error?.message}</p>
          <Button 
            onClick={() => this.setState({ hasError: false, error: null })}
            variant="secondary"
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}