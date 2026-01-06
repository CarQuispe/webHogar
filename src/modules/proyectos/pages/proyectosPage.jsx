/**
 * ProyectosPage - Sistema del Hogar de Niños
 * Página de gestión de proyectos
 */
// src/modules/proyectos/pages/proyectosPage.jsx
import React from 'react';
import '../../../../assets/styles/global.css';

export const ProyectosPage = () => {
  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      <h1>Proyectos del Centro</h1>
      <p style={{ color: 'var(--text-secondary)' }}>
        Gestiona los proyectos y actividades del hogar
      </p>
      <div className="card" style={{ marginTop: 'var(--spacing-xl)' }}>
        <p>Contenido en desarrollo...</p>
      </div>
    </div>
  );
};

export default ProyectosPage;
