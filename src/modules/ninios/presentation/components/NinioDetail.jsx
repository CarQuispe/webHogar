//
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Calendar, MapPin, Tag, Flag, FileText, 
  Home, Clock, Edit, ArrowLeft, Download,
  Mail, Phone, Heart, GraduationCap
} from 'lucide-react';
import "./NinioDetail.css"

export const NinioDetail = ({ ninio, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activo': return 'estado-activo';
      case 'en_transicion': return 'estado-transicion';
      case 'egresado': return 'estado-egresado';
      default: return 'estado-default';
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return '';
    const birthDate = new Date(fechaNacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const tiempoEnHogar = () => {
    if (!ninio.fecha_ingreso) return '';
    const ingreso = new Date(ninio.fecha_ingreso);
    const hoy = new Date();
    const diffMs = hoy - ingreso;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} días`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`;
    return `${Math.floor(diffDays / 365)} años`;
  };

  const tabs = [
    { id: 'info', label: 'Información General', icon: User },
    { id: 'historial', label: 'Historial', icon: Clock },
    { id: 'salud', label: 'Salud', icon: Heart },
    { id: 'educacion', label: 'Educación', icon: GraduationCap },
  ];

  return (
    <div className="ninio-detail-container">
      {/* Header */}
      <div className="ninio-detail-header">
        <div className="header-actions">
          <button
            onClick={() => navigate('/ninios')}
            className="back-button"
          >
            <ArrowLeft className="back-icon" />
            <span>Volver</span>
          </button>
          
          <div className="action-buttons">
            <button
              onClick={onEdit}
              className="edit-button"
            >
              <Edit className="edit-icon" />
              Editar
            </button>
            <button
              onClick={() => {/* Implementar export */}}
              className="export-button"
            >
              <Download className="export-icon" />
              Exportar
            </button>
          </div>
        </div>

        {/* Perfil */}
        <div className="profile-section">
          <div className="profile-avatar">
            <User className="profile-avatar-icon" />
          </div>
          
          <div className="profile-info">
            <div className="profile-header">
              <div>
                <h1 className="profile-name">
                  {ninio.nombre} {ninio.apellido_paterno} {ninio.apellido_materno}
                </h1>
                <div className="profile-subtitle">
                  <span className="ci-text">CI: {ninio.ci}</span>
                  <span className={`estado-badge ${getEstadoColor(ninio.estado)}`}>
                    {ninio.estado}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <Calendar className="stat-icon-svg" />
                </div>
                <div>
                  <p className="stat-label">Edad</p>
                  <p className="stat-value">
                    {calcularEdad(ninio.fecha_nacimiento)} años
                  </p>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <Flag className="stat-icon-svg" />
                </div>
                <div>
                  <p className="stat-label">Nacionalidad</p>
                  <p className="stat-value">{ninio.nacionalidad}</p>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <Tag className="stat-icon-svg" />
                </div>
                <div>
                  <p className="stat-label">Etnia</p>
                  <p className="stat-value">{ninio.etnia || 'No especificada'}</p>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <Home className="stat-icon-svg" />
                </div>
                <div>
                  <p className="stat-label">Tiempo en Hogar</p>
                  <p className="stat-value">{tiempoEnHogar()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <nav className="tabs-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'tab-active' : ''}`}
              >
                <Icon className="tab-icon" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenido de Tabs */}
      <div className="tab-content">
        {activeTab === 'info' && (
          <div className="info-grid">
            {/* Información Personal */}
            <div className="info-section">
              <h3 className="section-title">Información Personal</h3>
              <div className="section-content">
                <div className="info-field">
                  <p className="field-label">Nombre Completo</p>
                  <p className="field-value">{ninio.nombre} {ninio.apellido_paterno} {ninio.apellido_materno}</p>
                </div>
                <div className="info-field">
                  <p className="field-label">Fecha de Nacimiento</p>
                  <p className="field-value">
                    {new Date(ninio.fecha_nacimiento).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div className="info-field">
                  <p className="field-label">Sexo</p>
                  <p className="field-value">{ninio.sexo}</p>
                </div>
              </div>
            </div>

            {/* Información del Hogar */}
            <div className="info-section">
              <h3 className="section-title">Información del Hogar</h3>
              <div className="section-content">
                <div className="info-field">
                  <p className="field-label">Fecha de Ingreso</p>
                  <p className="field-value">
                    {new Date(ninio.fecha_ingreso).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div className="info-field">
                  <p className="field-label">Estado Actual</p>
                  <span className={`estado-small ${getEstadoColor(ninio.estado)}`}>
                    {ninio.estado}
                  </span>
                </div>
                {ninio.fecha_egreso && (
                  <div className="info-field">
                    <p className="field-label">Fecha de Egreso</p>
                    <p className="field-value">
                      {new Date(ninio.fecha_egreso).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}
                {ninio.motivo_egreso && (
                  <div className="info-field">
                    <p className="field-label">Motivo de Egreso</p>
                    <p className="field-value">{ninio.motivo_egreso}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Observaciones */}
            {ninio.observaciones_ingreso && (
              <div className="observations-section">
                <h3 className="section-title">Observaciones</h3>
                <div className="observations-content">
                  <p className="observations-text">{ninio.observaciones_ingreso}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'historial' && (
          <div className="tab-placeholder">
            <Clock className="placeholder-icon" />
            <p className="placeholder-text">Historial en desarrollo</p>
          </div>
        )}

        {activeTab === 'salud' && (
          <div className="tab-placeholder">
            <Heart className="placeholder-icon" />
            <p className="placeholder-text">Información de salud en desarrollo</p>
          </div>
        )}

        {activeTab === 'educacion' && (
          <div className="tab-placeholder">
            <GraduationCap className="placeholder-icon" />
            <p className="placeholder-text">Información educativa en desarrollo</p>
          </div>
        )}
      </div>
    </div>
  );
};