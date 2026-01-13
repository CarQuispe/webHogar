// src/modules/usuarios/presentation/pages/UsuariosListPage.jsx
import { useNavigate } from 'react-router-dom';
import{ useUsuarios } from '../contexts/UsuariosContext';
import { UsuariosTable } from '../components/UsuariosTable';

export default function UsuariosListPage() {
  const { usuarios } = useUsuarios();
  const navigate = useNavigate();

  return (
    <>
      <h1>Usuarios</h1>
      <button onClick={() => navigate('/usuarios/create')}>Nuevo</button>
      <UsuariosTable usuarios={usuarios} onEdit={id => navigate(`/usuarios/${id}`)} />
    </>
  );
}
