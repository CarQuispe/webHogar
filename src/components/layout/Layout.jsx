/**
 * Layout Component
 * Layout principal con sidebar y header
 */

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header onToggleSidebar={toggleSidebar} />

        <main
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: 'var(--bg-secondary)',
            padding: '1.5rem',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;