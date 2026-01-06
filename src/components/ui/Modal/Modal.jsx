/**
 * Modal Component - Sistema del Hogar de Niños
 * Modal optimizado con sistema de diseño
 */
// src/components/ui/Modal/Modal.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils/helpers';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const getSizeClass = () => {
    const sizes = {
      small: 'max-w-md',
      medium: 'max-w-lg',
      large: 'max-w-2xl',
      xlarge: 'max-w-4xl'
    };
    return sizes[size] || sizes.medium;
  };

  const modalClasses = classNames(
    'modal-content bg-white dark:bg-gray-800 rounded-2xl shadow-2xl',
    getSizeClass(),
    className
  );

  return (
    <div 
      className="modal-overlay fixed inset-0 z-50 overflow-y-auto"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        animation: 'fadeIn 150ms ease-in-out'
      }}
      onClick={handleOverlayClick}
    >
      <div className="min-h-screen px-4 text-center">
        <div className="inline-block w-full align-middle my-8 text-left">
          <div 
            className={modalClasses}
            style={{
              animation: 'slideInDown 250ms ease-in-out'
            }}
          >
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                {title && (
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    className="btn-ghost p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={onClose}
                    aria-label="Cerrar modal"
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
            
            <div className="p-6">
              {children}
            </div>
            
            {footer && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  closeOnOverlayClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
};

export default Modal;