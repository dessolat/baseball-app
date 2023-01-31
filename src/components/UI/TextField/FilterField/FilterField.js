import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import cl from './FilterField.module.scss';

const FilterField = ({ mobile = false, handleChange, ...props }) => {
  const [tempFilter, setTempFilter] = useState('');

  const filterTimeoutRef = useRef();

  const handleFilterFieldChange = e => {
    const value = e.target.value;
    setTempFilter(value);
    clearTimeout(filterTimeoutRef.current);

    filterTimeoutRef.current = setTimeout(() => {
			console.log(123);
      // handleChange()
    }, 400);
  };

  const inputClasses = classNames(cl.filterField, {
    [cl.mobile]: mobile
  });
  return (
    <input className={inputClasses} value={tempFilter} onChange={handleFilterFieldChange} {...props}></input>
  );
};

export default FilterField;
