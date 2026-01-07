// src/modules/ninios/presentation/pages/CreateNinioPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateNinioService } from '../../application/create-ninio.service.js';
import { ApiNiniosRepository } from '../../infrastructure/api.ninios.repository.js';
import { NinioForm } from '../components/NinioForm.jsx';
import { ArrowLeft, UserPlus, CheckCircle } from 'lucide-react';
import Card from '@components/ui/Card/Card';
import Button from '@components/ui/Button/Button';

export const CreateNinioPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [createdNinio, setCreatedNinio] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    setCreatedNinio(null);

    try {
      console.log(' [CreateNinioPage] Datos recibidos del formulario:', formData);
      
      // Preparar datos para enviar al backend
      const ninioDataToSend = {
        ...formData,
        fecha_nacimiento: formData.fecha_nacimiento || null,
        fecha_ingreso: formData.fecha_ingreso || new Date().toISOString().split('T')[0],
        fecha_egreso: formData.estado === 'egresado' ? formData.fecha_egreso : null,
        motivo_egreso: formData.estado === 'egresado' ? formData.motivo_egreso : null,
        observaciones_ingreso: formData.observaciones_ingreso || '',
        sexo: formData.sexo || 'no especificado',
        nacionalidad: formData.nacionalidad || 'Boliviana',
        estado: formData.estado || 'activo'
      };
      console.log(' [CreateNinioPage] Datos a enviar al backend:', ninioDataToSend);
      
      const repository = new ApiNiniosRepository();
      const createService = new CreateNinioService(repository);
      
      console.log(' [CreateNinioPage] Ejecutando servicio de creación...');
      const result = await createService.execute(ninioDataToSend);
      
      console.log(' [CreateNinioPage] Resultado del servicio:', result);
      
      if (result && result.success) {
        // Éxito - Niño creado
        setSuccess(true);
        setCreatedNinio(result.data);
        
        console.log(' [CreateNinioPage] Niño creado exitosamente:', result.data);
        
        // Mostrar alerta temporal
        setTimeout(() => {
          navigate('/ninios');
        }, 2000);
        
      } else {
        // El servicio no fue exitoso
        const errorMsg = result?.message || 'Error al registrar el niño';
        setError(errorMsg);
        console.error(' [CreateNinioPage]', errorMsg);
      }
      
    } catch (error) {
      console.error(' [CreateNinioPage] Error al crear niño:', error);
      
      // Manejar diferentes tipos de errores
      let errorMessage = 'Error al registrar el niño';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnother = () => {
    setSuccess(false);
    setCreatedNinio(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-secondary py-8 animate-fade-in">
      <div className="container mx-auto">
        {/* Header */}
        <Card 
          className="mb-6"
          padding="large"
          backgroundColor="bg-primary"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="small"
                onClick={() => navigate('/ninios')}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Volver a la lista
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-primary-blue to-primary-blue-dark rounded-xl shadow-md">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Registrar Nuevo Niño
                </h1>
                <p className="text-gray-600 mt-1">
                  Completa todos los campos para registrar un nuevo residente
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Mensajes de error */}
        {error && (
          <Card 
            className="mb-6 animate-slide-down"
            padding="medium"
          >
            <div className="alert-error">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-error mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Error al registrar</h3>
                  <div className="mt-1 text-sm text-gray-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Mensaje de éxito */}
        {success && createdNinio && (
          <Card 
            className="mb-6 animate-slide-down"
            padding="large"
            backgroundColor="bg-gradient-to-r from-green-50 to-emerald-50"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  ¡Niño registrado exitosamente!
                </h3>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-700 font-medium">
                    {createdNinio.nombre} {createdNinio.apellido_paterno} {createdNinio.apellido_materno}
                  </p>
                  {createdNinio.ci && (
                    <p className="text-sm text-gray-600">
                      CI: {createdNinio.ci}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    Serás redirigido a la lista en unos segundos...
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => navigate(`/ninios/${createdNinio.id}`)}
                  >
                    Ver detalles
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={handleCreateAnother}
                  >
                    Registrar otro niño
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Formulario (solo mostrar si no hay éxito) */}
        {!success && (
          <Card
            title="Información del Nuevo Residente"
            subtitle="Complete todos los campos obligatorios (*)"
            padding="large"
            hoverable={false}
            shadow="lg"
          >
            <div className="pt-2">
              <NinioForm 
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateNinioPage;