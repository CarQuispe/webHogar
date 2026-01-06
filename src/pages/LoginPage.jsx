// src/pages/LoginPage.jsx - VERSIÓN MEJORADA
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Button from '../components/ui/Button/Button';
import Input from '../components/ui/Input/Input';
import Card from '../components/ui/Card/Card';
import Alert from '../components/ui/Alert/Alert';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  // Cargar email recordado
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!email.trim()) {
      setError('El email es requerido');
      return;
    }
    
    if (!password) {
      setError('La contraseña es requerida');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      console.log('🔄 LoginPage: Enviando credenciales...');
      const result = await login({ email: email.trim(), password });
      
      console.log('📋 LoginPage: Resultado:', result);
      
      if (result.success) {
        console.log('✅ LoginPage: Éxito!');
        
        // Guardar preferencia "Recordar usuario"
        if (rememberMe) {
          localStorage.setItem('remembered_email', email);
        } else {
          localStorage.removeItem('remembered_email');
        }
        
        // Redirigir
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
        
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('💥 LoginPage: Error:', error);
      setError(error.message || 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading mientras verifica autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Encabezado */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl text-white">🏠</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sistema Hogar</h1>
          <p className="text-gray-600">Gestión Integral del Hogar</p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Backend conectado</span>
          </div>
        </div>

        {/* Tarjeta del formulario */}
        <Card 
          padding="large" 
          className="shadow-xl animate-slide-up"
          footer={
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                ¿Problemas para ingresar?{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  onClick={() => navigate('/support')}
                >
                  Contactar soporte
                </button>
              </p>
              <p className="text-gray-600 text-sm mt-2">
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  onClick={() => navigate('/register')}
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          }
        >
          {/* Mensaje de error */}
          {error && (
            <Alert 
              type="error" 
              message={error}
              className="mb-6 animate-shake"
              onClose={() => setError('')}
            />
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              icon="mail"
              autoComplete="email"
            />
            
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              icon="lock"
              autoComplete="current-password"
            />
            
            {/* Opciones adicionales */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Recordar mi usuario</span>
              </label>
              
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => navigate('/forgot-password')}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            
            {/* Botón de envío */}
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              fullWidth
              size="large"
              disabled={loading}
              className="mt-2"
              icon={loading ? null : "login"}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </Card>

        {/* Información del sistema */}
        <div className="mt-8 text-center">
          <div className="inline-grid grid-cols-3 gap-6 text-xs text-gray-500">
            <div className="text-center">
              <div className="font-semibold">API</div>
              <div className="mt-1 truncate max-w-[120px]">
                {import.meta.env.VITE_API_URL 
                  ? 'Conectada ✓' 
                  : 'No configurada ✗'}
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Ambiente</div>
              <div className="mt-1">
                {import.meta.env.MODE || 'development'}
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Versión</div>
              <div className="mt-1">
                v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;