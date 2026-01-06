// src/components/ui/Input/Input.jsx
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';
import { classNames } from '../../../utils/helpers';

const Input = forwardRef(({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  fullWidth = true,
  size = 'medium',
  className,
  ...props
}, ref) => {
  const inputClasses = classNames(
    styles.input,
    styles[size],
    {
      [styles.error]: error,
      [styles.withStartIcon]: startIcon,
      [styles.withEndIcon]: endIcon,
      [styles.fullWidth]: fullWidth,
    },
    className
  );

  const wrapperClasses = classNames(styles.wrapper, {
    [styles.fullWidth]: fullWidth,
  });

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className={styles.label}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputContainer}>
        {startIcon && <div className={styles.startIcon}>{startIcon}</div>}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
      </div>
      
      {(error || helperText) && (
        <div className={classNames(styles.feedback, { [styles.error]: error })}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  required: PropTypes.bool,
};

Input.displayName = 'Input';

export default Input;