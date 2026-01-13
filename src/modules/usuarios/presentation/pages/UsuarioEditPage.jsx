// src/modules/usuarios/presentation/pages/UsuarioEditPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { UsuarioForm } from '../components/UsuarioForm';
import{ useUsuarios } from '../contexts/UsuariosContext';

export default function UsuarioEditPage() {
  const { id } = useParams();
  const { service } = useUsuarios();
  const navigate = useNavigate();

  const handleUpdate = async data => {
    await service.update(id, data);
    navigate('/usuarios');
  };

  return (
    <>
      <h1>Editar Usuario</h1>
      <UsuarioForm onSubmit={handleUpdate} />
    </>
  );
}
