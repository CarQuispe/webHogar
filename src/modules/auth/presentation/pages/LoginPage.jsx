// src/modules/auth/presentation/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { LoginForm } from '../components/LoginForm.jsx';
import '../../../../assets/styles/global.css';
import '../../../../assets/styles/theme.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error } = useAuth();
  const [localError, setLocalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirigir si ya está autenticado
  useEffect(() => {
    console.log('LoginPage: isAuthenticated:', isAuthenticated);
    console.log('LoginPage: loading:', loading);
    
    if (isAuthenticated) {
      console.log('LoginPage: Usuario ya autenticado, redirigiendo a dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (credentials) => {
    console.log('LoginPage: handleLogin llamado con:', credentials);
    
    setIsSubmitting(true);
    setLocalError('');
    
    try {
      // Validar campos
      if (!credentials.email || !credentials.password) {
        setLocalError('Email y contraseña son requeridos');
        return { success: false, error: 'Campos requeridos' };
      }

      // Limpiar credenciales
      const cleanCredentials = {
        email: credentials.email.trim(),
        password: credentials.password
      };
      
      console.log('LoginPage: Enviando credenciales limpias:', cleanCredentials);
      
      // Usar AuthContext en lugar de LoginService directamente
      const result = await login(cleanCredentials);
      console.log('LoginPage: Resultado del login (AuthContext):', result);
      
      if (result.success) {
        console.log('LoginPage: Login exitoso, redirigiendo...');
        
        // Guardar rememberMe si está marcado
        if (credentials.rememberMe) {
          localStorage.setItem('remember_me', 'true');
          localStorage.setItem('remembered_email', credentials.email);
        } else {
          localStorage.removeItem('remember_me');
          localStorage.removeItem('remembered_email');
        }
        
        // Navegar al dashboard
        navigate('/dashboard');
        return { success: true };
      } else {
        const errorMsg = result.error || 'Credenciales incorrectas';
        setLocalError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      console.error('LoginPage: Error inesperado:', error);
      const errorMsg = error.message || 'Error al iniciar sesión';
      setLocalError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  // Mostrar loading mientras se verifica autenticación
  if (loading && !isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%)',
      }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%)',
        padding: '20px',
      }}
    >
      <div
        className="card animate-fade-in"
        style={{
          maxWidth: '450px',
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
            🏠
          </div>
          <h1 style={{ 
            marginBottom: '8px', 
            color: 'var(--gray-900)',
            fontSize: '1.75rem',
            fontWeight: '600'
          }}>
            Hogar de Niños
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)',
            fontSize: '0.95rem'
          }}>
            Sistema de Gestión - Iniciar Sesión
          </p>
        </div>

        {/* Mensajes de error */}
        {(error || localError) && (
          <div style={{
            backgroundColor: 'var(--error-10)',
            border: '1px solid var(--error)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: 'var(--error)',
            fontSize: '0.9rem'
          }}>
            {error || localError}
          </div>
        )}

        {/* Formulario de Login */}
        <LoginForm 
          onSubmit={handleLogin} 
          isLoading={isSubmitting || loading} 
          error={localError} 
        />

        {/* Link a Registro */}
        <div style={{ 
          marginTop: '24px', 
          textAlign: 'center',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-color)'
        }}>
      
        </div>
      </div>
    </div>
  );
};

export default LoginPage;