// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// NO importar localStorageService - usar localStorage directamente
// import localStorageService from '../services/storage/localStorage.service.js';

// Constantes locales
const STORAGE_KEYS = {
  THEME_PREFERENCE: 'theme_preference'
};

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Estado para el tema actual - usar localStorage DIRECTAMENTE
  const [theme, setTheme] = useState(() => {
    // Usar localStorage directamente
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME_PREFERENCE);
    
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }
    
    // Detectar preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    
    return THEMES.LIGHT;
  });

  // Aplicar tema cuando cambie
  useEffect(() => {
    // Guardar en localStorage directamente
    localStorage.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);

    // Aplicar clase al body
    const body = document.body;
    body.classList.remove(THEMES.LIGHT, THEMES.DARK);
    
    if (theme === THEMES.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? THEMES.DARK 
        : THEMES.LIGHT;
      body.classList.add(systemTheme);
    } else {
      body.classList.add(theme);
    }

  }, [theme]);

  // Función para cambiar tema
  const toggleTheme = (newTheme = null) => {
    if (newTheme && Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
    } else {
      // Ciclar entre temas
      const themeValues = Object.values(THEMES);
      const currentIndex = themeValues.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themeValues.length;
      setTheme(themeValues[nextIndex]);
    }
  };

  const value = {
    theme,
    themes: THEMES,
    isDark: theme === THEMES.DARK || (theme === THEMES.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches),
    isLight: theme === THEMES.LIGHT || (theme === THEMES.SYSTEM && window.matchMedia('(prefers-color-scheme: light)').matches),
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};