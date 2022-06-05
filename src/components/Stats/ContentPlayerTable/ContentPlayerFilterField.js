import React, { useState, useRef } from 'react';
import cl from './ContentPlayerFilterField.module.scss';

const ContentPlayerFilterField = ({setPlayerFilter}) => {
  const [tempPlayerFilter, setTempPlayerFilter] = useState('mir');

	const filterTimeoutRef = useRef();

	const handleFilterFieldChange = e => {
		const value = e.target.value;
		setTempPlayerFilter(value)
    clearTimeout(filterTimeoutRef.current);

    filterTimeoutRef.current = setTimeout(() => {
      setPlayerFilter(value);
    }, 1000);
  };
  return (
    <input className={cl.filterField} value={tempPlayerFilter} onChange={handleFilterFieldChange}></input>
  );
};

export default ContentPlayerFilterField;
