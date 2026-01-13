export const UsuariosTable = ({ usuarios, onEdit, onToggleStatus, onResetPassword }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const formatCurrency = (amount) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="table-responsive">
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>CI</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Tipo Usuario</th>
            <th>Teléfono</th>
            <th>F. Ingreso</th>
            <th>Sueldo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">No hay usuarios registrados</td>
            </tr>
          ) : (
            usuarios.map(usuario => (
              <tr key={usuario.id} className={usuario.activo ? '' : 'inactive'}>
                <td>{usuario.ci}</td>
                <td>
                  <div className="user-name">
                    <strong>{usuario.nombre}</strong>
                    {usuario.apellidoPaterno && (
                      <span> {usuario.apellidoPaterno} {usuario.apellidoMaterno || ''}</span>
                    )}
                  </div>
                </td>
                <td>{usuario.email}</td>
                <td>
                  <span className={`badge ${usuario.tipoUsuario}`}>
                    {usuario.tipoUsuario}
                  </span>
                </td>
                <td>{usuario.telefono || '-'}</td>
                <td>{formatDate(usuario.fechaIngreso)}</td>
                <td>{formatCurrency(usuario.sueldoDiario)}</td>
                <td>
                  <span className={`status-badge ${usuario.activo ? 'active' : 'inactive'}`}>
                    {usuario.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-edit"
                      onClick={() => onEdit(usuario.id)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      className={`btn-status ${usuario.activo ? 'suspend' : 'activate'}`}
                      onClick={() => onToggleStatus(usuario.id, !usuario.activo)}
                      title={usuario.activo ? 'Suspender' : 'Activar'}
                    >
                      {usuario.activo ? '⏸️' : '▶️'}
                    </button>
                    <button 
                      className="btn-reset"
                      onClick={() => onResetPassword(usuario.id)}
                      title="Restablecer contraseña"
                    >
                      🔄
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};