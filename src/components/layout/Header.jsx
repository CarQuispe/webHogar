/**
 * Header Component - Sistema del Hogar de Niños
 * Barra superior de navegación
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../assets/styles/global.css';
import '../../assets/styles/theme.css';

export const Header = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--spacing-lg)',
        boxShadow: 'var(--shadow-sm)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        {/* Menu Toggle Button (Mobile) */}
        <button
          onClick={onToggleSidebar}
          className="btn-ghost"
          style={{
            padding: 'var(--spacing-sm)',
            display: 'none',
          }}
          id="menu-toggle-btn"
        >
          <span style={{ fontSize: '1.5rem' }}>☰</span>
        </button>

        {/* Page Title */}
        <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
          Sistema del Hogar de Niños
        </h2>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn-ghost"
          style={{ padding: 'var(--spacing-sm)' }}
          title={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        >
          <span style={{ fontSize: '1.25rem' }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
        </button>

        {/* Notifications */}
        <button
          className="btn-ghost"
          style={{ padding: 'var(--spacing-sm)', position: 'relative' }}
          title="Notificaciones"
        >
          <span style={{ fontSize: '1.25rem' }}>🔔</span>
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--error)',
              borderRadius: '50%',
            }}
          />
        </button>

        {/* User Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="btn-ghost"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-sm)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-blue)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {user?.initials || 'U'}
            </div>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>
              {user?.fullName || 'Usuario'}
            </span>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 99,
                }}
                onClick={() => setShowUserMenu(false)}
              />
              <div
                className="dropdown-menu"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  zIndex: 100,
                }}
              >
                <div
                  className="dropdown-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                  }}
                >
                  <span>👤</span>
                  <span>Mi Perfil</span>
                </div>
                <div
                  className="dropdown-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                  }}
                >
                  <span>⚙️</span>
                  <span>Configuración</span>
                </div>
                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'var(--border-color)',
                    margin: 'var(--spacing-sm) 0',
                  }}
                />
                <div
                  className="dropdown-item"
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    color: 'var(--error)',
                  }}
                >
                  <span>🚪</span>
                  <span>Cerrar Sesión</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #menu-toggle-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
