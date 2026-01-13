export class User {
  constructor({
    id,
    ci,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    sexo,
    nacionalidad,
    fechaNacimiento,
    email,
    telefono,
    direccion,
    tipoUsuario = 'personal',
    password,
    activo = true,
    fechaIngreso,
    sueldoDiario,
    observaciones,
    createdAt,
    updatedAt,
    assignmentStatus = 'libre',
    assignedRequestsCount = 0,
    permissionsVersion = 0,
    isAdmin = false,
    resetPasswordToken,
    resetPasswordExpires
  }) {
    this.id = id;
    this.ci = ci;
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.sexo = sexo;
    this.nacionalidad = nacionalidad;
    this.fechaNacimiento = fechaNacimiento;
    this.email = email;
    this.telefono = telefono;
    this.direccion = direccion;
    this.tipoUsuario = tipoUsuario;
    this.password = password;
    this.activo = activo;
    this.fechaIngreso = fechaIngreso;
    this.sueldoDiario = sueldoDiario;
    this.observaciones = observaciones;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.assignmentStatus = assignmentStatus;
    this.assignedRequestsCount = assignedRequestsCount;
    this.permissionsVersion = permissionsVersion;
    this.isAdmin = isAdmin;
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpires = resetPasswordExpires;
  }

  get nombreCompleto() {
    return `${this.nombre} ${this.apellidoPaterno || ''} ${this.apellidoMaterno || ''}`.trim();
  }

  get edad() {
    if (!this.fechaNacimiento) return null;
    const hoy = new Date();
    const nacimiento = new Date(this.fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  get antiguedad() {
    if (!this.fechaIngreso) return null;
    const hoy = new Date();
    const ingreso = new Date(this.fechaIngreso);
    const diffMs = hoy - ingreso;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}