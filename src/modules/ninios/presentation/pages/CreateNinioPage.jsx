// src/modules/ninios/presentation/pages/CreateNinioPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import{CreateNinioService}from'../../application/create-ninio.service.js';
import{ApiNiniosRepository}from'../../infrastructure/api.ninios.repository.js';

import { NinioForm } from '../components/NinioForm.jsx';
import "./CreateNinioPage.css";

export const CreateNinioPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [createdNinio, setCreatedNinio] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    setCreatedNinio(null);

    try {
      console.log(' [CreateNinioPage] Datos recibidos del formulario:', formData);
      
      // Preparar datos para enviar al backend
      const ninioDataToSend = {
        ...formData,
        fecha_nacimiento: formData.fecha_nacimiento || null,
        fecha_ingreso: formData.fecha_ingreso || new Date().toISOString().split('T')[0],
        fecha_egreso: formData.estado === 'egresado' ? formData.fecha_egreso : null,
        motivo_egreso: formData.estado === 'egresado' ? formData.motivo_egreso : null,
        observaciones_ingreso: formData.observaciones_ingreso || '',
        sexo: formData.sexo || 'no especificado',
        nacionalidad: formData.nacionalidad || 'Boliviana',
        estado: formData.estado || 'activo'
      };
      
      const repository = new ApiNiniosRepository();
      const createService = new CreateNinioService(repository);
      
      const result = await createService.execute(ninioDataToSend);
      
      if (result && result.success) {
        // Éxito - Niño creado
        setSuccess(true);
        setCreatedNinio(result.data);
        
        // Mostrar alerta temporal
        setTimeout(() => {
          navigate('/ninios');
        }, 2000);
        
      } else {
        // El servicio no fue exitoso
        const errorMsg = result?.message || 'Error al registrar el niño';
        setError(errorMsg);
        console.error(' [CreateNinioPage]', errorMsg);
      }
      
    } catch (error) {
      console.error(' [CreateNinioPage] Error al crear niño:', error);
      
      let errorMessage = 'Error al registrar el niño';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnother = () => {
    setSuccess(false);
    setCreatedNinio(null);
    setError('');
  };

  const handleCancel = () => {
    navigate('/ninios');
  };

  return (
    <div className="create-ninio-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Registrar Nuevo Niño</h1>
          <p className="page-subtitle">
            Completa todos los campos para registrar un nuevo residente
          </p>
        </div>
        
        <div className="page-actions">
          <button className="btn-secondary" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>

      {/* Mensajes de error */}
      {error && (
        <div className="alert-error animate-slide-down">
          <div className="alert-content">
            <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="alert-title">Error al registrar</h3>
              <p className="alert-message">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {success && createdNinio && (
        <div className="alert-success animate-slide-down">
          <div className="alert-content">
            <svg className="alert-icon-success" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="alert-title">¡Niño registrado exitosamente!</h3>
              <div className="success-details">
                <p className="success-name">
                  {createdNinio.nombre} {createdNinio.apellido_paterno} {createdNinio.apellido_materno}
                </p>
                {createdNinio.ci && (
                  <p className="success-info">
                    CI: {createdNinio.ci}
                  </p>
                )}
                <p className="success-redirect">
                  Serás redirigido a la lista en unos segundos...
                </p>
              </div>
              <div className="success-actions">
                <button className="btn-outline" onClick={() => navigate(`/ninios/${createdNinio.id}`)}>
                  Ver detalles
                </button>
                <button className="btn-ghost" onClick={handleCreateAnother}>
                  Registrar otro niño
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario (solo mostrar si no hay éxito) */}
      {!success && (
        <div className="form-container card">
          <div className="form-header">
            <h2 className="form-title">Información del Nuevo Residente</h2>
            <p className="form-subtitle">Complete todos los campos obligatorios (*)</p>
          </div>
          
          <div className="form-content">
            <NinioForm 
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNinioPage;