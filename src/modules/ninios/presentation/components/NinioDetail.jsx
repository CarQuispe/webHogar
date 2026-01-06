// src/modules/ninios/presentation/components/NinioDetail.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Calendar, MapPin, Tag, Flag, FileText, 
  Home, Clock, Edit, ArrowLeft, Download,
  Mail, Phone, Heart, GraduationCap
} from 'lucide-react';

export const NinioDetail = ({ ninio, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activo': return 'bg-green-100 text-green-800 border-green-200';
      case 'en_transicion': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'egresado': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return '';
    const birthDate = new Date(fechaNacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const tiempoEnHogar = () => {
    if (!ninio.fecha_ingreso) return '';
    const ingreso = new Date(ninio.fecha_ingreso);
    const hoy = new Date();
    const diffMs = hoy - ingreso;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} días`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`;
    return `${Math.floor(diffDays / 365)} años`;
  };

  const tabs = [
    { id: 'info', label: 'Información General', icon: User },
    { id: 'historial', label: 'Historial', icon: Clock },
    { id: 'salud', label: 'Salud', icon: Heart },
    { id: 'educacion', label: 'Educación', icon: GraduationCap },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/ninios')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
            <button
              onClick={() => {/* Implementar export */}}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>

        {/* Perfil */}
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
            <User className="w-12 h-12 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {ninio.nombre} {ninio.apellido_paterno} {ninio.apellido_materno}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">CI: {ninio.ci}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(ninio.estado)}`}>
                    {ninio.estado}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Edad</p>
                  <p className="font-medium text-gray-800">
                    {calcularEdad(ninio.fecha_nacimiento)} años
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Flag className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nacionalidad</p>
                  <p className="font-medium text-gray-800">{ninio.nacionalidad}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Tag className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Etnia</p>
                  <p className="font-medium text-gray-800">{ninio.etnia || 'No especificada'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tiempo en Hogar</p>
                  <p className="font-medium text-gray-800">{tiempoEnHogar()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenido de Tabs */}
      <div className="p-6">
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Información Personal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Nombre Completo</p>
                  <p className="text-gray-800">{ninio.nombre} {ninio.apellido_paterno} {ninio.apellido_materno}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                  <p className="text-gray-800">
                    {new Date(ninio.fecha_nacimiento).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sexo</p>
                  <p className="text-gray-800 capitalize">{ninio.sexo}</p>
                </div>
              </div>
            </div>

            {/* Información del Hogar */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Información del Hogar</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Fecha de Ingreso</p>
                  <p className="text-gray-800">
                    {new Date(ninio.fecha_ingreso).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estado Actual</p>
                  <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${getEstadoColor(ninio.estado)}`}>
                    {ninio.estado}
                  </span>
                </div>
                {ninio.fecha_egreso && (
                  <div>
                    <p className="text-sm text-gray-500">Fecha de Egreso</p>
                    <p className="text-gray-800">
                      {new Date(ninio.fecha_egreso).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}
                {ninio.motivo_egreso && (
                  <div>
                    <p className="text-sm text-gray-500">Motivo de Egreso</p>
                    <p className="text-gray-800">{ninio.motivo_egreso}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Observaciones */}
            {ninio.observaciones_ingreso && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Observaciones</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{ninio.observaciones_ingreso}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'historial' && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Historial en desarrollo</p>
          </div>
        )}

        {activeTab === 'salud' && (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Información de salud en desarrollo</p>
          </div>
        )}

        {activeTab === 'educacion' && (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Información educativa en desarrollo</p>
          </div>
        )}
      </div>
    </div>
  );
};