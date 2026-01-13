// src/modules/usuarios/domain/entities/permission.entity.js
export class Permission {
  constructor({ id, name, description }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
