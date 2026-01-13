// src/modules/usuarios/presentation/pages/UsuarioCreatePage.jsx
import { useNavigate } from 'react-router-dom';
import { UsuarioForm } from '../components/UsuarioForm';
import{ useUsuarios } from '../contexts/UsuariosContext';

export default function UsuarioCreatePage() {
  const { service } = useUsuarios();
  const navigate = useNavigate();

  const handleCreate = async data => {
    await service.create(data);
    navigate('/usuarios');
  };

  return (
    <>
      <h1>Crear Usuario</h1>
      <UsuarioForm onSubmit={handleCreate} />
    </>
  );
}
