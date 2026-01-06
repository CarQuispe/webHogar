// src/modules/auth/domain/entities/auth-token.entity.js
export class AuthToken {
  constructor({
    accessToken,
    refreshToken = null,
    expiresIn = 3600,
    tokenType = 'Bearer'
  }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.tokenType = tokenType;
    this.createdAt = new Date();
  }

  isValid() {
    if (!this.accessToken) return false;
    
    // Si no hay expiración, considerar válido
    if (!this.expiresIn) return true;
    
    const expirationTime = new Date(
      this.createdAt.getTime() + (this.expiresIn * 1000)
    );
    return new Date() < expirationTime;
  }

  getAuthorizationHeader() {
    return `${this.tokenType} ${this.accessToken}`;
  }

  timeUntilExpiration() {
    if (!this.expiresIn) return Infinity;
    
    const expirationTime = new Date(
      this.createdAt.getTime() + (this.expiresIn * 1000)
    );
    return expirationTime - new Date();
  }
}