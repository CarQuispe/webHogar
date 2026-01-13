// src/modules/proyectos/presentation/ProyectoDetailPage.jsx
import React from 'react';
import './ProyectoDetailPage.css';

const ProyectoDetailPage = () => {
  return (
    <div className="proyecto-detail-page">
      <div className="page-header">
        <h1 className="page-title">Detalle del Proyecto</h1>
        <p className="page-subtitle">Información completa del proyecto</p>
      </div>
      
      <div className="placeholder-card">
        <div className="placeholder-content">
          <h3>Detalles en desarrollo</h3>
          <p>La vista de detalles de proyectos está en construcción.</p>
        </div>
      </div>
    </div>
  );
};

export default ProyectoDetailPage;