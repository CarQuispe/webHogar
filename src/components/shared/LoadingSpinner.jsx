/**
 * LoadingSpinner Component - Sistema del Hogar de Niños
 * Componente de carga
 */

import React from 'react';
import '../../assets/styles/global.css';
import '../../assets/styles/theme.css';

export const LoadingSpinner = ({ size = 'medium', message = 'Cargando...', fullScreen = false }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: '24px', height: '24px' };
      case 'medium':
        return { width: '48px', height: '48px' };
      case 'large':
        return { width: '64px', height: '64px' };
      default:
        return { width: '48px', height: '48px' };
    }
  };

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--spacing-md)',
      }}
    >
      <div className="spinner" style={getSize()}></div>
      {message && (
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          zIndex: 9999,
        }}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
