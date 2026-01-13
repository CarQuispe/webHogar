// src/modules/menu/components/Menu.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
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
  BarChart3,
  Shield,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import "../styles/menu.css";



const Menu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Menu items con sus rutas y permisos
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      route: '/dashboard',
      permission: 'VIEW'
    },
    { 
      id: 'ninios', 
      label: 'Residentes', 
      icon: Users, 
      route: '/ninios',
      permission: 'NINIOS_VIEW'
    },
    { 
      id: 'proyectos', 
      label: 'Proyectos', 
      icon: FolderKanban, 
      route: '/proyectos',
      permission: 'PROYECTOS_VIEW'
    },
    { 
      id: 'sedepos', 
      label: 'SEDEPOS', 
      icon: FileText, 
      route: '/sedepos',
      permission: 'SEDEPOS_VIEW'
    },
    { 
      id: 'usuarios', 
      label: 'Usuarios', 
      icon: User, 
      route: '/usuarios',
      permission: 'USUARIOS_VIEW'
    },
    { 
      id: 'reportes', 
      label: 'Reportes', 
      icon: BarChart3, 
      route: '/reportes',
      permission: 'REPORTES_VIEW'
    },
    { 
      id: 'config', 
      label: 'Configuración', 
      icon: Settings, 
      route: '/configuracion',
      permission: 'CONFIG_VIEW'
    },
  ];

  // Set active menu based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => currentPath.startsWith(item.route));
    if (activeItem) {
      setActiveMenu(activeItem.id);
    }
  }, [location.pathname, location.pathname]);

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
    <>
      {/* Sidebar */}
      <div 
        className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Home className="logo-icon-svg" />
          </div>
          {sidebarOpen && (
            <div className="logo-text">
              <h3 className="logo-title">Centro de acogida"</h3>
              <h1 className="logo-title"> <p>"Santa Emilia"</p></h1>
              <p className="logo-subtitle">Sistema v1.0.0</p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.route)}
                className={`menu-item ${isActive ? 'menu-item-active' : ''}`}
              >
                <Icon className="menu-icon" />
                {sidebarOpen && (
                  <>
                    <span className="menu-label">
                      {item.label}
                    </span>
                    <ChevronRight className={`menu-chevron ${isActive ? 'menu-chevron-active' : ''}`} />
                  </>
                )}
              </button>
            );
          })}

          {/* Logout Button */}
          {sidebarOpen && (
            <div className="logout-container">
              <button
                onClick={handleLogout}
                className="logout-button"
              >
                <LogOut className="logout-icon" />
                <span className="logout-label">
                  Cerrar Sesión
                </span>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar-left">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-toggle"
          >
            {sidebarOpen ? (
              <X className="toggle-icon" />
            ) : (
              <MenuIcon className="toggle-icon" />
            )}
          </button>

          {/* Search Bar */}
          {sidebarOpen && (
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar en el sistema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          )}
        </div>

        {/* User Info & Notifications */}
        <div className="topbar-right">
          <button className="notification-button">
            <Bell className="notification-icon" />
            <span className="notification-badge" />
          </button>

          <div className="user-info">
            <div className="user-avatar">
              <User className="user-avatar-icon" />
            </div>
            {sidebarOpen && (
              <div className="user-details">
                <p className="user-name">
                  {user?.firstName || user?.username || 'Usuario'}
                </p>
                <p className="user-role">
                  Administrador
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Overlay para móviles */}
      {sidebarOpen && window.innerWidth < 1024 && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Menu;