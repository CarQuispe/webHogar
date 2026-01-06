import React from 'react';
import { AlertCircle } from 'lucide-react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ 
  message, 
  title = 'Error', 
  onRetry, 
  showIcon = true,
  variant = 'error' 
}) => {
  return (
    <div className={`${styles.errorContainer} ${styles[variant]}`}>
      {showIcon && (
        <div className={styles.icon}>
          <AlertCircle size={24} />
        </div>
      )}
      
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <p className={styles.message}>{message}</p>
        
        {onRetry && (
          <button 
            className={styles.retryButton}
            onClick={onRetry}
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;