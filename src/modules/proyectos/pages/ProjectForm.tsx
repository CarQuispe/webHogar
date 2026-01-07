// src/modules/proyectos/pages/ProjectForm.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

// Componentes UI
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button/Button';

// --------------------
// Select simple tipado
// --------------------
type SelectOption = { value: string; label: string };

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => (
  <div className="flex flex-col">
    <label className="mb-1.5 text-gray-700">{label}</label>
    <select
      className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      value={value}
      onChange={onChange}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// --------------------
// Breadcrumbs simple
// --------------------
interface BreadcrumbItem {
  label: string;
  href?: string;
}

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
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

// ====================
// Página principal
// ====================
export function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: isEditing ? 'Educación Integral 2024' : '',
    description: isEditing
      ? 'Programa de apoyo educativo para todos los residentes'
      : '',
    objective: isEditing
      ? 'Mejorar el rendimiento académico de los residentes'
      : '',
    category: 'educacion',
    responsible: isEditing ? 'ana' : '',
    budget: isEditing ? '15000' : '',
    startDate: isEditing ? '2024-01-15' : '',
    endDate: isEditing ? '2024-12-31' : '',
    status: isEditing ? 'ejecucion' : 'activo',
    progress: isEditing ? '75' : '0',
  });

  const categoryOptions: SelectOption[] = [
    { value: 'educacion', label: 'Educación' },
    { value: 'salud', label: 'Salud' },
    { value: 'recreacion', label: 'Recreación' },
    { value: 'psicologia', label: 'Psicología' },
    { value: 'capacitacion', label: 'Capacitación' },
    { value: 'infraestructura', label: 'Infraestructura' },
  ];

  const responsibleOptions: SelectOption[] = [
    { value: 'maria', label: 'María González - Administradora' },
    { value: 'carlos', label: 'Dr. Carlos López - Psicólogo' },
    { value: 'ana', label: 'Ana Martínez - Educadora' },
    { value: 'pedro', label: 'Pedro Ramírez - Trabajador Social' },
  ];

  const statusOptions: SelectOption[] = [
    { value: 'activo', label: 'Activo' },
    { value: 'ejecucion', label: 'En Ejecución' },
    { value: 'pausado', label: 'Pausado' },
    { value: 'finalizado', label: 'Finalizado' },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/projects');
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Proyectos', href: '/projects' },
          { label: isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto' },
        ]}
      />

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-gray-900">
            {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h1>
          <p className="text-gray-600">
            {isEditing
              ? 'Actualiza la información del proyecto'
              : 'Completa el formulario para crear un nuevo proyecto'}
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-gray-900 mb-4">Información General</h3>

              <div className="space-y-4">
                <Input
                  label="Nombre del Proyecto"
                  type="text"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />

                <div>
                  <label className="block mb-1.5 text-gray-700">Descripción</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    rows={3}
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-gray-700">Objetivo</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    rows={3}
                    value={formData.objective}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({ ...formData, objective: e.target.value })
                    }
                    required
                  />
                </div>

                <Select
                  label="Categoría"
                  options={categoryOptions}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
            </Card>

            <Card>
              <h3 className="text-gray-900 mb-4">Planificación</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Responsable"
                  options={responsibleOptions}
                  value={formData.responsible}
                  onChange={(e) =>
                    setFormData({ ...formData, responsible: e.target.value })
                  }
                />

                <Input
                  label="Presupuesto (Bs.)"
                  type="number"
                  value={formData.budget}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  required
                />

                <Input
                  label="Fecha de Inicio"
                  type="date"
                  value={formData.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                />

                <Input
                  label="Fecha de Fin"
                  type="date"
                  value={formData.endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
                />
              </div>
            </Card>

            <Card>
              <h3 className="text-gray-900 mb-4">Estado y Avance</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Estado"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                />

                <Input
                  label="Avance (%)"
                  type="number"
                  min={0}
                  max={100}
                  value={formData.progress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, progress: e.target.value })
                  }
                  required
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h4 className="text-gray-900 mb-3">Acciones</h4>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
