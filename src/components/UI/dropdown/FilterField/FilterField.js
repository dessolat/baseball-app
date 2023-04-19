import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import cl from './FilterField.module.scss';
import { getShortName } from 'utils';

function listenForOutsideClicks(listening, setListening, menuRef, setIsOpen) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach(type => {
      document.addEventListener(type, evt => {
        if (menuRef.current?.contains(evt.target)) return;
        setIsOpen(false);
      });
    });
  };
}

const FilterField = ({
  mobile = false,
  handleChange,
  handleClick,
  wrapperStyles = null,
  listStyles = null,
  itemStyles = null,
  itemTextStyles = null,
  shortNames = false,
  listValues = [],
  isAllOption = false,
  ...props
}) => {
  const [tempFilter, setTempFilter] = useState('');
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const filterTimeoutRef = useRef();
  const menuRef = useRef(null);

  useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsOpen));

  const handleFilterFieldChange = e => {
    const value = e.target.value;
    setTempFilter(value);
		setIsOpen(true)
    clearTimeout(filterTimeoutRef.current);

    filterTimeoutRef.current = setTimeout(() => {
      handleChange(value);
    }, 400);
  };

  const handleInputClick = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = option => () => {
    option = option !== 'All' ? option : '';

    handleClick(option);
    setIsOpen(false);
    setTempFilter(option);
  };

  const inputClasses = classNames(cl.filterField, {
    [cl.mobile]: mobile
  });

	const loweredTempFilter = tempFilter.toLowerCase()

  let modifiedValues = listValues.filter(value => value.toLowerCase().includes(loweredTempFilter));
  modifiedValues = isAllOption ? ['All', ...modifiedValues] : modifiedValues;
  return (
    <div ref={menuRef} className={cl.dropdownWrapper} style={wrapperStyles}>
      <input
        className={inputClasses}
        value={tempFilter}
        onChange={handleFilterFieldChange}
        onClick={handleInputClick}
        {...props}
      />
      {isOpen && (
        <ul className={cl.list} style={listStyles}>
          {modifiedValues.map((option, i) => (
            <li key={i} onClick={handleOptionClick(option)} style={itemStyles}>
              <span style={itemTextStyles}>{shortNames ? getShortName(option, shortNames) : option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterField;
