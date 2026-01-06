// src/modules/auth/presentation/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import '../../../../assets/styles/global.css';
import '../../../../assets/styles/theme.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo al cambiar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Preparar datos para el backend
      const userData = {
        email: formData.email.trim(),
        password: formData.password,
        name: formData.name.trim()
      };
      
      console.log('RegisterPage: Enviando datos:', userData);
      
      const result = await register(userData);
      console.log('RegisterPage: Resultado del registro:', result);
      
      if (result.success) {
        setSuccessMessage('¡Registro exitoso! Redirigiendo al login...');
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          name: '',
          confirmPassword: ''
        });
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrors({ general: result.error || 'Error en el registro' });
      }
    } catch (error) {
      console.error('RegisterPage: Error:', error);
      setErrors({ general: 'Error inesperado. Intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--secondary-green) 0%, var(--primary-blue) 100%)',
        padding: '20px',
      }}
    >
      <div
        className="card animate-fade-in"
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}
      >
        {/* Logo y Título */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, var(--primary-blue), var(--secondary-green))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'white'
            }}
          >
            📝
          </div>
          <h1 style={{ 
            marginBottom: '8px', 
            color: 'var(--gray-900)',
            fontSize: '1.75rem',
            fontWeight: '600'
          }}>
            Crear Cuenta
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)',
            fontSize: '0.95rem'
          }}>
            Regístrate en el Sistema Hogar de Niños
          </p>
        </div>

        {/* Mensajes de éxito/error */}
        {successMessage && (
          <div style={{
            backgroundColor: 'var(--success-10)',
            border: '1px solid var(--success)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: 'var(--success)',
            fontSize: '0.9rem'
          }}>
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div style={{
            backgroundColor: 'var(--error-10)',
            border: '1px solid var(--error)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: 'var(--error)',
            fontSize: '0.9rem'
          }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-primary)'
            }}>
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Pérez"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.name ? 'var(--error)' : 'var(--border-color)'}`,
                borderRadius: '8px',
                fontSize: '0.95rem',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-blue)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.name ? 'var(--error)' : 'var(--border-color)';
              }}
            />
            {errors.name && (
              <p style={{
                color: 'var(--error)',
                fontSize: '0.75rem',
                marginTop: '4px'
              }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-primary)'
            }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario@ejemplo.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.email ? 'var(--error)' : 'var(--border-color)'}`,
                borderRadius: '8px',
                fontSize: '0.95rem',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-blue)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? 'var(--error)' : 'var(--border-color)';
              }}
            />
            {errors.email && (
              <p style={{
                color: 'var(--error)',
                fontSize: '0.75rem',
                marginTop: '4px'
              }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-primary)'
            }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.password ? 'var(--error)' : 'var(--border-color)'}`,
                borderRadius: '8px',
                fontSize: '0.95rem',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-blue)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.password ? 'var(--error)' : 'var(--border-color)';
              }}
            />
            {errors.password && (
              <p style={{
                color: 'var(--error)',
                fontSize: '0.75rem',
                marginTop: '4px'
              }}>
                {errors.password}
              </p>
            )}
            <small style={{
              display: 'block',
              marginTop: '4px',
              color: 'var(--text-tertiary)',
              fontSize: '0.75rem'
            }}>
              Mínimo 6 caracteres
            </small>
          </div>

          {/* Campo Confirmar Contraseña */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-primary)'
            }}>
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.confirmPassword ? 'var(--error)' : 'var(--border-color)'}`,
                borderRadius: '8px',
                fontSize: '0.95rem',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-blue)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.confirmPassword ? 'var(--error)' : 'var(--border-color)';
              }}
            />
            {errors.confirmPassword && (
              <p style={{
                color: 'var(--error)',
                fontSize: '0.75rem',
                marginTop: '4px'
              }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            style={{
              width: '100%',
              padding: '14px 20px',
              backgroundColor: 'var(--primary-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = 'var(--primary-blue-dark)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = 'var(--primary-blue)';
              }
            }}
          >
            {isSubmitting ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  marginRight: '8px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Registrando...
              </span>
            ) : (
              'Crear Cuenta'
            )}
          </button>

          {/* Separador */}
          <div style={{
            margin: '32px 0',
            borderTop: '1px solid var(--border-color)'
          }}></div>

          {/* Link a Login */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.875rem',
              marginBottom: '16px'
            }}>
              ¿Ya tienes una cuenta?
            </p>
            <Link
              to="/login"
              style={{
                display: 'inline-block',
                padding: '10px 24px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                e.currentTarget.style.borderColor = 'var(--primary-blue)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              Iniciar Sesión
            </Link>
          </div>
        </form>
      </div>

      {/* Estilos para spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default RegisterPage;