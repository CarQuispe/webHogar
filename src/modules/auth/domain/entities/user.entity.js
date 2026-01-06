// src/modules/auth/domain/entities/user.entity.js
export class User {
  constructor({
    id,
    email,
    name = 'Usuario',
    role = 'USER',
    isActive = true,
    createdAt = null,
    updatedAt = null
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

  canAccess(requiredRole) {
    const rolesHierarchy = {
      'USER': 1,
      'STAFF': 2,
      'ADMIN': 3
    };
    
    const userLevel = rolesHierarchy[this.role] || 0;
    const requiredLevel = rolesHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
  }
}