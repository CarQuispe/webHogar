/**
 * SedeposPage - Sistema del Hogar de Niños
 * Página de reportes gubernamentales SEDEPOS
 */
// src/modules/sedepos/presentation/pages/sedeposPage.jsx
import React from 'react';
import '../../../../assets/styles/global.css';

export const SedeposPage = () => {
  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      <h1>SEDEPOS - Reportes Gubernamentales</h1>
      <p style={{ color: 'var(--text-secondary)' }}>
        Genera y gestiona reportes para autoridades
      </p>
      <div className="card" style={{ marginTop: 'var(--spacing-xl)' }}>
        <p>Contenido en desarrollo...</p>
      </div>
    </div>
  );
};

export default SedeposPage;