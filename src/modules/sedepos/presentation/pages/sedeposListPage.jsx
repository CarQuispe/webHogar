/**
 * SedeposListPage - Sistema del Hogar de Niños
 * Página de gestión de reportes SEDEPOS
 */
// src/modules/sedepos/presentation/pages/sedeposListPage.jsx
import React, { useState } from 'react';
import { Search, Plus, FileText, Download, Calendar } from 'lucide-react';

const SedeposListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportes] = useState([
    {
      id: 1,
      tipo: 'Reporte Mensual',
      periodo: 'Diciembre 2025',
      fecha: '2026-01-02',
      estado: 'Completado',
      responsable: 'María García',
    },
    {
      id: 2,
      tipo: 'Reporte Trimestral',
      periodo: 'Q4 2025',
      fecha: '2026-01-05',
      estado: 'En Proceso',
      responsable: 'Juan Pérez',
    },
  ]);

  const filteredReportes = reportes.filter(reporte =>
    reporte.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reporte.periodo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-800">
            SEDEPOS
          </h1>
          <p className="text-gray-600 mt-1">
            Sistema de reportes gubernamentales
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          Nuevo Reporte
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar reportes por tipo o periodo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Reportes</p>
              <p className="text-3xl text-gray-800 mt-1">{reportes.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completados</p>
              <p className="text-3xl text-gray-800 mt-1">
                {reportes.filter(r => r.estado === 'Completado').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">En Proceso</p>
              <p className="text-3xl text-gray-800 mt-1">
                {reportes.filter(r => r.estado === 'En Proceso').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Reportes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReportes.map((reporte) => (
          <div key={reporte.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${
                reporte.estado === 'Completado'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {reporte.estado}
              </span>
            </div>
            
            <h3 className="text-lg text-gray-800 mb-2">
              {reporte.tipo}
            </h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {reporte.periodo}
              </div>
              <div className="text-sm text-gray-600">
                Creado: {new Date(reporte.fecha).toLocaleDateString('es-ES')}
              </div>
              <div className="text-sm text-gray-600">
                Por: {reporte.responsable}
              </div>
            </div>
            
            <div className="flex gap-2 pt-4 border-t">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm">
                Ver Detalles
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-sm">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredReportes.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No se encontraron reportes</p>
        </div>
      )}
    </div>
  );
};

export default SedeposListPage;