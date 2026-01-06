/**
 * ProyectosListPage - Sistema del Hogar de Niños
 * Página de gestión de proyectos
 */
// src/modules/proyectos/presentation/proyectosListPage.jsx
import React, { useState } from 'react';
import { Search, Plus, FolderKanban, Calendar, Users } from 'lucide-react';

const ProyectosListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proyectos] = useState([
    {
      id: 1,
      nombre: 'Programa de Educación',
      descripcion: 'Programa de apoyo educativo para residentes',
      fechaInicio: '2026-01-01',
      fechaFin: '2026-12-31',
      estado: 'En Progreso',
      responsable: 'María García',
      participantes: 15,
      progreso: 35,
    },
    {
      id: 2,
      nombre: 'Actividades Recreativas',
      descripcion: 'Talleres y actividades deportivas',
      fechaInicio: '2026-01-15',
      fechaFin: '2026-06-30',
      estado: 'En Progreso',
      responsable: 'Juan Pérez',
      participantes: 20,
      progreso: 20,
    },
  ]);

  const filteredProyectos = proyectos.filter(proyecto =>
    proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proyecto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-800">
            Proyectos
          </h1>
          <p className="text-gray-600 mt-1">
            Gestión de programas y actividades del centro
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          Nuevo Proyecto
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar proyectos por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Proyectos</p>
              <p className="text-3xl text-gray-800 mt-1">{proyectos.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FolderKanban className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">En Progreso</p>
              <p className="text-3xl text-gray-800 mt-1">
                {proyectos.filter(p => p.estado === 'En Progreso').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FolderKanban className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Participantes</p>
              <p className="text-3xl text-gray-800 mt-1">
                {proyectos.reduce((sum, p) => sum + p.participantes, 0)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Proyectos List */}
      <div className="space-y-4">
        {filteredProyectos.map((proyecto) => (
          <div key={proyecto.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FolderKanban className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-800 mb-1">
                    {proyecto.nombre}
                  </h3>
                  <p className="text-gray-600">
                    {proyecto.descripcion}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {proyecto.estado}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progreso</span>
                <span className="text-sm text-gray-800">{proyecto.progreso}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${proyecto.progreso}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Inicio: {new Date(proyecto.fechaInicio).toLocaleDateString('es-ES')}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Fin: {new Date(proyecto.fechaFin).toLocaleDateString('es-ES')}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {proyecto.participantes} participantes
              </div>
              <div className="text-sm text-gray-600">
                Responsable: {proyecto.responsable}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm">
                Ver Detalles
              </button>
              <button className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-sm">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProyectos.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No se encontraron proyectos</p>
        </div>
      )}
    </div>
  );
};

export default ProyectosListPage;