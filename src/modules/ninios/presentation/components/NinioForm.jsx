//ninioForm.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, User, IdCard, Flag, Users, FileText, Save, X } from 'lucide-react';
import Card from '@components/ui/Card/Card';
import Button from '@components/ui/Button/Button';
import "./NinioForm.css"

export const NinioForm = ({ onSubmit, initialData = {}, isEditing = false, loading = false }) => {
  const [formData, setFormData] = useState({
    ci: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    sexo: 'no especificado',
    nacionalidad: 'Boliviana',
    etnia: '',
    fecha_nacimiento: '',
    fecha_ingreso: new Date().toISOString().split('T')[0],
    estado: 'activo',
    observaciones_ingreso: '',
    fecha_egreso: '',
    motivo_egreso: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      const validFields = [
        'ci', 'nombre', 'apellido_paterno', 'apellido_materno', 
        'sexo', 'nacionalidad', 'etnia', 'fecha_nacimiento', 
        'fecha_ingreso', 'estado', 'observaciones_ingreso', 
        'fecha_egreso', 'motivo_egreso'
      ];
      
      const filteredData = {};
      validFields.forEach(field => {
        if (initialData[field] !== undefined) {
          filteredData[field] = initialData[field];
        }
      });
      
      setFormData(prev => ({
        ...prev,
        ...filteredData
      }));
    }
  }, [initialData]);

  const fechaHoy = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? e.target.checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.ci.trim()) {
      newErrors.ci = 'CI es requerido';
    } else if (!/^\d+$/.test(formData.ci.replace(/\s/g, ''))) {
      newErrors.ci = 'CI debe contener solo números';
    }
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Nombre es requerido';
    }
    
    if (!formData.apellido_paterno.trim()) {
      newErrors.apellido_paterno = 'Apellido paterno es requerido';
    }
    
    if (!formData.fecha_nacimiento) {
      newErrors.fecha_nacimiento = 'Fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.fecha_nacimiento);
      const today = new Date();
      if (birthDate > today) {
        newErrors.fecha_nacimiento = 'Fecha no puede ser futura';
      }
    }
    
    if (!formData.fecha_ingreso) {
      newErrors.fecha_ingreso = 'Fecha de ingreso es requerida';
    }
    
    if (formData.fecha_egreso && formData.fecha_ingreso) {
      const ingreso = new Date(formData.fecha_ingreso);
      const egreso = new Date(formData.fecha_egreso);
      if (egreso < ingreso) {
        newErrors.fecha_egreso = 'Fecha de egreso no puede ser anterior al ingreso';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const calcularEdad = useMemo(() => {
    if (!formData.fecha_nacimiento) return '';
    const birthDate = new Date(formData.fecha_nacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} años`;
  }, [formData.fecha_nacimiento]);

  if (isEditing && Object.keys(initialData).length === 0) {
    return (
      <div className="form-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Cargando datos del niño...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ninio-form">
      {/* Sección 1: Identificación Personal */}
      <div className="form-section">
        <div className="section-header">
          <div className="section-icon primary">
            <IdCard className="section-icon-svg" />
          </div>
          <div>
            <h3 className="section-title">Identificación Personal</h3>
            <p className="section-subtitle">Datos básicos de identificación</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label required">
              CI / Documento de Identidad
            </label>
            <input
              type="text"
              name="ci"
              value={formData.ci}
              onChange={handleChange}
              required
              className={`form-input ${errors.ci ? 'input-error' : ''}`}
              placeholder="Ej: 1234567"
            />
            {errors.ci && <p className="form-error">{errors.ci}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Nacionalidad
            </label>
            <div className="input-with-icon">
              <input
                type="text"
                name="nacionalidad"
                value={formData.nacionalidad}
                onChange={handleChange}
                className="form-input"
                placeholder="Boliviana"
              />
              <Flag className="input-icon" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label required">
              Nombre(s)
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className={`form-input ${errors.nombre ? 'input-error' : ''}`}
              placeholder="Ej: María José"
            />
            {errors.nombre && <p className="form-error">{errors.nombre}</p>}
          </div>

          <div className="form-group">
            <label className="form-label required">
              Apellido Paterno
            </label>
            <input
              type="text"
              name="apellido_paterno"
              value={formData.apellido_paterno}
              onChange={handleChange}
              required
              className={`form-input ${errors.apellido_paterno ? 'input-error' : ''}`}
              placeholder="Ej: Pérez"
            />
            {errors.apellido_paterno && <p className="form-error">{errors.apellido_paterno}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Apellido Materno
            </label>
            <input
              type="text"
              name="apellido_materno"
              value={formData.apellido_materno}
              onChange={handleChange}
              className="form-input"
              placeholder="Ej: Rodríguez"
            />
          </div>
        </div>
      </div>

      {/* Sección 2: Información Demográfica */}
      <div className="form-section">
        <div className="section-header">
          <div className="section-icon secondary">
            <User className="section-icon-svg" />
          </div>
          <div>
            <h3 className="section-title">Información Demográfica</h3>
            <p className="section-subtitle">Datos personales y demográficos</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label required">
              Sexo
            </label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="no especificado">No especificado</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label required">
              Fecha de Nacimiento
            </label>
            <div className="input-with-icon">
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                required
                className={`form-input ${errors.fecha_nacimiento ? 'input-error' : ''}`}
                max={fechaHoy}
              />
              <Calendar className="input-icon" />
            </div>
            {errors.fecha_nacimiento && <p className="form-error">{errors.fecha_nacimiento}</p>}
            {formData.fecha_nacimiento && (
              <p className="form-hint">
                Edad aproximada: <span className="hint-value">{calcularEdad}</span>
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Etnia
            </label>
            <input
              type="text"
              name="etnia"
              value={formData.etnia}
              onChange={handleChange}
              className="form-input"
              placeholder="Ej: Quechua, Aymara"
            />
          </div>
        </div>
      </div>

      {/* Sección 3: Información del Hogar */}
      <div className="form-section">
        <div className="section-header">
          <div className="section-icon accent">
            <Users className="section-icon-svg" />
          </div>
          <div>
            <h3 className="section-title">Información del Hogar</h3>
            <p className="section-subtitle">Datos de ingreso y estado en el hogar</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label required">
              Fecha de Ingreso
            </label>
            <div className="input-with-icon">
              <input
                type="date"
                name="fecha_ingreso"
                value={formData.fecha_ingreso || fechaHoy}
                onChange={handleChange}
                required
                className={`form-input ${errors.fecha_ingreso ? 'input-error' : ''}`}
                max={fechaHoy}
              />
              <Calendar className="input-icon" />
            </div>
            {errors.fecha_ingreso && <p className="form-error">{errors.fecha_ingreso}</p>}
          </div>

          <div className="form-group">
            <label className="form-label required">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="activo">Activo</option>
              <option value="egresado">Egresado</option>
              <option value="inactivo">Inactivo</option>
              <option value="transferido">Transferido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sección 4: Información de Egreso */}
      {formData.estado === 'egresado' && (
        <div className="form-section fade-in">
          <div className="section-warning">
            <h3 className="section-title">Información de Egreso</h3>
            <p className="section-subtitle">Datos de salida del hogar</p>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Fecha de Egreso
              </label>
              <input
                type="date"
                name="fecha_egreso"
                value={formData.fecha_egreso}
                onChange={handleChange}
                className={`form-input ${errors.fecha_egreso ? 'input-error' : ''}`}
                max={fechaHoy}
              />
              {errors.fecha_egreso && <p className="form-error">{errors.fecha_egreso}</p>}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Motivo de Egreso
              </label>
              <input
                type="text"
                name="motivo_egreso"
                value={formData.motivo_egreso}
                onChange={handleChange}
                className="form-input"
                placeholder="Ej: Reunificación familiar, Mayoría de edad"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sección 5: Observaciones */}
      <div className="form-section">
        <div className="section-header">
          <div className="section-icon gray">
            <FileText className="section-icon-svg" />
          </div>
          <div>
            <h3 className="section-title">Observaciones</h3>
            <p className="section-subtitle">Información adicional relevante</p>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Observaciones de Ingreso
          </label>
          <textarea
            name="observaciones_ingreso"
            value={formData.observaciones_ingreso}
            onChange={handleChange}
            rows={4}
            className="form-textarea"
            placeholder="Notas adicionales, condiciones especiales, historial médico, situación familiar, etc..."
          />
          <p className="form-hint">
            Esta información será útil para el seguimiento y atención del niño.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <Button
          type="button"
          variant="outline"
          size="large"
          onClick={() => window.history.back()}
          disabled={loading}
          className="cancel-button"
          icon={<X className="button-icon" />}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          size="large"
          loading={loading}
          disabled={loading}
          className="submit-button"
          icon={<Save className="button-icon" />}
          iconPosition="left"
        >
          {isEditing ? 'Actualizar Residente' : 'Guardar Residente'}
        </Button>
      </div>
    </form>
  );
};