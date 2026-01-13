import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

// Loading
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Públicas
const HomePage = lazy(() => import('../HomePage.jsx'));
const LoginPage = lazy(() => import('../../modules/auth/presentation/pages/LoginPage.jsx'));
const NotFoundPage = lazy(() => import('../NotFoundPage.jsx'));

// Privadas - Dashboard
const DashboardPage = lazy(() => import('../../modules/dashboard/presentation/pages/DashboardPage.jsx'));

// Módulo Niños
const NiniosListPage = lazy(() => import('../../modules/ninios/presentation/pages/NiniosListPage.jsx'));
const CreateNinioPage = lazy(() => import('../../modules/ninios/presentation/pages/CreateNinioPage.jsx'));
const NinioDetailPage = lazy(() => import('../../modules/ninios/presentation/pages/NinioDetailPage.jsx'));

// Módulo Proyectos
const ProyectosPage = lazy(() => import('../../modules/proyectos/presentation/ProyectosPage.jsx'));
const ProyectosListPage = lazy(() => import('../../modules/proyectos/presentation/ProyectosListPage.jsx'));
const ProyectoDetailPage = lazy(() => import('../../modules/proyectos/presentation/ProyectoDetailPage.jsx'));
const CreateProyectoPage = lazy(() => import('../../modules/proyectos/presentation/CreateProyectoPage.jsx'));

// Módulo SEDEPOS
const SedeposPage = lazy(() => import('../../modules/sedepos/presentation/pages/SedeposPage.jsx'));
const SedeposListPage = lazy(() => import('../../modules/sedepos/presentation/pages/SedeposListPage.jsx'));
const CreateSedeposPage = lazy(() => import('../../modules/sedepos/presentation/pages/CreateSedeposPage.jsx'));

// Módulo Usuarios
const UsuariosPage = lazy(() => import('../../modules/usuarios/presentation/pages/UsuariosPage.jsx'));
const UsuariosListPage = lazy(() => import('../../modules/usuarios/presentation/pages/UsuariosListPage.jsx'));
const UsuarioCreatePage = lazy(() => import('../../modules/usuarios/presentation/pages/UsuarioCreatePage.jsx'));
const UsuarioEditPage = lazy(() => import('../../modules/usuarios/presentation/pages/UsuarioEditPage.jsx'));
const PermisosPage = lazy(() => import('../../modules/usuarios/presentation/pages/PermisosPage.jsx'));

// Módulo Permisos
const PermisosComponent = lazy(() => import('../../modules/Permisos/components/Permisos.jsx'));

const AppRoutes = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Módulo Niños */}
          <Route path="/ninios" element={<NiniosListPage />} />
          <Route path="/ninios/crear" element={<CreateNinioPage />} />
          <Route path="/ninios/editar/:id" element={<CreateNinioPage />} />
          <Route path="/ninios/:id" element={<NinioDetailPage />} />
          
          {/* Módulo Proyectos */}
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/proyectos/lista" element={<ProyectosListPage />} />
          <Route path="/proyectos/crear" element={<CreateProyectoPage />} />
          <Route path="/proyectos/editar/:id" element={<CreateProyectoPage />} />
          <Route path="/proyectos/:id" element={<ProyectoDetailPage />} />
          
          {/* Módulo SEDEPOS */}
          <Route path="/sedepos" element={<SedeposPage />} />
          <Route path="/sedepos/lista" element={<SedeposListPage />} />
          <Route path="/sedepos/nuevo" element={<CreateSedeposPage />} />
          <Route path="/sedepos/editar/:id" element={<CreateSedeposPage />} />
          
          {/* Módulo Usuarios */}
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/usuarios/lista" element={<UsuariosListPage />} />
          <Route path="/usuarios/crear" element={<UsuarioCreatePage />} />
          <Route path="/usuarios/editar/:id" element={<UsuarioEditPage />} />
          <Route path="/usuarios/permisos" element={<PermisosPage />} />
          
          {/* Módulo Permisos */}
          <Route path="/permisos" element={<PermisosComponent />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;