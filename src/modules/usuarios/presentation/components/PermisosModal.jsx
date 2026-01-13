// src/modules/usuarios/presentation/components/PermisosModal.jsx
import { useState, useEffect } from 'react';

export const PermisosModal = ({ isOpen, onClose, permiso, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (permiso) {
      setForm({
        name: permiso.name || '',
        description: permiso.description || '',
      });
    }
  }, [permiso]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{permiso ? 'Editar Permiso' : 'Nuevo Permiso'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nombre del permiso"
            value={form.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
