// src/modules/proyectos/presentation/ProyectosPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, ChevronRight, FileText, Users, Calendar, Target, Edit } from 'lucide-react';
import './ProyectosPage.css';

export const ProyectosPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  // Datos de ejemplo para proyectos
  const proyectos = [
    {
      id: 1,
      nombre: 'Educación Integral',
      descripcion: 'Programa educativo para niños en edad escolar',
      estado: 'activo',
      fechaInicio: '2024-01-15',
      fechaFin: '2024-12-20',
      responsables: ['Ana López', 'Carlos Ruiz'],
      niniosAsociados: 25,
      presupuesto: '$15,000',
      progreso: 75
    },
    {
      id: 2,
      nombre: 'Salud y Bienestar',
      descripcion: 'Atención médica y psicológica',
      estado: 'activo',
      fechaInicio: '2024-02-01',
      fechaFin: '2024-11-30',
      responsables: ['Dr. Martínez'],
      niniosAsociados: 18,
      presupuesto: '$12,000',
      progreso: 60
    },
    {
      id: 3,
      nombre: 'Formación Vocacional',
      descripcion: 'Talleres de habilidades para adolescentes',
      estado: 'en-pausa',
      fechaInicio: '2024-03-10',
      fechaFin: '2024-10-15',
      responsables: ['María González'],
      niniosAsociados: 12,
      presupuesto: '$8,000',
      progreso: 30
    },
    {
      id: 4,
      nombre: 'Integración Familiar',
      descripcion: 'Programa de reunificación familiar',
      estado: 'completado',
      fechaInicio: '2023-09-01',
      fechaFin: '2024-01-31',
      responsables: ['Laura Torres'],
      niniosAsociados: 8,
      presupuesto: '$6,500',
      progreso: 100
    },
  ];

  const stats = [
    {
      title: 'Proyectos Activos',
      value: '3',
      icon: Target,
      color: 'var(--success)',
      change: '+1 este mes'
    },
    {
      title: 'Niños Beneficiados',
      value: '55',
      icon: Users,
      color: 'var(--primary-blue)',
      change: '+8 este mes'
    },
    {
      title: 'Presupuesto Total',
      value: '$35,500',
      icon: FileText,
      color: 'var(--accent-orange)',
      change: '$2,500 asignados'
    },
    {
      title: 'Próximos Vencimientos',
      value: '2',
      icon: Calendar,
      color: 'var(--warning)',
      change: 'en 30 días'
    }
  ];

  const handleCreateProyecto = () => {
    navigate('/proyectos/crear');
  };

  const handleEditProyecto = (id) => {
    navigate(`/proyectos/editar/${id}`);
  };

  const handleViewDetail = (id) => {
    navigate(`/proyectos/${id}`);
  };

  const filteredProyectos = proyectos.filter(proyecto => {
    const matchesSearch = proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proyecto.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || proyecto.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="proyectos-page">
      {/* Header con título y botón crear */}
      <div className="proyectos-header">
        <div>
          <h1 className="proyectos-title">Proyectos del Centro</h1>
          <p className="proyectos-subtitle">
            Gestiona los proyectos y actividades del hogar
          </p>
        </div>
        <button 
          onClick={handleCreateProyecto}
          className="btn-primary"
        >
          <Plus size={20} />
          Nuevo Proyecto
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="proyectos-stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div 
                className="stat-icon"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <small style={{ color: stat.color }}>{stat.change}</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtros y búsqueda */}
      <div className="proyectos-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${statusFilter === 'todos' ? 'active' : ''}`}
            onClick={() => setStatusFilter('todos')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'activo' ? 'active' : ''}`}
            onClick={() => setStatusFilter('activo')}
          >
            Activos
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'en-pausa' ? 'active' : ''}`}
            onClick={() => setStatusFilter('en-pausa')}
          >
            En Pausa
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'completado' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completado')}
          >
            Completados
          </button>
        </div>
      </div>

      {/* Lista de proyectos */}
      <div className="proyectos-content">
        <div className="proyectos-list-header">
          <h3>Proyectos ({filteredProyectos.length})</h3>
        </div>
        
        {filteredProyectos.length > 0 ? (
          <div className="proyectos-grid">
            {filteredProyectos.map(proyecto => (
              <div 
                key={proyecto.id} 
                className="proyecto-card card"
              >
                <div className="proyecto-card-header">
                  <div>
                    <h4>{proyecto.nombre}</h4>
                    <p>{proyecto.descripcion}</p>
                  </div>
                  <span className={`status-badge status-${proyecto.estado}`}>
                    {proyecto.estado}
                  </span>
                </div>
                
                <div className="proyecto-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>Inicio: {proyecto.fechaInicio}</span>
                  </div>
                  <div className="meta-item">
                    <Users size={16} />
                    <span>{proyecto.niniosAsociados} niños</span>
                  </div>
                  <div className="meta-item">
                    <FileText size={16} />
                    <span>{proyecto.presupuesto}</span>
                  </div>
                </div>
                
                <div className="proyecto-progress">
                  <div className="progress-info">
                    <span>Progreso</span>
                    <span>{proyecto.progreso}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${proyecto.progreso}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="proyecto-footer">
                  <div className="responsables">
                    {proyecto.responsables.map((resp, idx) => (
                      <span key={idx} className="responsable-tag">{resp}</span>
                    ))}
                  </div>
                  <div className="proyecto-actions">
                    <button 
                      onClick={() => handleViewDetail(proyecto.id)}
                      className="btn-view"
                      title="Ver detalle"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button 
                      onClick={() => handleEditProyecto(proyecto.id)}
                      className="btn-edit"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state card">
            <p>No se encontraron proyectos con los filtros actuales</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('todos');
              }}
              className="btn-secondary"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProyectosPage;