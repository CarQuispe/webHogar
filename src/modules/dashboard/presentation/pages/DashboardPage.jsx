// src/modules/dashboard/presentation/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { PlusCircle, FolderKanban, FileText, ChevronRight } from 'lucide-react';
import './DashboardPage.css';

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Quick actions con sus rutas - CORREGIDAS
  const quickActions = [
    { 
      id: 'create-ninio', 
      label: 'Agregar Niño', 
      description: 'Registrar nuevo residente',
      icon: PlusCircle,
      route: '/ninios/crear', // Cambiado a /ninios/crear
      color: 'var(--primary-blue)'
    },
    { 
      id: 'create-proyecto', 
      label: 'Nuevo Proyecto', 
      description: 'Crear proyecto activo',
      icon: FolderKanban,
      route: '/proyectos/crear', // Cambiado a /proyectos/crear
      color: 'var(--accent-orange)'
    },
    { 
      id: 'create-sedepos', 
      label: 'Reporte SEDEPOS', 
      description: 'Generar reporte oficial',
      icon: FileText,
      route: '/sedepos/nuevo', // Cambiado a /sedepos/nuevo
      color: 'var(--secondary-green)'
    },
  ];

  const stats = [
    { id: 1, title: 'Total Residentes', value: '45', icon: '👶', color: 'var(--primary-blue)', trend: '+3 este mes' },
    { id: 2, title: 'Nuevos Este Mes', value: '3', icon: '➕', color: 'var(--secondary-green)', trend: '+100%' },
    { id: 3, title: 'Proyectos Activos', value: '8', icon: '📋', color: 'var(--accent-orange)', trend: '2 completados' },
    { id: 4, title: 'Personal Activo', value: '12', icon: '👥', color: 'var(--info)', trend: '+1 nuevo' },
    { id: 5, title: 'Reportes Pendientes', value: '5', icon: '📄', color: 'var(--warning)', trend: '3 por revisar' },
    { id: 6, title: 'Tasa de Egreso', value: '92%', icon: '📈', color: 'var(--success)', trend: '+2% vs mes pasado' },
  ];

  const recentActivities = [
    { id: 1, text: 'Nuevo residente registrado: María García', time: 'Hace 2 horas', icon: '👶', type: 'residente' },
    { id: 2, text: 'Proyecto "Educación" actualizado', time: 'Hace 4 horas', icon: '📋', type: 'proyecto' },
    { id: 3, text: 'Reporte SEDEPOS generado', time: 'Hace 1 día', icon: '📄', type: 'reporte' },
    { id: 4, text: 'Nuevo usuario registrado', time: 'Hace 2 días', icon: '👤', type: 'usuario' },
    { id: 5, text: 'Evaluación médica completada', time: 'Hace 3 días', icon: '🏥', type: 'salud' },
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <h1 className="dashboard-title">
          Bienvenido, {user?.firstName || user?.username || 'Usuario'}! 👋
        </h1>
        <p className="dashboard-subtitle">
          Aquí está un resumen de las actividades del hogar
        </p>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h3 className="section-title">
          Acciones Rápidas
        </h3>
        <div className="quick-actions-grid">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleNavigation(action.route)}
                className="quick-action-card card animate-fade-in"
              >
                <div 
                  className="quick-action-icon"
                  style={{ backgroundColor: `${action.color}20`, color: action.color }}
                >
                  <Icon className="action-icon" />
                </div>
                <div className="quick-action-content">
                  <h4 className="action-title">
                    {action.label}
                  </h4>
                  <p className="action-description">
                    {action.description}
                  </p>
                </div>
                <ChevronRight className="action-chevron" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-section">
        <h3 className="section-title">
          Estadísticas
        </h3>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="stat-card card animate-fade-in"
            >
              <div 
                className="stat-icon"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                {stat.icon}
              </div>
              <div className="stat-content">
                <p className="stat-title">
                  {stat.title}
                </p>
                <h2 className="stat-value" style={{ color: stat.color }}>
                  {stat.value}
                </h2>
                <p className="stat-trend">
                  {stat.trend}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3 className="section-title">
            Actividad Reciente
          </h3>
          <button 
            onClick={() => handleNavigation('/actividad')}
            className="view-all-btn"
          >
            Ver todo
          </button>
        </div>
        <div className="activity-list card">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="activity-item"
            >
              <div className="activity-icon">
                {activity.icon}
              </div>
              <div className="activity-content">
                <p className="activity-text">
                  {activity.text}
                </p>
                <p className="activity-time">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;