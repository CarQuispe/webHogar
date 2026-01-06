// src/modules/ninios/presentation/pages/NinioDetailPage.jsx
// src/modules/ninios/presentation/pages/NinioDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetNiniosService } from '../../application/get-ninios.service.js';
import { ApiNiniosRepository } from '../../infrastructure/api.ninios.repository.js';
import { NinioDetail } from '../components/NinioDetail.jsx';
import { ArrowLeft } from 'lucide-react';
import Card from '@components/ui/Card/Card';
import Button from '@components/ui/Button/Button';

export const NinioDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ninio, setNinio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadNinio();
  }, [id]);

  const loadNinio = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log(`🎯 Loading ninio with ID: ${id}`);
      
      const repository = new ApiNiniosRepository();
      const getService = new GetNiniosService(repository);
      
      const result = await repository.getById(id);
      console.log('📋 NinioDetailPage: Result:', result);
      
      if (result) {
        setNinio(result);
      } else {
        setError('Niño no encontrado en el sistema');
      }
    } catch (error) {
      console.error('❌ Error loading ninio:', error);
      setError(error.message || 'Error al cargar información del niño');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/ninios/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer.')) {
      try {
        const repository = new ApiNiniosRepository();
        await repository.delete(id);
        alert('✅ Niño eliminado exitosamente');
        navigate('/ninios');
      } catch (error) {
        console.error('❌ Error deleting ninio:', error);
        alert('❌ Error al eliminar niño: ' + error.message);
      }
    }
  };

  const handleBack = () => {
    navigate('/ninios');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary animate-fade-in">
        <div className="container mx-auto py-12">
          <Card className="animate-pulse" padding="large">
            <div className="text-center">
              <div className="spinner mx-auto mb-6" style={{ width: '48px', height: '48px' }}></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Cargando información del niño...
              </h3>
              <p className="text-gray-600">
                Por favor espere mientras se cargan los datos
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary animate-fade-in">
        <div className="container mx-auto py-12">
          <Card 
            className="max-w-md mx-auto"
            padding="large"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Error al cargar información
              </h2>
              <p className="text-gray-600 mb-6">
                {error}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate('/ninios')}
                >
                  Volver a la lista
                </Button>
                <Button
                  variant="primary"
                  onClick={loadNinio}
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>}
                >
                  Reintentar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!ninio) {
    return (
      <div className="min-h-screen bg-secondary animate-fade-in">
        <div className="container mx-auto py-12">
          <Card 
            className="max-w-md mx-auto"
            padding="large"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Niño no encontrado
              </h2>
              <p className="text-gray-600 mb-6">
                El niño solicitado no existe o ha sido eliminado del sistema.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/ninios')}
              >
                Volver a la lista
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary animate-fade-in">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="small"
                onClick={handleBack}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Volver a lista
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-primary-blue to-primary-blue-dark rounded-xl shadow-md">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Detalle del Residente
                </h1>
                <p className="text-gray-600 mt-1">
                  Información completa del niño/niña
                </p>
              </div>
            </div>
          </div>
          
          {/* Actions Bar */}
          <Card 
            className="mb-6"
            padding="medium"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700">ID</div>
                  <div className="text-lg font-semibold text-primary-blue">{ninio.id}</div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700">Estado</div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    ninio.estado === 'activo' ? 'bg-success/10 text-success' :
                    ninio.estado === 'inactivo' ? 'bg-gray-100 text-gray-700' :
                    'bg-warning/10 text-warning'
                  }`}>
                    {ninio.estado?.charAt(0).toUpperCase() + ninio.estado?.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="medium"
                  onClick={handleEdit}
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="medium"
                  onClick={handleDelete}
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <NinioDetail 
          ninio={ninio}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default NinioDetailPage;