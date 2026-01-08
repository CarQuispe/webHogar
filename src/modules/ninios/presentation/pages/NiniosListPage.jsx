// src/modules/ninios/presentation/pages/NiniosListPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  UserPlus, 
  Users, 
  UserCheck, 
  UserX,
  Calendar,
  Download,
  RefreshCw,
  AlertCircle,
  Filter,
  FileSpreadsheet,
  FileUp
} from 'lucide-react';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { GetNiniosService } from '../../application/get-ninios.service.js';
import { ApiNiniosRepository } from '../../infrastructure/api.ninios.repository.js';
import { NinioTable } from '../components/NinioTable.jsx';
import Card from '@components/ui/Card/Card';
import Button from '@components/ui/Button/Button';

export const NiniosListPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [ninios, setNinios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    estado: '',
    sexo: '',
    nacionalidad: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    enTransicion: 0,
    egresados: 0
  });

  const loadNinios = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Cargando niños con filtros:', { ...filters, searchTerm });
      
      const repository = new ApiNiniosRepository();
      const getNiniosService = new GetNiniosService(repository);
      
      // Aplicar búsqueda si existe
      const filtersToSend = { ...filters };
      if (searchTerm) {
        filtersToSend.search = searchTerm;
      }
      
      const result = await getNiniosService.execute(filtersToSend);
      setNinios(result);
      
      // Calcular estadísticas
      const total = result.length;
      const activos = result.filter(n => n.estado === 'activo').length;
      const enTransicion = result.filter(n => n.estado === 'en_transicion' || n.estado === 'en transicion').length;
      const egresados = result.filter(n => n.estado === 'egresado').length;
      
      setStats({ total, activos, enTransicion, egresados });
      
      console.log(`✅ Cargados ${total} niños`);
    } catch (err) {
      console.error('❌ Error cargando niños:', err);
      setError('No se pudo cargar la lista de niños. Intenta nuevamente.');
      setNinios([]);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    loadNinios();
  }, [loadNinios]);

  /* =====================================================
     EXPORTAR PDF
  ===================================================== */
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Título
      doc.setFontSize(20);
      doc.setTextColor(33, 37, 41);
      doc.text('Listado de Residentes - Hogar de Niños', 14, 20);
      
      // Información del reporte
      doc.setFontSize(10);
      doc.setTextColor(108, 117, 125);
      doc.text(`Generado el: ${new Date().toLocaleDateString('es-ES')} ${new Date().toLocaleTimeString('es-ES')}`, 14, 30);
      doc.text(`Total de registros: ${ninios.length}`, 14, 36);
      
      // Datos de la tabla
      const tableData = ninios.map((n, index) => ([
        index + 1,
        `${n.nombre || ''} ${n.apellido || ''}`.trim(),
        n.edad || 'N/A',
        n.sexo === 'masculino' ? 'M' : (n.sexo === 'femenino' ? 'F' : 'NS'),
        n.estado ? n.estado.charAt(0).toUpperCase() + n.estado.slice(1) : 'N/A',
        n.nacionalidad || 'N/A'
      ]));

      doc.autoTable({
        head: [['#', 'Nombre Completo', 'Edad', 'Sexo', 'Estado', 'Nacionalidad']],
        body: tableData,
        startY: 45,
        theme: 'striped',
        headStyles: {
          fillColor: [52, 152, 219],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        margin: { top: 45 },
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: 'linebreak'
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 50 },
          2: { cellWidth: 20 },
          3: { cellWidth: 20 },
          4: { cellWidth: 30 },
          5: { cellWidth: 40 }
        }
      });

      // Pie de página
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(108, 117, 125);
        doc.text(
          `Página ${i} de ${pageCount} • Sistema de Gestión de Hogar de Niños`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }

      doc.save(`residentes_hogar_ninios_${new Date().toISOString().split('T')[0]}.pdf`);
      console.log('📄 PDF exportado exitosamente');
    } catch (err) {
      console.error('❌ Error al exportar PDF:', err);
      setError('Error al generar el archivo PDF');
    }
  };

  /* =====================================================
     EXPORTAR EXCEL
  ===================================================== */
  const exportToExcel = () => {
    try {
      // Preparar datos para Excel
      const excelData = ninios.map(n => ({
        'Nombre': n.nombre || '',
        'Apellido': n.apellido || '',
        'Nombre Completo': `${n.nombre || ''} ${n.apellido || ''}`.trim(),
        'Edad': n.edad || '',
        'Sexo': n.sexo ? (n.sexo === 'masculino' ? 'Masculino' : 
                         n.sexo === 'femenino' ? 'Femenino' : 'No especificado') : '',
        'Estado': n.estado ? n.estado.charAt(0).toUpperCase() + n.estado.slice(1) : '',
        'Nacionalidad': n.nacionalidad || '',
        'Fecha de Nacimiento': n.fechaNacimiento || '',
        'Documento Identidad': n.documentoIdentidad || '',
        'Fecha Ingreso': n.fechaIngreso || '',
        'Observaciones': n.observaciones || ''
      }));

      // Crear hoja de trabajo
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      
      // Ajustar anchos de columnas
      const colWidths = [
        { wch: 20 }, // Nombre
        { wch: 20 }, // Apellido
        { wch: 25 }, // Nombre Completo
        { wch: 10 }, // Edad
        { wch: 15 }, // Sexo
        { wch: 15 }, // Estado
        { wch: 20 }, // Nacionalidad
        { wch: 15 }, // Fecha Nacimiento
        { wch: 20 }, // Documento
        { wch: 15 }, // Fecha Ingreso
        { wch: 40 }  // Observaciones
      ];
      worksheet['!cols'] = colWidths;

      // Crear libro de trabajo
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Residentes');

      // Agregar hoja de estadísticas
      const statsSheet = XLSX.utils.aoa_to_sheet([
        ['ESTADÍSTICAS - HOGAR DE NIÑOS'],
        [''],
        ['Fecha de generación:', new Date().toLocaleString('es-ES')],
        [''],
        ['TOTAL RESIDENTES:', stats.total],
        ['Activos:', stats.activos],
        ['En Transición:', stats.enTransicion],
        ['Egresados:', stats.egresados],
        [''],
        ['Distribución por Sexo:'],
        ['Masculino:', ninios.filter(n => n.sexo === 'masculino').length],
        ['Femenino:', ninios.filter(n => n.sexo === 'femenino').length],
        ['No especificado:', ninios.filter(n => !n.sexo || n.sexo === 'no especificado').length]
      ]);
      XLSX.utils.book_append_sheet(workbook, statsSheet, 'Estadísticas');

      // Generar archivo
      const excelBuffer = XLSX.write(workbook, { 
        bookType: 'xlsx', 
        type: 'array',
        bookSST: false
      });
      
      const blob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      saveAs(blob, `residentes_hogar_ninios_${new Date().toISOString().split('T')[0]}.xlsx`);
      console.log('📊 Excel exportado exitosamente');
    } catch (err) {
      console.error('❌ Error al exportar Excel:', err);
      setError('Error al generar el archivo Excel');
    }
  };

  /* =====================================================
     IMPORTAR EXCEL
  ===================================================== */
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];
    
    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/)) {
      setError('Formato de archivo no válido. Use .xlsx, .xls o .csv');
      return;
    }

    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setLoading(true);
    
    const reader = new FileReader();
    
    reader.onload = (evt) => {
      try {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const importedData = XLSX.utils.sheet_to_json(firstSheet);

        console.log('📥 Datos importados del Excel:', importedData);

        // Validar estructura básica
        if (importedData.length === 0) {
          setError('El archivo está vacío o no contiene datos válidos');
          setLoading(false);
          return;
        }

        // Mapear columnas (ajusta según tu estructura)
        const mappedData = importedData.map((row, index) => ({
          id: `imported-${index + 1}`,
          nombre: row.Nombre || row.nombre || '',
          apellido: row.Apellido || row.apellido || '',
          edad: row.Edad || row.edad,
          sexo: (row.Sexo || row.sexo || '').toLowerCase(),
          estado: (row.Estado || row.estado || 'activo').toLowerCase(),
          nacionalidad: row.Nacionalidad || row.nacionalidad || '',
          documentoIdentidad: row['Documento Identidad'] || row.documentoIdentidad || '',
          fechaNacimiento: row['Fecha de Nacimiento'] || row.fechaNacimiento,
          fechaIngreso: row['Fecha Ingreso'] || row.fechaIngreso || new Date().toISOString().split('T')[0],
          observaciones: row.Observaciones || row.observaciones || 'Importado desde Excel'
        }));

        console.log('✅ Datos mapeados para importar:', mappedData);

        // Aquí deberías implementar el envío al backend
        // Ejemplo: await importNiniosService.execute(mappedData);

        // Por ahora, mostramos un mensaje de éxito
        alert(`✅ Se importaron ${mappedData.length} registros exitosamente.\n\nNota: Esta es una vista previa. Para guardar los datos, implementa la conexión con el backend.`);
        
        // Actualizar la lista
        loadNinios();

      } catch (err) {
        console.error('❌ Error procesando archivo:', err);
        setError('Error al procesar el archivo. Verifique el formato.');
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error al leer el archivo');
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  /* =====================================================
     HANDLERS DE EXPORTACIÓN/IMPORTACIÓN
  ===================================================== */
  const handleExport = () => {
    if (ninios.length === 0) {
      setError('No hay datos para exportar');
      return;
    }

    // Exportar ambos formatos
    exportToPDF();
    setTimeout(exportToExcel, 500); // Pequeño delay para evitar conflictos
  };

  const handleImport = () => {
    fileInputRef.current.click();
  };

  /* =====================================================
     HANDLERS EXISTENTES
  ===================================================== */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      estado: '',
      sexo: '',
      nacionalidad: ''
    });
    setSearchTerm('');
  };

  const handleCreateNinio = () => {
    navigate('/ninios/create');
  };

  const handleDeleteNinio = async (id) => {
    try {
      console.log(`🗑️ Eliminando niño con ID: ${id}`);
      await loadNinios();
    } catch (error) {
      console.error('Error eliminando niño:', error);
      setError('Error al eliminar el niño');
    }
  };

  // Estado de carga inicial
  if (loading && ninios.length === 0) {
    return (
      <div className="min-h-screen bg-secondary animate-fade-in">
        <div className="container mx-auto py-12">
          <Card className="animate-pulse" padding="large">
            <div className="text-center">
              <div className="spinner mx-auto mb-6" style={{ width: '48px', height: '48px' }}></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Cargando información...
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

  return (
    <div className="min-h-screen bg-secondary animate-fade-in">
      {/* Input oculto para importar archivos */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx,.xls,.csv"
        hidden
        onChange={handleImportFile}
      />

      <div className="container mx-auto py-8">
        {/* Header Principal */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Gestión de Residentes
              </h1>
              <p className="text-gray-600 mt-1">
                Administra los niños y adolescentes del hogar
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="medium"
                onClick={handleExport}
                icon={<Download className="w-4 h-4" />}
                disabled={ninios.length === 0}
              >
                Exportar (PDF/Excel)
              </Button>
              <Button
                variant="outline"
                size="medium"
                onClick={handleImport}
                icon={<FileUp className="w-4 h-4" />}
              >
                Importar desde Excel
              </Button>
              <Button
                variant="primary"
                size="medium"
                onClick={handleCreateNinio}
                icon={<UserPlus className="w-4 h-4" />}
              >
                Nuevo Residente
              </Button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="hover-lift" padding="medium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Residentes</p>
                  <p className="text-2xl font-bold text-primary-blue mt-2">{stats.total}</p>
                </div>
                <div className="p-2 bg-primary-blue/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary-blue" />
                </div>
              </div>
            </Card>

            <Card className="hover-lift" padding="medium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Activos</p>
                  <p className="text-2xl font-bold text-secondary-green mt-2">{stats.activos}</p>
                </div>
                <div className="p-2 bg-secondary-green/10 rounded-lg">
                  <UserCheck className="w-6 h-6 text-secondary-green" />
                </div>
              </div>
            </Card>

            <Card className="hover-lift" padding="medium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Transición</p>
                  <p className="text-2xl font-bold text-warning mt-2">{stats.enTransicion}</p>
                </div>
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
              </div>
            </Card>

            <Card className="hover-lift" padding="medium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Egresados</p>
                  <p className="text-2xl font-bold text-error mt-2">{stats.egresados}</p>
                </div>
                <div className="p-2 bg-error/10 rounded-lg">
                  <UserX className="w-6 h-6 text-error" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Panel de Filtros y Búsqueda */}
        <Card 
          title="Búsqueda y Filtros"
          subtitle="Encuentra residentes específicos"
          padding="large"
          className="mb-6"
        >
          <div className="space-y-4">
            {/* Barra de Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, apellido o CI..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="input-primary pl-10"
              />
            </div>

            {/* Filtros en Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Estado
                </label>
                <select
                  value={filters.estado}
                  onChange={(e) => handleFilterChange('estado', e.target.value)}
                  className="input-primary"
                >
                  <option value="">Todos los estados</option>
                  <option value="activo">Activo</option>
                  <option value="en_transicion">En Transición</option>
                  <option value="egresado">Egresado</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Sexo
                </label>
                <select
                  value={filters.sexo}
                  onChange={(e) => handleFilterChange('sexo', e.target.value)}
                  className="input-primary"
                >
                  <option value="">Todos</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="no especificado">No especificado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Nacionalidad
                </label>
                <input
                  type="text"
                  placeholder="Ej: Boliviana"
                  value={filters.nacionalidad}
                  onChange={(e) => handleFilterChange('nacionalidad', e.target.value)}
                  className="input-primary"
                />
              </div>
            </div>

            {/* Acciones de Filtros */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {ninios.length === 0 ? 'No hay resultados' : `Mostrando ${ninios.length} residente${ninios.length !== 1 ? 's' : ''}`}
              </div>
              <div className="flex gap-3">
                {(filters.estado || filters.sexo || filters.nacionalidad || searchTerm) && (
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={clearFilters}
                  >
                    Limpiar filtros
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="small"
                  onClick={loadNinios}
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Actualizar
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Contenido Principal - Tabla */}
        {error ? (
          <Card 
            className="animate-slide-down"
            padding="large"
          >
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error al cargar los datos
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Recargar página
                </Button>
                <Button
                  variant="primary"
                  onClick={loadNinios}
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Intentar nuevamente
                </Button>
              </div>
            </div>
          </Card>
        ) : ninios.length === 0 ? (
          <Card 
            className="animate-slide-down"
            padding="large"
          >
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay residentes registrados
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Comienza registrando el primer residente en el hogar infantil. 
                Todos los datos se almacenarán de forma segura en el sistema.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleCreateNinio}
                  icon={<UserPlus className="w-4 h-4" />}
                >
                  Registrar Primer Residente
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  onClick={handleImport}
                  icon={<FileSpreadsheet className="w-4 h-4" />}
                >
                  Importar desde Excel
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Puedes importar datos existentes o comenzar desde cero
              </p>
            </div>
          </Card>
        ) : (
          <Card 
            title="Lista de Residentes"
            subtitle={`${ninios.length} residente${ninios.length !== 1 ? 's' : ''} en el sistema`}
            padding="none"
            shadow="lg"
            className="overflow-hidden"
          >
            <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Haz clic en cualquier fila para ver más detalles
                </div>
                <div className="text-sm text-gray-600">
                  Última actualización: {new Date().toLocaleTimeString('es-ES')}
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <NinioTable 
                ninios={ninios}
                onDelete={handleDeleteNinio}
                loading={loading}
              />
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Mostrando <span className="font-medium">{ninios.length}</span> de <span className="font-medium">{stats.total}</span> residentes
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={handleExport}
                    icon={<Download className="w-3 h-3" />}
                    disabled={ninios.length === 0}
                  >
                    Exportar lista
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={loadNinios}
                    icon={<RefreshCw className="w-3 h-3" />}
                  >
                    Actualizar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Pie de Página Informativo */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Sistema Seguro del Hogar de Niños • {new Date().getFullYear()}</span>
            <span className="px-2">•</span>
            <span>Total registros: {stats.total}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Exporta datos en PDF/Excel • Importa desde Excel • Todos los datos están protegidos
          </p>
        </div>
      </div>
    </div>
  );
};

export default NiniosListPage;