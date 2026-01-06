// src/App.jsx - VERSIÓN CORREGIDA
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import AppRoutes from './pages/routes/AppRoutes.jsx';
import ErrorBoundary from './components/shared/ErrorBoundary.jsx';
import './assets/styles/global.css';
import './assets/styles/prime-react.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <NotificationProvider>
              <div className="app-container">
                <AppRoutes />
              </div>
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}


export default App;