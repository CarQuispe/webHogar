// src/modules/sedepos/presentation/pages/CreateSedeposPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Download } from 'lucide-react';
import './CreateSedeposPage.css';

export const CreateSedeposPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    periodo: '',
    tipoReporte: 'mensual',
    fechaGeneracion: new Date().toISOString().split('T')[0],
    datos: {
      totalNinios: '',
      nuevosIngresos: '',
      egresos: '',
      proyectosActivos: '',
      eventosRealizados: ''
    },
    observaciones: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Generando reporte SEDEPOS:', formData);
    alert('Reporte SEDEPOS generado exitosamente');
    navigate('/sedepos');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('datos.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        datos: { ...prev.datos, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleExport = () => {
    alert('Reporte exportado en formato PDF');
  };

  return (
    <div className="create-sedepos-page">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1>Generar Reporte SEDEPOS</h1>
        <button onClick={handleExport} className="btn-secondary">
          <Download size={20} />
          Exportar PDF
        </button>
      </div>

      <form onSubmit={handleSubmit} className="sedepos-form card">
        <div className="form-header">
          <h3>Centro de Acogida "Santa Emilia"</h3>
          <p>Reporte Oficial SEDEPOS</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="periodo">Período Reportado *</label>
            <input
              type="month"
              id="periodo"
              name="periodo"
              value={formData.periodo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipoReporte">Tipo de Reporte *</label>
            <select
              id="tipoReporte"
              name="tipoReporte"
              value={formData.tipoReporte}
              onChange={handleChange}
              required
            >
              <option value="mensual">Mensual</option>
              <option value="trimestral">Trimestral</option>
              <option value="semestral">Semestral</option>
              <option value="anual">Anual</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fechaGeneracion">Fecha de Generación</label>
            <input
              type="date"
              id="fechaGeneracion"
              name="fechaGeneracion"
              value={formData.fechaGeneracion}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>

        <div className="data-section">
          <h4>Datos del Período</h4>
          <div className="data-grid">
            <div className="data-item">
              <label>Total de Niños</label>
              <input
                type="number"
                name="datos.totalNinios"
                value={formData.datos.totalNinios}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="data-item">
              <label>Nuevos Ingresos</label>
              <input
                type="number"
                name="datos.nuevosIngresos"
                value={formData.datos.nuevosIngresos}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="data-item">
              <label>Egresos</label>
              <input
                type="number"
                name="datos.egresos"
                value={formData.datos.egresos}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="data-item">
              <label>Proyectos Activos</label>
              <input
                type="number"
                name="datos.proyectosActivos"
                value={formData.datos.proyectosActivos}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="data-item">
              <label>Eventos Realizados</label>
              <input
                type="number"
                name="datos.eventosRealizados"
                value={formData.datos.eventosRealizados}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="observaciones">Observaciones y Comentarios</label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows="5"
            placeholder="Incluya cualquier información relevante, logros, desafíos, etc..."
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/sedepos')} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            <Save size={20} />
            Generar Reporte
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSedeposPage;