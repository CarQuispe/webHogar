// src/modules/usuarios/presentation/pages/UsuariosPage.jsx
import { useState, useEffect } from 'react';

import { UsuarioForm } from '../components/UsuarioForm';
import { UsuariosTable } from '../components/UsuariosTable';
import { useUsuarios } from '../contexts/UsuariosContext';

export const UsuariosPage = () => {
  const {
    usuarios,
    loading,
    error,
    cargarUsuarios,
    crearUsuario,
    actualizarUsuario,
    cambiarEstadoUsuario,
    restablecerContrasena,
    currentUsuario,
    obtenerUsuario,
    limpiarUsuarioActual
  } = useUsuarios();

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  const handleCreate = async (formData) => {
    try {
      await crearUsuario(formData);
      setShowForm(false);
      alert('Usuario creado exitosamente');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    try {
      await obtenerUsuario(id);
      setShowForm(true);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await actualizarUsuario(currentUsuario.id, formData);
      setShowForm(false);
      limpiarUsuarioActual();
      alert('Usuario actualizado exitosamente');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleToggleStatus = async (id, activo) => {
    if (window.confirm(`¿Está seguro de ${activo ? 'activar' : 'suspender'} este usuario?`)) {
      try {
        await cambiarEstadoUsuario(id, activo);
        alert(`Usuario ${activo ? 'activado' : 'suspendido'} exitosamente`);
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  const handleResetPassword = async (id) => {
    if (window.confirm('¿Está seguro de restablecer la contraseña? Se generará una nueva contraseña.')) {
      try {
        const result = await restablecerContrasena(id);
        alert(`Contraseña restablecida. Nueva contraseña: ${result.newPassword}`);
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  const filteredUsuarios = usuarios.filter(usuario => {
    const searchLower = searchTerm.toLowerCase();
    return (
      usuario.ci.toLowerCase().includes(searchLower) ||
      usuario.nombre.toLowerCase().includes(searchLower) ||
      usuario.email.toLowerCase().includes(searchLower) ||
      (usuario.apellidoPaterno && usuario.apellidoPaterno.toLowerCase().includes(searchLower)) ||
      (usuario.telefono && usuario.telefono.includes(searchTerm))
    );
  });

  if (loading && usuarios.length === 0) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  return (
    <div className="usuarios-page">
      <div className="page-header">
        <h1>Gestión de Usuarios</h1>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar por CI, nombre, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="btn-primary"
            onClick={() => {
              limpiarUsuarioActual();
              setShowForm(true);
            }}
          >
            + Nuevo Usuario
          </button>
        </div>
      </div>

      {error && (
        <div className="error-alert">
          Error: {error}
        </div>
      )}

      {showForm ? (
        <div className="form-container">
          <div className="form-header">
            <h2>{currentUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <button 
              className="btn-secondary"
              onClick={() => {
                setShowForm(false);
                limpiarUsuarioActual();
              }}
            >
              Cancelar
            </button>
          </div>
          <UsuarioForm
            onSubmit={currentUsuario ? handleUpdate : handleCreate}
            initialData={currentUsuario || {}}
            isEditing={!!currentUsuario}
          />
        </div>
      ) : (
        <UsuariosTable
          usuarios={filteredUsuarios}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          onResetPassword={handleResetPassword}
        />
      )}

      {loading && usuarios.length > 0 && (
        <div className="loading-overlay">Actualizando...</div>
      )}
    </div>
  );
};