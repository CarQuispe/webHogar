export class UsuariosService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll() {
    return this.repository.findAll();
  }

  getById(id) {
    return this.repository.findById(id);
  }

  create(data) {
    return this.repository.create(data);
  }

  update(id, data) {
    return this.repository.update(id, data);
  }
}
