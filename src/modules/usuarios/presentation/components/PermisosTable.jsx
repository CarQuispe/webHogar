// Componente de tabla para mostrar permisos
// src/modules/usuarios/presentation/components/PermisosTable.jsx
export const PermisosTable = ({ permisos, onEdit }) => {
  return (
    <table className="permisos-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {permisos.length === 0 && (
          <tr>
            <td colSpan="3">No hay permisos registrados</td>
          </tr>
        )}

        {permisos.map((permiso) => (
          <tr key={permiso.id}>
            <td>{permiso.name}</td>
            <td>{permiso.description}</td>
            <td>
              <button onClick={() => onEdit(permiso)}>
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
