/**
 * LoginForm Component - Sistema del Hogar de Niños
 * Formulario de inicio de sesión
 */

import React, { useState } from 'react';
import '../../../../assets/styles/global.css';
import '../../../../assets/styles/theme.css';

export const LoginForm = ({ onSubmit, isLoading = false, error = null }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    
    const result = await onSubmit(formData);
    
    if (result && result.errors) {
      setFormErrors(result.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2" style={{ color: 'var(--text-primary)' }}>
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className="input-primary"
          placeholder="tu@email.com"
          autoComplete="email"
        />
        {formErrors.email && (
          <p className="mt-1 text-sm" style={{ color: 'var(--error)' }}>
            {formErrors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-2" style={{ color: 'var(--text-primary)' }}>
          Contraseña
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className="input-primary"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn-ghost"
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '4px 8px',
            }}
            tabIndex={-1}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {formErrors.password && (
          <p className="mt-1 text-sm" style={{ color: 'var(--error)' }}>
            {formErrors.password}
          </p>
        )}
      </div>

      {/* Remember Me */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            disabled={isLoading}
            style={{ cursor: 'pointer' }}
          />
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Recordarme
          </span>
        </label>
        
        <a
          href="#forgot-password"
          style={{
            color: 'var(--primary-blue)',
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary"
        style={{
          width: '100%',
          padding: '12px',
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
            Iniciando sesión...
          </span>
        ) : (
          'Iniciar Sesión'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
