// src/modules/ninios/presentation/pages/NinioDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetNiniosService } from '../../application/get-ninios.service.js';
import { ApiNiniosRepository } from '../../infrastructure/api.ninios.repository.js';
import { NinioDetail } from '../components/NinioDetail.jsx';
import "./NinioDetailPage.css";

export const NinioDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ninio, setNinio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadNinio();
  }, [id]);

  const loadNinio = async () => {
    try {
      setLoading(true);
      setError('');
      
      const repository = new ApiNiniosRepository();
      const result = await repository.getById(id);
      
      if (result) {
        setNinio(result);
      } else {
        setError('Niño no encontrado en el sistema');
      }
    } catch (error) {
      console.error('Error loading ninio:', error);
      setError(error.message || 'Error al cargar información del niño');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/ninios/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer.')) {
      try {
        const repository = new ApiNiniosRepository();
        await repository.delete(id);
        alert('Niño eliminado exitosamente');
        navigate('/ninios');
      } catch (error) {
        console.error('Error deleting ninio:', error);
        alert('Error al eliminar niño: ' + error.message);
      }
    }
  };

  const handleBack = () => {
    navigate('/ninios');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h3>Cargando información del niño...</h3>
        <p>Por favor espere mientras se cargan los datos</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2>Error al cargar información</h2>
        <p>{error}</p>
        <div className="error-actions">
          <button className="btn-outline" onClick={() => navigate('/ninios')}>
            Volver a la lista
          </button>
          <button className="btn-primary" onClick={loadNinio}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!ninio) {
    return (
      <div className="not-found-container">
        <div className="not-found-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2>Niño no encontrado</h2>
        <p>El niño solicitado no existe o ha sido eliminado del sistema.</p>
        <button className="btn-primary" onClick={() => navigate('/ninios')}>
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="ninio-detail-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <button className="back-button" onClick={handleBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a lista
          </button>
          
          <div className="header-title">
            <h1 className="page-title">Detalle del Residente</h1>
            <p className="page-subtitle">Información completa del niño/niña</p>
          </div>
        </div>
        
        {/* Actions Bar */}
        <div className="actions-bar card">
          <div className="actions-info">
            <div className="info-item">
              <span className="info-label">ID</span>
              <span className="info-value">{ninio.id}</span>
            </div>
            <div className="info-divider"></div>
            <div className="info-item">
              <span className="info-label">Estado</span>
              <span className={`status-badge ${
                ninio.estado === 'activo' ? 'status-active' :
                ninio.estado === 'inactivo' ? 'status-inactive' :
                'status-transition'
              }`}>
                {ninio.estado?.charAt(0).toUpperCase() + ninio.estado?.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="actions-buttons">
            <button className="btn-edit" onClick={handleEdit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <NinioDetail 
        ninio={ninio}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default NinioDetailPage;