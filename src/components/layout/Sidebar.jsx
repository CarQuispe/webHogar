/**
 * Sidebar Component - Sistema del Hogar de Niños
 * Barra lateral de navegación con React Router
 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../assets/styles/global.css';
import '../../assets/styles/theme.css';

export const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'ninios', label: 'Residentes', icon: '👶', path: '/ninios' },
    { id: 'usuarios', label: 'Usuarios', icon: '👥', path: '/usuarios' },
    { id: 'proyectos', label: 'Proyectos', icon: '📋', path: '/proyectos' },
    { id: 'sedepos', label: 'SEDEPOS', icon: '📄', path: '/sedepos' },
  ];

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
            display: 'none',
          }}
          className="mobile-overlay"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className="sidebar"
        style={{
          width: '280px',
          flexShrink: 0,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 999,
        }}
      >
        {/* Header */}
        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, var(--primary-blue), var(--secondary-green))',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
              }}
            >
              🏠
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>
                Hogar de Niños
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                Sistema de Gestión
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: 'var(--spacing-md)', flex: 1, overflowY: 'auto' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) {
                  onToggle();
                }
              }}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              style={{
                width: '100%',
                border: 'none',
                background: 'none',
                fontSize: '0.9375rem',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: 'var(--spacing-lg)',
            borderTop: '1px solid var(--border-color)',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 0 }}>© 2026 Hogar de Niños</p>
          <p style={{ margin: '4px 0 0 0' }}>Versión 1.0.0</p>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .mobile-overlay {
            display: block !important;
          }
          
          .sidebar {
            width: 280px !important;
          }
        }
        
        @media (min-width: 769px) {
          .sidebar {
            transform: translateX(0) !important;
            position: relative !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;