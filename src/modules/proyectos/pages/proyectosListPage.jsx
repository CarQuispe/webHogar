/**
 * ProyectosListPage - Sistema del Hogar de Niños
 * Página de gestión de proyectos
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Plus,
  Search,
  Eye,
  LayoutGrid,
  List,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// UI Components
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';

/* =====================
   Constantes
===================== */

export const ProjectStatus = {
  ACTIVO: 'Activo',
  EN_EJECUCION: 'En Ejecución',
  FINALIZADO: 'Finalizado',
};

/* =====================
   Mock de datos
===================== */

const mockProjects = [
  {
    id: 1,
    name: 'Educación Integral 2024',
    description: 'Programa de apoyo educativo para todos los residentes',
    responsible: 'Ana Martínez',
    status: ProjectStatus.EN_EJECUCION,
    progress: 75,
    budget: 15000,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    category: 'Educación',
  },
  {
    id: 2,
    name: 'Salud y Bienestar',
    description: 'Programa de salud preventiva y atención médica',
    responsible: 'Dr. Carlos López',
    status: ProjectStatus.EN_EJECUCION,
    progress: 60,
    budget: 20000,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    category: 'Salud',
  },
  {
    id: 3,
    name: 'Talleres Recreativos',
    description: 'Actividades deportivas y artísticas',
    responsible: 'Laura Sánchez',
    status: ProjectStatus.ACTIVO,
    progress: 90,
    budget: 8000,
    startDate: '2024-02-10',
    endDate: '2024-11-30',
    category: 'Recreación',
  },
  {
    id: 4,
    name: 'Apoyo Psicológico',
    description: 'Programa de acompañamiento psicológico',
    responsible: 'Dr. Carlos López',
    status: ProjectStatus.EN_EJECUCION,
    progress: 70,
    budget: 12000,
    startDate: '2024-01-20',
    endDate: '2024-12-31',
    category: 'Psicología',
  },
  {
    id: 5,
    name: 'Capacitación de Personal',
    description: 'Formación continua del equipo de trabajo',
    responsible: 'María González',
    status: ProjectStatus.FINALIZADO,
    progress: 100,
    budget: 5000,
    startDate: '2024-06-01',
    endDate: '2024-09-30',
    category: 'Capacitación',
  },
];

/* =====================
   Componente principal
===================== */

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: ProjectStatus.ACTIVO, label: 'Activo' },
    { value: ProjectStatus.EN_EJECUCION, label: 'En Ejecución' },
    { value: ProjectStatus.FINALIZADO, label: 'Finalizado' },
  ];

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case ProjectStatus.ACTIVO:
        return 'success';
      case ProjectStatus.EN_EJECUCION:
        return 'info';
      case ProjectStatus.FINALIZADO:
        return 'default';
      default:
        return 'warning';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Educación: 'from-blue-500 to-blue-600',
      Salud: 'from-green-500 to-green-600',
      Recreación: 'from-orange-500 to-orange-600',
      Psicología: 'from-purple-500 to-purple-600',
      Capacitación: 'from-pink-500 to-pink-600',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Proyectos' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-2">Gestión de Proyectos</h1>
          <p className="text-gray-600">
            Administra los proyectos del centro
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <Link to="/projects/new">
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Nuevo Proyecto
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Buscar proyectos..."
              icon={<Search className="w-5 h-5" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </Card>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} hover>
              <div
                className={`h-2 bg-gradient-to-r ${getCategoryColor(
                  project.category
                )} rounded-t-lg -mt-6 -mx-6 mb-4`}
              />

              <CardContent>
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-gray-900">{project.name}</h4>
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Avance</span>
                      <span className="text-gray-900">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Responsable</span>
                    <span className="text-gray-900">
                      {project.responsible}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(project.startDate).toLocaleDateString('es-ES', {
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                      -{' '}
                      {new Date(project.endDate).toLocaleDateString('es-ES', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <Link to={`/projects/${project.id}`}>
                  <Button variant="outline" fullWidth size="sm">
                    <Eye className="w-4 h-4" />
                    Ver Detalles
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={2}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

/* =====================
   PropTypes
===================== */

ProjectList.propTypes = {
  // Si este componente recibe props, defínelas aquí
};

export default ProjectList;