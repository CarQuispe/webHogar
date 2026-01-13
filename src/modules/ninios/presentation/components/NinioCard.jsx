import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, Tag, ArrowRight, IdCard, Heart } from 'lucide-react';
import { Card } from '@components/ui/Card/Card';
import { Button } from '@components/ui/Button/Button';
import "./NinioCard.css"

export const NinioCard = ({ ninio }) => {
  const navigate = useNavigate();
  
  // Obtener color del estado
  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo': 
        return { 
          className: 'estado-activo',
          icon: '💚'
        };
      case 'en_transicion':
      case 'en transicion':
        return { 
          className: 'estado-transicion',
          icon: '🔄'
        };
      case 'egresado':
        return { 
          className: 'estado-egresado',
          icon: '👋'
        };
      case 'inactivo':
        return { 
          className: 'estado-inactivo',
          icon: '⏸️'
        };
      default:
        return { 
          className: 'estado-default',
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

  // Obtener iniciales
  const getInitials = () => {
    const first = ninio.nombre ? ninio.nombre.charAt(0).toUpperCase() : '?';
    const last = ninio.apellido_paterno ? ninio.apellido_paterno.charAt(0).toUpperCase() : '?';
    return `${first}${last}`;
  };

  // Obtener color del avatar
  const getAvatarColor = () => {
    const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
    const hash = ninio.id?.toString()?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  };

  const estadoConfig = getEstadoColor(ninio.estado);
  const edad = calcularEdad(ninio.fecha_nacimiento);
  const avatarColor = getAvatarColor();

  return (
    <Card
      className={`ninio-card ${avatarColor}`}
      padding="none"
      hoverable={true}
      onClick={() => navigate(`/ninios/${ninio.id}`)}
    >
      {/* Header */}
      <div className="ninio-card-header">
        <div className="ninio-card-bg-gradient"></div>
        
        <div className="ninio-card-header-content">
          <div className="ninio-card-avatar-section">
            {/* Avatar */}
            <div className={`ninio-card-avatar ${avatarColor}`}>
              <span className="avatar-initials">{getInitials()}</span>
              <div className="avatar-badge">
                <Heart className="heart-icon" />
              </div>
            </div>
            
            {/* Nombre */}
            <div className="ninio-card-name">
              <h3 className="ninio-card-name-title">
                {ninio.nombre} {ninio.apellido_paterno}
              </h3>
              <p className="ninio-card-ci">
                <IdCard className="ci-icon" />
                {ninio.ci || 'Sin CI'}
              </p>
            </div>
          </div>
          
          {/* Badge de Estado */}
          <div className={`estado-badge ${estadoConfig.className}`}>
            <span className="estado-content">
              <span className="estado-icon">{estadoConfig.icon}</span>
              <span className="estado-text">{ninio.estado || 'Desconocido'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Detalles */}
      <div className="ninio-card-details">
        {/* Grid de información */}
        <div className="info-grid">
          {/* Edad */}
          <div className="info-item">
            <div className="info-header">
              <div className="info-icon bg-primary">
                <User className="info-svg primary" />
              </div>
              <span className="info-label">Edad</span>
            </div>
            <p className="info-value">
              {edad ? `${edad} años` : 'N/A'}
            </p>
          </div>
          
          {/* Sexo */}
          <div className="info-item">
            <div className="info-header">
              <div className="info-icon bg-secondary">
                <User className="info-svg secondary" />
              </div>
              <span className="info-label">Sexo</span>
            </div>
            <p className="info-value">
              {ninio.sexo || 'No especificado'}
            </p>
          </div>
          
          {/* Nacionalidad */}
          <div className="info-item">
            <div className="info-header">
              <div className="info-icon bg-accent">
                <MapPin className="info-svg accent" />
              </div>
              <span className="info-label">Nacionalidad</span>
            </div>
            <p className="info-value">
              {ninio.nacionalidad || 'No especificada'}
            </p>
          </div>
          
          {/* Etnia */}
          <div className="info-item">
            <div className="info-header">
              <div className="info-icon bg-purple">
                <Tag className="info-svg purple" />
              </div>
              <span className="info-label">Etnia</span>
            </div>
            <p className="info-value">
              {ninio.etnia || 'No especificada'}
            </p>
          </div>
        </div>

        {/* Fechas */}
        <div className="dates-section">
          <div className="date-item">
            <p className="date-label">Fecha de Ingreso</p>
            <div className="date-content">
              <Calendar className="date-icon" />
              <p className="date-value">{formatDate(ninio.fecha_ingreso)}</p>
            </div>
          </div>
          
          {ninio.fecha_egreso && (
            <div className="date-item">
              <p className="date-label">Fecha de Egreso</p>
              <p className="date-value-egreso">
                {formatDate(ninio.fecha_egreso)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="ninio-card-footer">
        <div className="footer-content">
          <div className="ninio-id">
            ID: <span className="id-number">{ninio.id}</span>
          </div>
          <Button
            variant="ghost"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ninios/${ninio.id}`);
            }}
            icon={<ArrowRight className="arrow-icon" />}
            className="details-button"
          >
            Ver detalles
          </Button>
        </div>
      </div>
    </Card>
  );
};