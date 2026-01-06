// src/modules/ninios/presentation/components/NinioTable.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye, MoreVertical } from 'lucide-react';

export const NinioTable = ({ ninios = [], onDelete, loading }) => {
  const navigate = useNavigate();

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'en_transicion': 
      case 'en transicion': 
        return 'bg-yellow-100 text-yellow-800';
      case 'egresado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo': return 'Activo';
      case 'en_transicion': 
      case 'en transicion': 
        return 'En Transición';
      case 'egresado': return 'Egresado';
      default: return estado || 'No especificado';
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 'N/A';
    try {
      const birthDate = new Date(fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return `${age} años`;
    } catch {
      return 'N/A';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('es-ES');
    } catch {
      return dateString;
    }
  };

  const getInitials = (nombre = '', apellido = '') => {
    return (nombre.charAt(0) + (apellido?.charAt(0) || '')).toUpperCase();
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de eliminar este niño? Esta acción no se puede deshacer.')) {
      await onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!ninios || ninios.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">📋</div>
        <p className="text-gray-500">No hay niños registrados</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CI
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sexo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Ingreso
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ninios.map((ninio) => (
            <tr 
              key={ninio.id}
              onClick={() => navigate(`/ninios/${ninio.id}`)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {getInitials(ninio.nombre, ninio.apellido_paterno)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {ninio.nombre} {ninio.apellido_paterno} {ninio.apellido_materno}
                    </div>
                    <div className="text-sm text-gray-500">
                      {ninio.nacionalidad || 'No especificada'}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-mono">{ninio.ci || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {calcularEdad(ninio.fecha_nacimiento)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 capitalize">{ninio.sexo || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(ninio.estado)}`}>
                  {getEstadoText(ninio.estado)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(ninio.fecha_ingreso)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => navigate(`/ninios/${ninio.id}`)}
                    className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/ninios/edit/${ninio.id}`)}
                    className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(ninio.id, e)}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};