// src/modules/proyectos/pages/ProjectDetails.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, DollarSign, User } from 'lucide-react';

// Componentes UI
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button/Button';

// Reemplazo simple de Badge
const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) => {
  const colors: Record<string, string> = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2 py-1 rounded text-sm ${colors[variant] || colors.default}`}>
      {children}
    </span>
  );
};

// Reemplazo simple de Breadcrumbs
const Breadcrumbs = ({ items }: { items: { label: string; href?: string }[] }) => (
  <nav className="text-sm text-gray-500 mb-4">
    <ol className="flex gap-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-2 items-center">
          {item.href ? (
            <a href={item.href} className="hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
          {idx < items.length - 1 && <span>/</span>}
        </li>
      ))}
    </ol>
  </nav>
);

export function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  /** 🔹 MOCK alineado a la BD */
  const project = {
    id: Number(id),
    codigo: 'PR-2024-001',
    nombre: 'Educación Integral 2024',
    tipo: 'Educación',
    descripcion: 'Programa de apoyo educativo para todos los residentes del hogar',
    monto_total: 15000,
    fecha_inicio: '2024-01-15',
    fecha_fin: '2024-12-31',
    estado: 'activo',
    responsable: {
      id: 3,
      nombre: 'Ana Martínez',
    },
  };

  const daysRemaining = project.fecha_fin
    ? Math.max(
        0,
        Math.ceil(
          (new Date(project.fecha_fin).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : null;

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Proyectos', href: '/projects' },
          { label: project.nombre },
        ]}
      />

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/projects')}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <h1 className="text-gray-900">{project.nombre}</h1>
          <p className="text-gray-600">{project.descripcion}</p>
        </div>

        <Button onClick={() => navigate(`/projects/${id}/edit`)}>
          <Edit className="w-5 h-5" />
          Editar
        </Button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <DollarSign className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Presupuesto</p>
              <p className="text-gray-900">
                Bs. {project.monto_total.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <Calendar className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Inicio</p>
              <p className="text-gray-900">
                {new Date(project.fecha_inicio).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <Calendar className="text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">Días restantes</p>
              <p className="text-gray-900">
                {daysRemaining !== null ? daysRemaining : '—'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <User className="text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Responsable</p>
              <p className="text-gray-900">
                {project.responsable?.nombre ?? 'No asignado'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Información general */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Proyecto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Código</p>
            <p className="text-gray-900">{project.codigo}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tipo</p>
            <Badge>{project.tipo}</Badge>
          </div>

          <div>
            <p className="text-sm text-gray-500">Estado</p>
            <Badge variant={project.estado === 'activo' ? 'success' : 'default'}>
              {project.estado}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
