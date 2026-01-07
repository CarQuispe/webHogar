/**
 * Button Component - Sistema del Hogar de Niños
 * Componente de botón optimizado con sistema de diseño
 */
// src/components/ui/Button/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils/helpers';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    const variants = {
      primary: 'btn-primary animate-fade-in hover-lift',
      secondary: 'btn-secondary animate-fade-in hover-lift',
      accent: 'btn-accent animate-fade-in hover-lift',
      outline: 'btn-outline animate-fade-in hover-lift',
      ghost: 'btn-ghost animate-fade-in',
      danger: 'btn-danger animate-fade-in hover-lift'
    };
    return variants[variant] || variants.primary;
  };

  const getSizeClass = () => {
    const sizes = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2.5 text-base',
      large: 'px-6 py-3.5 text-lg'
    };
    return sizes[size] || sizes.medium;
  };

  const buttonClasses = classNames(
    'rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2',
    getVariantClass(),
    getSizeClass(),
    fullWidth ? 'w-full' : '',
    loading ? 'relative text-transparent' : '',
    className
  );

  const getVariantFocus = () => {
    const focusColors = {
      primary: 'focus:ring-primary-blue focus:ring-offset-white',
      secondary: 'focus:ring-secondary-green focus:ring-offset-white',
      accent: 'focus:ring-accent-orange focus:ring-offset-white',
      outline: 'focus:ring-primary-blue focus:ring-offset-white',
      ghost: 'focus:ring-gray-300 focus:ring-offset-white',
      danger: 'focus:ring-red-500 focus:ring-offset-white'
    };
    return focusColors[variant] || focusColors.primary;
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${buttonClasses} ${getVariantFocus()}`}
      style={{
        '--transition-fast': '150ms',
        '--transition-normal': '250ms',
      }}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="spinner" style={{ 
            width: size === 'small' ? '14px' : size === 'large' ? '22px' : '18px',
            height: size === 'small' ? '14px' : size === 'large' ? '22px' : '18px'
          }}></div>
        </div>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0" style={{ fontSize: '1.2em' }}>
          {icon}
        </span>
      )}
      
      <span className={loading ? 'invisible' : ''}>
        {children}
      </span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0" style={{ fontSize: '1.2em' }}>
          {icon}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

// Estilos CSS para variante danger (agregar en tu theme.css)
// .btn-danger {
//   background-color: var(--error);
//   color: white;
//   border: none;
// }
// .btn-danger:hover {
//   background-color: #DC2626;
//   box-shadow: var(--shadow-md);
//   transform: translateY(-1px);
// }

export default Button;
