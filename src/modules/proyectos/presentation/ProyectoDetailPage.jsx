// src/modules/proyectos/presentation/ProyectoDetailPage.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, DollarSign, Target, FileText, Edit, Download } from 'lucide-react';
import './ProyectoDetailPage.css';

const ProyectoDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Datos de ejemplo
  const proyecto = {
    id: id || 1,
    nombre: 'Educación Integral',
    descripcion: 'Programa educativo completo para niños en edad escolar que incluye tutorías, materiales educativos y actividades extracurriculares.',
    estado: 'activo',
    fechaInicio: '2024-01-15',
    fechaFin: '2024-12-20',
    responsables: ['Ana López', 'Carlos Ruiz', 'Pedro Martínez'],
    niniosAsociados: 25,
    presupuesto: '$15,000',
    progreso: 75,
    objetivos: [
      'Mejorar el rendimiento académico en un 30%',
      'Proveer materiales educativos a todos los participantes',
      'Realizar 4 actividades extracurriculares por trimestre'
    ],
    actividades: [
      { id: 1, nombre: 'Tutorías semanales', completado: true },
      { id: 2, nombre: 'Taller de lectura', completado: true },
      { id: 3, nombre: 'Actividad deportiva', completado: false },
      { id: 4, nombre: 'Visita educativa', completado: false }
    ]
  };

  return (
    <div className="proyecto-detail-page">
      {/* Header con navegación */}
      <div className="detail-header">
        <button 
          onClick={() => navigate('/proyectos')}
          className="back-button"
        >
          <ArrowLeft size={20} />
          Volver a Proyectos
        </button>
        
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={20} />
            Exportar
          </button>
          <button 
            onClick={() => navigate(`/proyectos/editar/${proyecto.id}`)}
            className="btn-primary"
          >
            <Edit size={20} />
            Editar Proyecto
          </button>
        </div>
      </div>

      {/* Información principal */}
      <div className="main-info card">
        <div className="info-header">
          <div className="title-section">
            <h1 className="project-title">{proyecto.nombre}</h1>
            <span className={`status-badge status-${proyecto.estado}`}>
              {proyecto.estado}
            </span>
          </div>
          <p className="project-description">{proyecto.descripcion}</p>
        </div>

        {/* Estadísticas */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Fecha Inicio</span>
              <span className="stat-value">{proyecto.fechaInicio}</span>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Fecha Fin</span>
              <span className="stat-value">{proyecto.fechaFin}</span>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Niños Asociados</span>
              <span className="stat-value">{proyecto.niniosAsociados}</span>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Presupuesto</span>
              <span className="stat-value">{proyecto.presupuesto}</span>
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progreso General</span>
            <span className="progress-percentage">{proyecto.progreso}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${proyecto.progreso}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Información detallada en dos columnas */}
      <div className="detail-grid">
        {/* Columna izquierda */}
        <div className="detail-column">
          <div className="detail-card">
            <h3 className="detail-title">
              <Target size={20} />
              Objetivos
            </h3>
            <ul className="objectives-list">
              {proyecto.objetivos.map((objetivo, index) => (
                <li key={index} className="objective-item">
                  {objetivo}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-card">
            <h3 className="detail-title">
              <FileText size={20} />
              Actividades
            </h3>
            <div className="activities-list">
              {proyecto.actividades.map((actividad) => (
                <div key={actividad.id} className="activity-item">
                  <div className="activity-checkbox">
                    <input 
                      type="checkbox" 
                      checked={actividad.completado}
                      readOnly
                    />
                  </div>
                  <span className={`activity-name ${actividad.completado ? 'completed' : ''}`}>
                    {actividad.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="detail-column">
          <div className="detail-card">
            <h3 className="detail-title">
              <Users size={20} />
              Responsables
            </h3>
            <div className="responsables-list">
              {proyecto.responsables.map((responsable, index) => (
                <div key={index} className="responsable-item">
                  <div className="responsable-avatar">
                    {responsable.charAt(0)}
                  </div>
                  <span className="responsable-name">{responsable}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-card">
            <h3 className="detail-title">Información Adicional</h3>
            <div className="additional-info">
              <div className="info-item">
                <span className="info-label">ID del Proyecto:</span>
                <span className="info-value">{proyecto.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Última Actualización:</span>
                <span className="info-value">2024-01-15</span>
              </div>
              <div className="info-item">
                <span className="info-label">Creado por:</span>
                <span className="info-value">Administrador</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectoDetailPage;