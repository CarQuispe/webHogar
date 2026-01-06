// src/modules/dashboard/presentation/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import '../../../../assets/styles/global.css';
import '../../../../assets/styles/theme.css';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  FileText, 
  FolderKanban, 
  Settings, 
  LogOut,
  Bell,
  Search,
  ChevronRight,
  User,
  PlusCircle,
  BarChart3,
  Calendar,
  Shield
} from 'lucide-react';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Menu items con sus rutas
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/dashboard' },
    { id: 'ninios', label: 'Niños', icon: Users, route: '/ninios' },
    { id: 'proyectos', label: 'Proyectos', icon: FolderKanban, route: '/proyectos' },
    { id: 'sedepos', label: 'SEDEPOS', icon: FileText, route: '/sedepos' },
    { id: 'usuarios', label: 'Usuarios', icon: User, route: '/usuarios' },
    { id: 'reportes', label: 'Reportes', icon: BarChart3, route: '/reportes' },
    { id: 'config', label: 'Configuración', icon: Settings, route: '/configuracion' },
  ];

  // Quick actions con sus rutas
  const quickActions = [
    { 
      id: 'create-ninio', 
      label: 'Agregar Niño', 
      description: 'Registrar nuevo residente',
      icon: PlusCircle,
      route: '/ninios/create',
      color: 'var(--primary-blue)'
    },
    { 
      id: 'create-proyecto', 
      label: 'Nuevo Proyecto', 
      description: 'Crear proyecto activo',
      icon: FolderKanban,
      route: '/proyectos/create',
      color: 'var(--accent-orange)'
    },
    { 
      id: 'create-sedepos', 
      label: 'Reporte SEDEPOS', 
      description: 'Generar reporte oficial',
      icon: FileText,
      route: '/sedepos/create',
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

  // Set active menu based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => currentPath.startsWith(item.route));
    if (activeItem) {
      setActiveMenu(activeItem.id);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (route) => {
    navigate(route);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)'
    }}>
      {/* Sidebar */}
      <div 
        style={{
          width: sidebarOpen ? '280px' : '0',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50
        }}
      >
        {/* Logo */}
        <div style={{ 
          padding: 'var(--spacing-xl)',
          borderBottom: '1px solid var(--border-color)',
          display: sidebarOpen ? 'flex' : 'none',
          alignItems: 'center',
          gap: 'var(--spacing-md)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Home style={{ color: 'white', width: '24px', height: '24px' }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              Hogar de Niños
            </h3>
            <p style={{ 
              margin: '2px 0 0 0', 
              fontSize: '0.75rem', 
              color: 'var(--text-tertiary)' 
            }}>
              Sistema v1.0.0
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <nav style={{ 
          padding: 'var(--spacing-lg)',
          display: sidebarOpen ? 'block' : 'none' 
        }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.route)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--primary-blue-10)' : 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  cursor: 'pointer',
                  marginBottom: 'var(--spacing-xs)',
                  color: isActive ? 'var(--primary-blue)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <Icon style={{ width: '20px', height: '20px' }} />
                <span style={{ 
                  fontSize: '0.875rem',
                  fontWeight: isActive ? '600' : '400',
                  flex: 1,
                  textAlign: 'left'
                }}>
                  {item.label}
                </span>
                <ChevronRight style={{ 
                  width: '16px', 
                  height: '16px',
                  opacity: isActive ? 1 : 0.5
                }} />
              </button>
            );
          })}

          {/* Logout Button */}
          <div style={{ marginTop: 'var(--spacing-xl)' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                cursor: 'pointer',
                color: 'var(--error)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--error-10)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <LogOut style={{ width: '20px', height: '20px' }} />
              <span style={{ fontSize: '0.875rem', flex: 1, textAlign: 'left' }}>
                Cerrar Sesión
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1,
        marginLeft: sidebarOpen ? '280px' : '0',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top Bar */}
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid var(--border-color)',
          padding: 'var(--spacing-lg) var(--spacing-xl)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 'var(--spacing-xs)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {sidebarOpen ? (
                <X style={{ width: '24px', height: '24px', color: 'var(--text-secondary)' }} />
              ) : (
                <Menu style={{ width: '24px', height: '24px', color: 'var(--text-secondary)' }} />
              )}
            </button>

            {/* Search Bar */}
            <div style={{
              position: 'relative',
              width: '300px'
            }}>
              <Search style={{
                position: 'absolute',
                left: 'var(--spacing-md)',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: 'var(--text-tertiary)'
              }} />
              <input
                type="text"
                placeholder="Buscar en el sistema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 40px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-blue)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                }}
              />
            </div>
          </div>

          {/* User Info & Notifications */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
            <button style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: 'var(--spacing-xs)'
            }}>
              <Bell style={{ width: '24px', height: '24px', color: 'var(--text-secondary)' }} />
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--error)'
              }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-blue-10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-blue)'
              }}>
                <User style={{ width: '24px', height: '24px' }} />
              </div>
              <div>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  {user?.firstName || user?.username || 'Usuario'}
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.75rem', 
                  color: 'var(--text-tertiary)'
                }}>
                  Administrador
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main style={{ padding: 'var(--spacing-xl)' }}>
          {/* Welcome Section */}
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
              Bienvenido, {user?.firstName || 'Usuario'}! 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Aquí está un resumen de las actividades del hogar
            </p>
          </div>

          {/* Quick Actions */}
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
              Acciones Rápidas
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-xl)'
            }}>
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleNavigation(action.route)}
                    className="card animate-fade-in"
                    style={{
                      padding: 'var(--spacing-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-lg)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: `${action.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: action.color
                    }}>
                      <Icon style={{ width: '28px', height: '28px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        margin: 0, 
                        fontSize: '1rem',
                        color: 'var(--text-primary)'
                      }}>
                        {action.label}
                      </h4>
                      <p style={{ 
                        margin: '4px 0 0 0', 
                        fontSize: '0.875rem', 
                        color: 'var(--text-secondary)' 
                      }}>
                        {action.description}
                      </p>
                    </div>
                    <ChevronRight style={{ 
                      width: '20px', 
                      height: '20px',
                      color: 'var(--text-tertiary)' 
                    }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
              Estadísticas
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--spacing-lg)',
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="card animate-fade-in"
                  style={{
                    padding: 'var(--spacing-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-lg)',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '12px',
                      backgroundColor: `${stat.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.875rem', 
                      color: 'var(--text-secondary)' 
                    }}>
                      {stat.title}
                    </p>
                    <h2 style={{ 
                      margin: '4px 0 0 0', 
                      color: stat.color,
                      fontSize: '1.75rem'
                    }}>
                      {stat.value}
                    </h2>
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      fontSize: '0.75rem', 
                      color: 'var(--text-tertiary)' 
                    }}>
                      {stat.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card animate-fade-in">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--spacing-lg)' 
            }}>
              <h3 style={{ margin: 0 }}>
                Actividad Reciente
              </h3>
              <button 
                onClick={() => handleNavigation('/actividad')}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--primary-blue)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  borderRadius: 'var(--radius-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Ver todo
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      flexShrink: 0,
                    }}
                  >
                    {activity.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, color: 'var(--text-primary)' }}>
                      {activity.text}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;