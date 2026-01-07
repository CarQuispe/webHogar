// src/modules/ninios/presentation/components/NinioForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, User, IdCard, Flag, Users, FileText, Save, X } from 'lucide-react';
import Card from '@components/ui/Card/Card';
import Button from '@components/ui/Button/Button';

export const NinioForm = ({ onSubmit, initialData = {}, isEditing = false, loading = false }) => {
  // Estado inicial solo con campos que existen en la BD
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
    // Removidos: telefono, email, direccion, responsable, estado_civil
  });

  const [errors, setErrors] = useState({});

  // Actualizar formulario cuando haya datos iniciales
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      // Solo tomar campos que existen en la BD
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

  // Fecha actual memoizada
  const fechaHoy = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? e.target.checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validación del formulario
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

  // Calcular edad a partir de la fecha de nacimiento
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

  // Mostrar estado de carga si es edición y no hay datos
  if (isEditing && Object.keys(initialData).length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" style={{ width: '48px', height: '48px' }}></div>
          <p className="text-gray-600 font-medium">Cargando datos del niño...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      {/* Sección 1: Identificación Personal */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-blue/10 rounded-lg">
            <IdCard className="w-6 h-6 text-primary-blue" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Identificación Personal</h3>
            <p className="text-sm text-gray-600">Datos básicos de identificación</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CI / Documento de Identidad *
            </label>
            <input
              type="text"
              name="ci"
              value={formData.ci}
              onChange={handleChange}
              required
              className="input-primary"
              placeholder="Ej: 1234567"
            />
            {errors.ci && (
              <p className="mt-1 text-sm text-error">{errors.ci}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nacionalidad
            </label>
            <div className="relative">
              <input
                type="text"
                name="nacionalidad"
                value={formData.nacionalidad}
                onChange={handleChange}
                className="input-primary pl-10"
                placeholder="Boliviana"
              />
              <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre(s) *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="input-primary"
              placeholder="Ej: María José"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-error">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellido Paterno *
            </label>
            <input
              type="text"
              name="apellido_paterno"
              value={formData.apellido_paterno}
              onChange={handleChange}
              required
              className="input-primary"
              placeholder="Ej: Pérez"
            />
            {errors.apellido_paterno && (
              <p className="mt-1 text-sm text-error">{errors.apellido_paterno}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellido Materno
            </label>
            <input
              type="text"
              name="apellido_materno"
              value={formData.apellido_materno}
              onChange={handleChange}
              className="input-primary"
              placeholder="Ej: Rodríguez"
            />
          </div>
        </div>
      </div>

      {/* Sección 2: Información Demográfica */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-secondary-green/10 rounded-lg">
            <User className="w-6 h-6 text-secondary-green" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Información Demográfica</h3>
            <p className="text-sm text-gray-600">Datos personales y demográficos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sexo *
            </label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required
              className="input-primary"
            >
              <option value="no especificado">No especificado</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Nacimiento *
            </label>
            <div className="relative">
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                required
                className="input-primary pl-10"
                max={fechaHoy}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.fecha_nacimiento && (
              <p className="mt-1 text-sm text-error">{errors.fecha_nacimiento}</p>
            )}
            {formData.fecha_nacimiento && (
              <p className="mt-1 text-sm text-gray-600">
                Edad aproximada: <span className="font-medium">{calcularEdad}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Etnia
            </label>
            <input
              type="text"
              name="etnia"
              value={formData.etnia}
              onChange={handleChange}
              className="input-primary"
              placeholder="Ej: Quechua, Aymara"
            />
          </div>
        </div>
      </div>

      {/* Sección 3: Información del Hogar */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent-orange/10 rounded-lg">
            <Users className="w-6 h-6 text-accent-orange" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Información del Hogar</h3>
            <p className="text-sm text-gray-600">Datos de ingreso y estado en el hogar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Ingreso *
            </label>
            <div className="relative">
              <input
                type="date"
                name="fecha_ingreso"
                value={formData.fecha_ingreso || fechaHoy}
                onChange={handleChange}
                required
                className="input-primary pl-10"
                max={fechaHoy}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.fecha_ingreso && (
              <p className="mt-1 text-sm text-error">{errors.fecha_ingreso}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado *
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="input-primary"
            >
              <option value="activo">Activo</option>
              <option value="egresado">Egresado</option>
              <option value="inactivo">Inactivo</option>
              <option value="transferido">Transferido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sección 4: Información de Egreso (condicional) */}
      {formData.estado === 'egresado' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-l-4 border-warning pl-4">
            <h3 className="text-xl font-semibold text-gray-900">Información de Egreso</h3>
            <p className="text-sm text-gray-600">Datos de salida del hogar</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Egreso
              </label>
              <input
                type="date"
                name="fecha_egreso"
                value={formData.fecha_egreso}
                onChange={handleChange}
                className="input-primary"
                max={fechaHoy}
              />
              {errors.fecha_egreso && (
                <p className="mt-1 text-sm text-error">{errors.fecha_egreso}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo de Egreso
              </label>
              <input
                type="text"
                name="motivo_egreso"
                value={formData.motivo_egreso}
                onChange={handleChange}
                className="input-primary"
                placeholder="Ej: Reunificación familiar, Mayoría de edad"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sección 5: Observaciones */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-400/10 rounded-lg">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Observaciones</h3>
            <p className="text-sm text-gray-600">Información adicional relevante</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones de Ingreso
          </label>
          <textarea
            name="observaciones_ingreso"
            value={formData.observaciones_ingreso}
            onChange={handleChange}
            rows={4}
            className="input-primary resize-none"
            placeholder="Notas adicionales, condiciones especiales, historial médico, situación familiar, etc..."
          />
          <p className="mt-1 text-sm text-gray-500">
            Esta información será útil para el seguimiento y atención del niño.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          size="large"
          onClick={() => window.history.back()}
          disabled={loading}
          className="w-full sm:w-auto"
          icon={<X className="w-4 h-4" />}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          size="large"
          loading={loading}
          disabled={loading}
          className="w-full sm:w-auto"
          icon={<Save className="w-4 h-4" />}
          iconPosition="left"
        >
          {isEditing ? 'Actualizar Residente' : 'Guardar Residente'}
        </Button>
      </div>
    </form>
  );
};