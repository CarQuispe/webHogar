import { useState, useEffect } from 'react';

export const UsuarioForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [form, setForm] = useState({
    ci: '',
    email: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    nacionalidad: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
    tipoUsuario: 'personal',
    password: '',
    activo: true,
    fechaIngreso: new Date().toISOString().split('T')[0],
    sueldoDiario: '',
    observaciones: '',
    sendEmail: false,
    ...initialData
  });

  useEffect(() => {
    if (initialData.id) {
      setForm(prev => ({
        ...prev,
        ...initialData,
        // Formatear fechas para input type="date"
        fechaNacimiento: initialData.fechaNacimiento 
          ? new Date(initialData.fechaNacimiento).toISOString().split('T')[0]
          : '',
        fechaIngreso: initialData.fechaIngreso
          ? new Date(initialData.fechaIngreso).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      }));
    }
  }, [initialData]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="usuario-form">
      <div className="form-row">
        <div className="form-group">
          <label>CI *</label>
          <input 
            name="ci" 
            placeholder="Cédula de identidad" 
            value={form.ci}
            onChange={handleChange}
            required
            disabled={isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input 
            name="email" 
            type="email" 
            placeholder="Correo electrónico" 
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Nombre *</label>
          <input 
            name="nombre" 
            placeholder="Nombre completo" 
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellido Paterno</label>
          <input 
            name="apellidoPaterno" 
            placeholder="Apellido paterno" 
            value={form.apellidoPaterno}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Apellido Materno</label>
          <input 
            name="apellidoMaterno" 
            placeholder="Apellido materno" 
            value={form.apellidoMaterno}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Sexo</label>
          <select name="sexo" value={form.sexo} onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nacionalidad</label>
          <input 
            name="nacionalidad" 
            placeholder="Nacionalidad" 
            value={form.nacionalidad}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fecha Nacimiento</label>
          <input 
            name="fechaNacimiento" 
            type="date" 
            value={form.fechaNacimiento}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Teléfono</label>
          <input 
            name="telefono" 
            placeholder="Teléfono" 
            value={form.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Tipo Usuario</label>
          <select name="tipoUsuario" value={form.tipoUsuario} onChange={handleChange}>
            <option value="personal">Personal</option>
            <option value="administrativo">Administrativo</option>
            <option value="gerente">Gerente</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fecha Ingreso</label>
          <input 
            name="fechaIngreso" 
            type="date" 
            value={form.fechaIngreso}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Sueldo Diario</label>
          <input 
            name="sueldoDiario" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={form.sueldoDiario}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Activo</label>
          <select name="activo" value={form.activo} onChange={handleChange}>
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </div>

        {!isEditing && (
          <div className="form-group">
            <label>Contraseña *</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required={!form.sendEmail}
              disabled={form.sendEmail}
            />
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="sendEmail"
              checked={form.sendEmail}
              onChange={handleChange}
            />
            Enviar contraseña por email (se generará automáticamente)
          </label>
        </div>
      )}

      <div className="form-group">
        <label>Dirección</label>
        <textarea 
          name="direccion" 
          placeholder="Dirección completa" 
          value={form.direccion}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Observaciones</label>
        <textarea 
          name="observaciones" 
          placeholder="Observaciones" 
          value={form.observaciones}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </div>
    </form>
  );
};