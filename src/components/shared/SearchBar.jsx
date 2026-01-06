import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar = ({
  placeholder = 'Buscar...',
  onSearch,
  delay = 300,
  value: controlledValue,
  onChange: controlledOnChange,
  className,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const onChange = controlledOnChange || setInternalValue;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch && value.trim()) {
        onSearch(value.trim());
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, onSearch]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className={`${styles.searchBar} ${isFocused ? styles.focused : ''} ${className}`}>
      <Search className={styles.searchIcon} size={20} />
      
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
      
      {value && (
        <button 
          className={styles.clearButton}
          onClick={handleClear}
          type="button"
          aria-label="Limpiar búsqueda"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;