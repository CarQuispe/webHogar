export class PermisosService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll() {
    return this.repository.findAll();
  }
}
