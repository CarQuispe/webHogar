/**
 * main.jsx - Sistema del Hogar de Niños
 * Punto de entrada de la aplicación
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/global.css';
import './assets/styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
