// src/pages/routes/AppRoutes.jsx

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import LoadingSpinner from '../../components/shared/LoadingSpinner.jsx';

// ======================
// PÁGINAS PÚBLICAS (Lazy Loading)
// ======================

const HomePage = lazy(() => import('../HomePage.jsx'));
const NotFoundPage = lazy(() => import('../NotFoundPage.jsx'));

// Módulo Auth
const LoginPage = lazy(() => import('../../modules/auth/presentation/pages/LoginPage.jsx'));
const RegisterPage = lazy(() => import('../../modules/auth/presentation/pages/RegisterPage.jsx'));

// ======================
// PÁGINAS PRIVADAS (Lazy Loading)
// ======================

// Dashboard
const DashboardPage = lazy(() => import('../../modules/dashboard/presentation/pages/DashboardPage.jsx'));

// Módulo de Niños
const NiniosListPage = lazy(() => import('../../modules/ninios/presentation/pages/NiniosListPage.jsx'));
const NinioDetailPage = lazy(() => import('../../modules/ninios/presentation/pages/NinioDetailPage.jsx'));
const CreateNinioPage = lazy(() => import('../../modules/ninios/presentation/pages/CreateNinioPage.jsx'));

// Módulo de Proyectos
const ProyectosListPage = lazy(() => import('../../modules/proyectos/presentation/proyectosListPage.jsx'));
const ProyectosPage = lazy(() => import('../../modules/proyectos/pages/proyectosPage.jsx'));

// Módulo de SEDEPOS
const SedeposListPage = lazy(() => import('../../modules/sedepos/presentation/pages/sedeposListPage.jsx'));
const SedeposPage = lazy(() => import('../../modules/sedepos/presentation/pages/sedeposPage.jsx'));

// ======================
// COMPONENTE DE RUTAS
// ======================
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* ===== RUTAS PÚBLICAS ===== */}
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        
        {/* ===== RUTAS PRIVADAS ===== */}
        
        {/* Dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        
        {/* Rutas de Niños */}
        <Route path="/ninios" element={
          <PrivateRoute>
            <NiniosListPage />
          </PrivateRoute>
        } />
        
        <Route path="/ninios/create" element={
          <PrivateRoute>
            <CreateNinioPage />
          </PrivateRoute>
        } />
        
        <Route path="/ninios/:id" element={
          <PrivateRoute>
            <NinioDetailPage />
          </PrivateRoute>
        } />
        
        <Route path="/ninios/edit/:id" element={
          <PrivateRoute>
            <CreateNinioPage />
          </PrivateRoute>
        } />
        
        {/* Rutas de Proyectos */}
        <Route path="/proyectos" element={
          <PrivateRoute>
            <ProyectosListPage />
          </PrivateRoute>
        } />
        
        <Route path="/proyectos/create" element={
          <PrivateRoute>
            <ProyectosPage />
          </PrivateRoute>
        } />
        
        <Route path="/proyectos/:id" element={
          <PrivateRoute>
            <ProyectosPage />
          </PrivateRoute>
        } />
        
        <Route path="/proyectos/edit/:id" element={
          <PrivateRoute>
            <ProyectosPage />
          </PrivateRoute>
        } />
        
        {/* Rutas de SEDEPOS */}
        <Route path="/sedepos" element={
          <PrivateRoute>
            <SedeposListPage />
          </PrivateRoute>
        } />
        
        <Route path="/sedepos/create" element={
          <PrivateRoute>
            <SedeposPage />
          </PrivateRoute>
        } />
        
        <Route path="/sedepos/:id" element={
          <PrivateRoute>
            <SedeposPage />
          </PrivateRoute>
        } />
        
        <Route path="/sedepos/edit/:id" element={
          <PrivateRoute>
            <SedeposPage />
          </PrivateRoute>
        } />
        
        {/* ===== RUTAS ESPECIALES ===== */}
        {/* Redirección después de login */}
        <Route path="/auth-redirect" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />
        
        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;