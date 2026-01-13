// src/modules/ninios/presentation/components/NinioTable.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import './NinioTable.css';

export const NinioTable = ({ ninios = [], onDelete, loading }) => {
  const navigate = useNavigate();

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo': return 'estado-activo';
      case 'en_transicion': 
      case 'en transicion': 
      case 'en tran': // CORRECCIÓN: Añadí este caso
        return 'estado-transicion';
      case 'egresado': 
      case 'egre': // CORRECCIÓN: Añadí este caso
        return 'estado-egresado';
      default: return 'estado-default';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo': 
      case 'acti': // CORRECCIÓN: Añadí este caso
        return 'Activo';
      case 'en_transicion': 
      case 'en transicion': 
      case 'en tran': // CORRECCIÓN: Añadí este caso
        return 'En Transición';
      case 'egresado': 
      case 'egre': // CORRECCIÓN: Añadí este caso
        return 'Egresado';
      default: return estado || 'No especificado';
    }
  };

  const calcularEdad = (fechaNacimiento, edadTexto) => {
    // Si ya viene la edad en texto, la usamos
    if (edadTexto && typeof edadTexto === 'string') {
      return edadTexto.includes('Años') ? edadTexto : `${edadTexto} años`;
    }
    
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
    if (!nombre) return 'NN';
    const first = nombre.charAt(0).toUpperCase();
    const second = apellido?.charAt(0)?.toUpperCase() || '';
    return first + second;
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de eliminar este niño? Esta acción no se puede deshacer.')) {
      await onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!ninios || ninios.length === 0) {
    return (
      <div className="table-empty">
        <div className="empty-icon">📋</div>
        <p className="empty-text">No hay niños registrados</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="ninio-table">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Nombre</th>
            <th className="table-header-cell">CI</th>
            <th className="table-header-cell">Edad</th>
            <th className="table-header-cell">Sexo</th>
            <th className="table-header-cell">Estado</th>
            <th className="table-header-cell">Fecha Ingreso</th>
            <th className="table-header-cell">Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {ninios.map((ninio) => (
            <tr 
              key={ninio.id}
              onClick={() => navigate(`/ninios/${ninio.id}`)}
              className="table-row"
            >
              {/* COLUMNA 1: NOMBRE */}
              <td className="table-cell">
                <div className="user-cell">
                  <div className="user-avatar">
                    <span className="avatar-text">
                      {getInitials(ninio.nombre, ninio.apellido_paterno)}
                    </span>
                  </div>
                  <div className="user-info">
                    <div className="user-name">
                      {`${ninio.nombre || ''} ${ninio.apellido_paterno || ''} ${ninio.apellido_materno || ''}`.trim()}
                    </div>
                    <div className="user-detail">
                      {ninio.nacionalidad || 'Boliviana'}
                    </div>
                  </div>
                </div>
              </td>
              
              {/* COLUMNA 2: CI */}
              <td className="table-cell">
                <div className="ci-cell">{ninio.ci || 'Sin CI'}</div>
              </td>
              
              {/* COLUMNA 3: EDAD */}
              <td className="table-cell">
                <div className="age-cell">
                  {calcularEdad(ninio.fecha_nacimiento, ninio.edad)}
                </div>
              </td>
              
              {/* COLUMNA 4: SEXO */}
              <td className="table-cell">
                <div className="sexo-cell capitalize">
                  {ninio.sexo || 'No especificado'}
                </div>
              </td>
              
              {/* COLUMNA 5: ESTADO */}
              <td className="table-cell">
                <span className={`estado-badge ${getEstadoColor(ninio.estado)}`}>
                  {getEstadoText(ninio.estado)}
                </span>
              </td>
              
              {/* COLUMNA 6: FECHA INGRESO */}
              <td className="table-cell">
                {ninio.fecha_ingreso ? formatDate(ninio.fecha_ingreso) : 'No registrada'}
              </td>
              
              {/* COLUMNA 7: ACCIONES */}
              <td className="table-cell">
                <div className="actions-cell" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => navigate(`/ninios/${ninio.id}`)}
                    className="action-button view-button"
                    title="Ver detalles"
                  >
                    <Eye className="action-icon" />
                  </button>
                  <button
                    onClick={() => navigate(`/ninios/edit/${ninio.id}`)}
                    className="action-button edit-button"
                    title="Editar"
                  >
                    <Edit className="action-icon" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(ninio.id, e)}
                    className="action-button delete-button"
                    title="Eliminar"
                  >
                    <Trash2 className="action-icon" />
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