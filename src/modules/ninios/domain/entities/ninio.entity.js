// src/modules/ninios/domain/entities/ninio.entity.js
export class Ninio {
  constructor(data) {
    this.id = data.id || null;
    this.ci = data.ci || '';
    this.nombre = data.nombre || '';
    this.apellido_paterno = data.apellido_paterno || '';
    this.apellido_materno = data.apellido_materno || '';
    this.sexo = data.sexo || 'no especificado';
    this.nacionalidad = data.nacionalidad || 'Boliviana';
    this.etnia = data.etnia || '';
    this.fecha_nacimiento = data.fecha_nacimiento || '';
    this.fecha_ingreso = data.fecha_ingreso || new Date().toISOString().split('T')[0];
    this.estado = data.estado || 'activo';
    this.observaciones_ingreso = data.observaciones_ingreso || '';
    this.fecha_egreso = data.fecha_egreso || null;
    this.motivo_egreso = data.motivo_egreso || '';
    this.fecha_creacion = data.fecha_creacion || new Date().toISOString();
    this.fecha_actualizacion = data.fecha_actualizacion || new Date().toISOString();
  }

  validate() {
    const errors = [];
    
    if (!this.ci) errors.push('CI es requerido');
    if (!this.nombre) errors.push('Nombre es requerido');
    if (!this.fecha_nacimiento) errors.push('Fecha de nacimiento es requerida');
    
    if (this.ci && !/^\d+$/.test(this.ci.replace(/\s/g, ''))) {
      errors.push('CI debe contener solo números');
    }
    
    if (this.fecha_nacimiento) {
      const birthDate = new Date(this.fecha_nacimiento);
      const today = new Date();
      if (birthDate > today) {
        errors.push('Fecha de nacimiento no puede ser futura');
      }
    }
    
    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      ci: this.ci,
      nombre: this.nombre,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      sexo: this.sexo,
      nacionalidad: this.nacionalidad,
      etnia: this.etnia,
      fecha_nacimiento: this.fecha_nacimiento,
      fecha_ingreso: this.fecha_ingreso,
      estado: this.estado,
      observaciones_ingreso: this.observaciones_ingreso,
      fecha_egreso: this.fecha_egreso,
      motivo_egreso: this.motivo_egreso,
      fecha_creacion: this.fecha_creacion,
      fecha_actualizacion: this.fecha_actualizacion,
      nombre_completo: `${this.nombre} ${this.apellido_paterno} ${this.apellido_materno}`.trim(),
      edad: this.calcularEdad()
    };
  }

  calcularEdad() {
    if (!this.fecha_nacimiento) return null;
    
    const birthDate = new Date(this.fecha_nacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}