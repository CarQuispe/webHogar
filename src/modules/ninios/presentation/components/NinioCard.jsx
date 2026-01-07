// src/modules/ninios/presentation/components/NinioCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, Tag, ArrowRight, IdCard, Heart } from 'lucide-react';
import{Card } from '@components/ui/Card/Card';
import{Button }from '@components/ui/Button/Button';

export const NinioCard = ({ ninio }) => {
  const navigate = useNavigate();
  
  // Obtener color del estado según sistema de diseño
  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo': 
        return { 
          bg: 'bg-success/10', 
          text: 'text-success', 
          border: 'border-success/20',
          icon: '💚'
        };
      case 'en_transicion':
      case 'en transicion':
        return { 
          bg: 'bg-warning/10', 
          text: 'text-warning', 
          border: 'border-warning/20',
          icon: '🔄'
        };
      case 'egresado':
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-700', 
          border: 'border-gray-200',
          icon: '👋'
        };
      case 'inactivo':
        return { 
          bg: 'bg-error/10', 
          text: 'text-error', 
          border: 'border-error/20',
          icon: '⏸️'
        };
      default:
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-700', 
          border: 'border-gray-200',
          icon: '❓'
        };
    }
  };

  // Calcular edad
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

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Obtener iniciales para avatar
  const getInitials = () => {
    const first = ninio.nombre ? ninio.nombre.charAt(0).toUpperCase() : '?';
    const last = ninio.apellido_paterno ? ninio.apellido_paterno.charAt(0).toUpperCase() : '?';
    return `${first}${last}`;
  };

  // Obtener color del avatar basado en ID o nombre
  const getAvatarColor = () => {
    const colors = [
      'from-primary-blue to-primary-blue-dark',
      'from-secondary-green to-secondary-green-dark',
      'from-accent-orange to-accent-orange-dark',
      'from-purple-500 to-indigo-500',
      'from-pink-500 to-rose-500'
    ];
    const hash = ninio.id?.toString()?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  };

  const estadoConfig = getEstadoColor(ninio.estado);
  const edad = calcularEdad(ninio.fecha_nacimiento);
  const avatarColor = getAvatarColor();

  return (
    <Card
      className="group cursor-pointer hover-lift transition-all duration-300 overflow-hidden"
      padding="none"
      hoverable={true}
      onClick={() => navigate(`/ninios/${ninio.id}`)}
    >
      {/* Header con avatar y estado */}
      <div className="relative">
        {/* Gradiente de fondo */}
        <div className={`absolute inset-0 bg-gradient-to-r ${avatarColor} opacity-5`}></div>
        
        <div className="relative p-6">
          <div className="flex items-start justify-between">
            {/* Avatar y Nombre */}
            <div className="flex items-center gap-4">
              <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${avatarColor} shadow-lg flex items-center justify-center text-white`}>
                <span className="text-xl font-bold">{getInitials()}</span>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-white flex items-center justify-center">
                  <Heart className="w-3 h-3 text-primary-blue" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-blue transition-colors">
                  {ninio.nombre} {ninio.apellido_paterno}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <IdCard className="w-3 h-3" />
                  {ninio.ci || 'Sin CI'}
                </p>
              </div>
            </div>
            
            {/* Badge de Estado */}
            <div className={`px-3 py-1.5 rounded-full text-xs font-medium border ${estadoConfig.border} ${estadoConfig.bg}`}>
              <span className={`flex items-center gap-1 ${estadoConfig.text}`}>
                <span className="text-xs">{estadoConfig.icon}</span>
                <span className="capitalize">{ninio.estado || 'Desconocido'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles Informativos */}
      <div className="px-6 pb-6">
        {/* Grid de información */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Edad */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-primary-blue/10 rounded">
                <User className="w-3 h-3 text-primary-blue" />
              </div>
              <span className="text-xs font-medium text-gray-500">Edad</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {edad ? `${edad} años` : 'N/A'}
            </p>
          </div>
          
          {/* Sexo */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-secondary-green/10 rounded">
                <User className="w-3 h-3 text-secondary-green" />
              </div>
              <span className="text-xs font-medium text-gray-500">Sexo</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 capitalize">
              {ninio.sexo || 'No especificado'}
            </p>
          </div>
          
          {/* Nacionalidad */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-accent-orange/10 rounded">
                <MapPin className="w-3 h-3 text-accent-orange" />
              </div>
              <span className="text-xs font-medium text-gray-500">Nacionalidad</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {ninio.nacionalidad || 'No especificada'}
            </p>
          </div>
          
          {/* Etnia */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-purple-500/10 rounded">
                <Tag className="w-3 h-3 text-purple-500" />
              </div>
              <span className="text-xs font-medium text-gray-500">Etnia</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {ninio.etnia || 'No especificada'}
            </p>
          </div>
        </div>

        {/* Fecha de ingreso */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Fecha de Ingreso</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(ninio.fecha_ingreso)}
                </p>
              </div>
            </div>
            
            {ninio.fecha_egreso && (
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Fecha de Egreso</p>
                <p className="text-sm font-medium text-gray-700">
                  {formatDate(ninio.fecha_egreso)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con acciones */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            ID: <span className="font-mono font-medium">{ninio.id}</span>
          </div>
          <Button
            variant="ghost"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ninios/${ninio.id}`);
            }}
            icon={<ArrowRight className="w-3 h-3" />}
            className="group-hover:bg-primary-blue/10 group-hover:text-primary-blue"
          >
            Ver detalles
          </Button>
        </div>
      </div>
    </Card>
  );
};