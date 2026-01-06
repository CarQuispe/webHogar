// src/modules/ninios/application/create-ninio.service.js
// src/modules/ninios/application/create-ninio.service.js
export class CreateNinioService {
  constructor(niniosRepository) {
    this.niniosRepository = niniosRepository;
    console.log('🚀 [CreateNinioService] Inicializado');
  }

  async execute(ninioData) {
    try {
      console.log('📝 [CreateNinioService] Ejecutando con datos:', ninioData);
      
      // 1. Validaciones básicas
      const errors = this.validateInput(ninioData);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
      
      // 2. Limpiar y preparar CI
      const cleanCI = ninioData.ci.replace(/\s/g, '');
      
      // 3. Verificar si ya existe un niño con el mismo CI
      console.log(`🔍 [CreateNinioService] Verificando existencia de CI: ${cleanCI}`);
      
      let existingNinio = null;
      try {
        existingNinio = await this.niniosRepository.getByCI(cleanCI);
      } catch (ciError) {
        // Si el endpoint no existe o da error 404, continuar
        if (!ciError.message.includes('404')) {
          console.warn('⚠️ [CreateNinioService] Error al verificar CI:', ciError.message);
        }
      }
      
      if (existingNinio) {
        const existingNombre = existingNinio.toJSON 
          ? existingNinio.toJSON().nombre_completo 
          : `${existingNinio.nombre || ''} ${existingNinio.apellido_paterno || ''}`.trim();
          
        throw new Error(`Ya existe un niño registrado con el CI: ${cleanCI} (${existingNombre})`);
      }
      
      // 4. Preparar datos para crear
      const ninioToCreate = {
        ci: cleanCI,
        nombre: ninioData.nombre.trim(),
        apellido_paterno: ninioData.apellido_paterno?.trim() || '',
        apellido_materno: ninioData.apellido_materno?.trim() || '',
        sexo: ninioData.sexo || 'no especificado',
        nacionalidad: ninioData.nacionalidad || 'Boliviana',
        etnia: ninioData.etnia?.trim() || '',
        fecha_nacimiento: ninioData.fecha_nacimiento,
        fecha_ingreso: ninioData.fecha_ingreso || new Date().toISOString().split('T')[0],
        estado: ninioData.estado || 'activo',
        observaciones_ingreso: ninioData.observaciones_ingreso?.trim() || '',
        fecha_egreso: ninioData.fecha_egreso || null,
        motivo_egreso: ninioData.motivo_egreso?.trim() || null
      };
      
      console.log('📤 [CreateNinioService] Datos a enviar:', ninioToCreate);
      
      // 5. Crear el niño
      const nuevoNinio = await this.niniosRepository.create(ninioToCreate);
      
      console.log('✅ [CreateNinioService] Niño creado:', nuevoNinio);
      
      // 6. Obtener nombre completo para el log
      let nombreCompleto = '';
      if (nuevoNinio.toJSON) {
        // Si tiene método toJSON()
        const jsonData = nuevoNinio.toJSON();
        nombreCompleto = jsonData.nombre_completo || '';
      } else if (nuevoNinio.nombre_completo) {
        // Si tiene propiedad directa
        nombreCompleto = nuevoNinio.nombre_completo;
      } else {
        // Construir manualmente
        nombreCompleto = `${nuevoNinio.nombre || ''} ${nuevoNinio.apellido_paterno || ''} ${nuevoNinio.apellido_materno || ''}`.trim();
      }
      
      console.log(`📋 [CreateNinioService] Nuevo niño: ${nombreCompleto} (CI: ${cleanCI})`);
      
      // 7. Retornar resultado
      return {
        success: true,
        data: nuevoNinio,
        message: `Niño "${nombreCompleto}" registrado exitosamente`
      };
      
    } catch (error) {
      console.error('🔥 [CreateNinioService] Error:', error);
      
      // Mejorar mensajes de error
      const userMessage = this.getUserFriendlyErrorMessage(error);
      throw new Error(userMessage);
    }
  }

  validateInput(ninioData) {
    const errors = [];
    
    // Validar CI
    if (!ninioData.ci || ninioData.ci.trim() === '') {
      errors.push('El CI es requerido');
    } else {
      const cleanCI = ninioData.ci.replace(/\s/g, '');
      if (!/^\d+$/.test(cleanCI)) {
        errors.push('El CI debe contener solo números');
      }
      if (cleanCI.length < 5 || cleanCI.length > 12) {
        errors.push('El CI debe tener entre 5 y 12 dígitos');
      }
    }
    
    // Validar nombre
    if (!ninioData.nombre || ninioData.nombre.trim() === '') {
      errors.push('El nombre es requerido');
    }
    
    // Validar fecha de nacimiento
    if (!ninioData.fecha_nacimiento) {
      errors.push('La fecha de nacimiento es requerida');
    } else {
      const birthDate = new Date(ninioData.fecha_nacimiento);
      const today = new Date();
      if (birthDate > today) {
        errors.push('La fecha de nacimiento no puede ser futura');
      }
      
      // Validar que sea una fecha válida
      if (isNaN(birthDate.getTime())) {
        errors.push('La fecha de nacimiento no es válida');
      }
    }
    
    // Validar fecha de ingreso si se proporciona
    if (ninioData.fecha_ingreso) {
      const ingresoDate = new Date(ninioData.fecha_ingreso);
      if (isNaN(ingresoDate.getTime())) {
        errors.push('La fecha de ingreso no es válida');
      }
    }
    
    // Validar fechas si hay egreso
    if (ninioData.fecha_egreso) {
      const egresoDate = new Date(ninioData.fecha_egreso);
      if (isNaN(egresoDate.getTime())) {
        errors.push('La fecha de egreso no es válida');
      }
      
      // Validar que egreso no sea anterior a ingreso
      if (ninioData.fecha_ingreso && egresoDate < new Date(ninioData.fecha_ingreso)) {
        errors.push('La fecha de egreso no puede ser anterior a la fecha de ingreso');
      }
    }
    
    return errors;
  }

  getUserFriendlyErrorMessage(error) {
    const errorMsg = error.message || 'Error desconocido';
    
    // Errores de validación
    if (errorMsg.includes('El CI es requerido')) return 'El CI es un campo obligatorio';
    if (errorMsg.includes('El CI debe contener solo números')) return 'El CI solo puede contener números';
    if (errorMsg.includes('El nombre es requerido')) return 'El nombre es un campo obligatorio';
    if (errorMsg.includes('La fecha de nacimiento es requerida')) return 'La fecha de nacimiento es obligatoria';
    if (errorMsg.includes('Ya existe un niño')) return errorMsg;
    
    // Errores de red/servidor
    if (errorMsg.includes('network') || errorMsg.includes('fetch') || errorMsg.includes('Failed to fetch')) {
      return 'Error de conexión. Verifica que el servidor esté corriendo y tu conexión a internet.';
    }
    
    if (errorMsg.includes('401') || errorMsg.includes('403')) {
      return 'No tienes permisos para esta acción. Tu sesión puede haber expirado.';
    }
    
    if (errorMsg.includes('500') || errorMsg.includes('Internal Server')) {
      return 'Error interno del servidor. Por favor, contacta al administrador.';
    }
    
    // Error genérico
    return errorMsg || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
  }
}