// src/modules/ninios/presentation/pages/NiniosListPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetNiniosService } from '../../application/get-ninios.service.js';
import { ApiNiniosRepository } from '../../infrastructure/api.ninios.repository.js';
import { NinioTable } from '../components/NinioTable.jsx';
import "./NiniosListPage.css";

export const NiniosListPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [ninios, setNinios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    estado: '',
    sexo: '',
    nacionalidad: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    enTransicion: 0,
    egresados: 0
  });

  const loadNinios = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const repository = new ApiNiniosRepository();
      const getNiniosService = new GetNiniosService(repository);
      
      // Aplicar búsqueda si existe
      const filtersToSend = { ...filters };
      if (searchTerm) {
        filtersToSend.search = searchTerm;
      }
      
      const result = await getNiniosService.execute(filtersToSend);
      setNinios(result);
      
      // Calcular estadísticas
      const total = result.length;
      const activos = result.filter(n => n.estado === 'activo').length;
      const enTransicion = result.filter(n => n.estado === 'en_transicion' || n.estado === 'en transicion').length;
      const egresados = result.filter(n => n.estado === 'egresado').length;
      
      setStats({ total, activos, enTransicion, egresados });
      
    } catch (err) {
      console.error('Error cargando niños:', err);
      setError('No se pudo cargar la lista de niños. Intenta nuevamente.');
      setNinios([]);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    loadNinios();
  }, [loadNinios]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      estado: '',
      sexo: '',
      nacionalidad: ''
    });
    setSearchTerm('');
  };

  const handleCreateNinio = () => {
    navigate('/ninios/crear');
  };

  return (
    <div className="ninios-list-page">
      {/* Header Principal */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión de Residentes</h1>
          <p className="page-subtitle">
            Administra los niños y adolescentes del hogar
          </p>
        </div>
        
        <div className="page-actions">
          <button className="btn-primary" onClick={handleCreateNinio}>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Nuevo Residente
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Total Residentes</span>
            <span className="stat-value stat-total">{stats.total}</span>
          </div>
          <div className="stat-icon stat-icon-total">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Activos</span>
            <span className="stat-value stat-active">{stats.activos}</span>
          </div>
          <div className="stat-icon stat-icon-active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">En Transición</span>
            <span className="stat-value stat-transition">{stats.enTransicion}</span>
          </div>
          <div className="stat-icon stat-icon-transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Egresados</span>
            <span className="stat-value stat-egresado">{stats.egresados}</span>
          </div>
          <div className="stat-icon stat-icon-egresado">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Panel de Filtros y Búsqueda */}
      <div className="filters-container card">
        <div className="filters-header">
          <h3 className="filters-title">Búsqueda y Filtros</h3>
          <p className="filters-subtitle">Encuentra residentes específicos</p>
        </div>
        
        <div className="filters-content">
          {/* Barra de Búsqueda */}
          <div className="search-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o CI..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Filtros en Grid */}
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">
                <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Estado
              </label>
              <select
                value={filters.estado}
                onChange={(e) => handleFilterChange('estado', e.target.value)}
                className="filter-select"
              >
                <option value="">Todos los estados</option>
                <option value="activo">Activo</option>
                <option value="en_transicion">En Transición</option>
                <option value="egresado">Egresado</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Sexo
              </label>
              <select
                value={filters.sexo}
                onChange={(e) => handleFilterChange('sexo', e.target.value)}
                className="filter-select"
              >
                <option value="">Todos</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Nacionalidad
              </label>
              <input
                type="text"
                placeholder="Ej: Boliviana"
                value={filters.nacionalidad}
                onChange={(e) => handleFilterChange('nacionalidad', e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          {/* Acciones de Filtros */}
          <div className="filters-actions">
            <div className="filters-info">
              {ninios.length === 0 ? 'No hay resultados' : `Mostrando ${ninios.length} residente${ninios.length !== 1 ? 's' : ''}`}
            </div>
            <div className="filters-buttons">
              {(filters.estado || filters.sexo || filters.nacionalidad || searchTerm) && (
                <button className="btn-secondary" onClick={clearFilters}>
                  Limpiar filtros
                </button>
              )}
              <button className="btn-secondary" onClick={loadNinios}>
                <svg className="refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal - Tabla */}
      {error ? (
        <div className="error-alert card">
          <div className="error-content">
            <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="error-title">Error al cargar los datos</h3>
              <p className="error-message">{error}</p>
            </div>
          </div>
          <div className="error-actions">
            <button className="btn-secondary" onClick={() => window.location.reload()}>
              Recargar página
            </button>
            <button className="btn-primary" onClick={loadNinios}>
              Intentar nuevamente
            </button>
          </div>
        </div>
      ) : ninios.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-content">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="empty-title">No hay residentes registrados</h3>
            <p className="empty-message">
              Comienza registrando el primer residente en el hogar infantil. 
              Todos los datos se almacenarán de forma segura en el sistema.
            </p>
            <button className="btn-primary" onClick={handleCreateNinio}>
              Registrar Primer Residente
            </button>
          </div>
        </div>
      ) : (
        <div className="table-container card">
          <div className="table-header">
            <div>
              <h3 className="table-title">Lista de Residentes</h3>
              <p className="table-subtitle">
                {ninios.length} residente{ninios.length !== 1 ? 's' : ''} en el sistema
              </p>
            </div>
            <div className="table-info">
              <span className="table-timestamp">
                Última actualización: {new Date().toLocaleTimeString('es-ES')}
              </span>
            </div>
          </div>
          
          <div className="table-content">
            <NinioTable 
              ninios={ninios}
              onDelete={loadNinios}
              loading={loading}
            />
          </div>
          
          <div className="table-footer">
            <div className="table-footer-info">
              Mostrando <span className="footer-highlight">{ninios.length}</span> de{' '}
              <span className="footer-highlight">{stats.total}</span> residentes
            </div>
            <div className="table-footer-actions">
              <button className="btn-secondary" onClick={loadNinios}>
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NiniosListPage;