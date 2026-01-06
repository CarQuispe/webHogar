/**
 * Table Component - Sistema del Hogar de Niños
 * Tabla optimizada con sistema de diseño
 */
// src/components/ui/Table/Table.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils/helpers';

const Table = ({
  columns,
  data,
  loading = false,
  emptyMessage = 'No hay datos disponibles',
  onRowClick,
  rowClassName,
  striped = true,
  hoverable = true,
  compact = false,
  className,
  ...props
}) => {
  const handleRowClick = (row) => {
    if (onRowClick && !loading) {
      onRowClick(row);
    }
  };

  const getEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        Sin datos
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        {emptyMessage}
      </p>
    </div>
  );

  const getLoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="spinner mb-4" style={{ width: '40px', height: '40px' }}></div>
      <p className="text-gray-600 dark:text-gray-400 font-medium">
        Cargando datos...
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className={classNames('table-container rounded-xl overflow-hidden', className)}>
        {getLoadingState()}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={classNames('table-container rounded-xl overflow-hidden', className)}>
        {getEmptyState()}
      </div>
    );
  }

  return (
    <div 
      className={classNames(
        'table-container rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700',
        compact ? 'text-sm' : 'text-base',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table 
          className={classNames(
            'table w-full',
            compact ? '' : 'divide-y divide-gray-200 dark:divide-gray-700'
          )}
          {...props}
        >
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={classNames(
                    'px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider',
                    column.align === 'right' ? 'text-right' :
                    column.align === 'center' ? 'text-center' : 'text-left'
                  )}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className={classNames(
                  'transition-colors duration-200',
                  striped && rowIndex % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/30' : '',
                  hoverable && onRowClick ? 'hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer' : '',
                  rowClassName && rowClassName(row)
                )}
                onClick={() => handleRowClick(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={classNames(
                      'px-6 py-4 whitespace-nowrap',
                      column.align === 'right' ? 'text-right' :
                      column.align === 'center' ? 'text-center' : 'text-left',
                      compact ? 'py-2' : 'py-4'
                    )}
                  >
                    <div className={classNames(
                      'text-gray-900 dark:text-gray-100',
                      compact ? 'text-sm' : 'text-base'
                    )}>
                      {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      render: PropTypes.func,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      align: PropTypes.oneOf(['left', 'center', 'right']),
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.func,
  striped: PropTypes.bool,
  hoverable: PropTypes.bool,
  compact: PropTypes.bool,
  className: PropTypes.string,
};

export default Table;