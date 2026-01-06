// src/components/shared/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Algo salió mal</h2>
          <p>Ha ocurrido un error en la aplicación.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', marginTop: '10px' }}
          >
            Recargar página
          </button>
          <details style={{ marginTop: '20px', textAlign: 'left' }}>
            <summary>Detalles del error</summary>
            <pre style={{ whiteSpace: 'pre-wrap', color: 'red' }}>
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;