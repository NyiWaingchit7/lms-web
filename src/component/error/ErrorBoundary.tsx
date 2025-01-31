//@ts-ignore
//@ts-nocheck
import { Component } from "react";
import { Navigate } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("Caught by Error Boundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error Details:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
