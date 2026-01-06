/**
 * NotFoundPage
 * Página 404 - No encontrada
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-9xl text-blue-500 mb-4">404</div>
          <h1 className="text-3xl text-gray-800 mb-2">
            Página no encontrada
          </h1>
          <p className="text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Ir al inicio
          </button>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          Si crees que esto es un error, por favor contacta al administrador del sistema.
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
