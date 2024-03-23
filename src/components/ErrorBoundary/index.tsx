import { ErrorMessage, ErrorWrapper } from '@components/ErrorBoundary/styled';
import React, { ErrorInfo, ReactNode } from 'react';

export interface IErrorBoundaryProps {
  children: ReactNode | undefined;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <ErrorWrapper>
          <ErrorMessage>Sorry.. there was an error :(</ErrorMessage>
        </ErrorWrapper>
      );
    }

    return children;
  }
}
