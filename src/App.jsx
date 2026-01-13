// src/App.jsx - VERSIÓN CORRECTA
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import AppRoutes from './pages/routes/AppRoutes.jsx'; // Importar AppRoutes
import ErrorBoundary from './components/shared/ErrorBoundary.jsx';
import './assets/styles/global.css';
import './assets/styles/prime-react.css';

// Componente de carga inline
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Cargando aplicación...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <NotificationProvider>
             
                <AppRoutes /> 
              
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;