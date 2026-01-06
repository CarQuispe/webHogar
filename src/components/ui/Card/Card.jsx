/**
 * Card Component - Sistema del Hogar de Niños
 * Tarjeta optimizada con sistema de diseño
 */
// src/components/ui/Card/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils/helpers';

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  padding = 'medium',
  hoverable = false,
  bordered = true,
  shadow = 'medium',
  backgroundColor = 'bg-primary',
  className,
  ...props
}) => {
  const getPaddingClass = () => {
    const paddings = {
      none: 'p-0',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    };
    return paddings[padding] || paddings.medium;
  };

  const getShadowClass = () => {
    const shadows = {
      none: '',
      small: 'shadow-sm',
      medium: 'shadow-md',
      large: 'shadow-lg'
    };
    return shadows[shadow] || shadows.medium;
  };

  const cardClasses = classNames(
    'card rounded-xl transition-all duration-300',
    getPaddingClass(),
    getShadowClass(),
    backgroundColor,
    bordered ? 'border border-gray-200 dark:border-gray-700' : '',
    hoverable ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '',
    className
  );

  const headerClasses = classNames(
    'pb-4 mb-4',
    (title || subtitle) && headerAction ? 'flex items-start justify-between gap-4' : ''
  );

  return (
    <div 
      className={cardClasses}
      style={{
        '--radius-lg': '0.75rem',
        '--transition-normal': '250ms',
      }}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className={headerClasses}>
          <div className="flex-1">
            {title && (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && (
            <div className="flex-shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}
      
      <div className="card-content">
        {children}
      </div>
      
      {footer && (
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerAction: PropTypes.node,
  footer: PropTypes.node,
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  hoverable: PropTypes.bool,
  bordered: PropTypes.bool,
  shadow: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
};

export default Card;