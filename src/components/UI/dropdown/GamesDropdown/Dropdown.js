import ArrowDown from 'components/UI/icons/ArrowDown';
import React, { useState, useEffect, useRef } from 'react';
import { getShortName } from 'utils';
import cl from './Dropdown.module.scss';

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

const SearchField = ({ value, setValue }) => {
  const handleSearchFieldChange = e => {
    setValue(e.target.value);
  };
  return (
    <input
      className={cl.searchField}
      value={value}
      placeholder='Team name'
      onChange={handleSearchFieldChange}
    />
  );
};

const Dropdown = ({
  title,
  options,
  currentOption,
  handleClick,
  wrapperStyles = null,
  listStyles = null,
  itemStyles = null,
  titleStyles = null,
  shortNames = false,
  searchField = false
}) => {
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  // eslint-disable-next-line
  useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsOpen));

  const handleTitleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = option => () => {
    handleClick(option);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className={cl.dropdownWrapper} style={wrapperStyles}>
      <div className={cl.title} onClick={handleTitleClick} style={titleStyles}>
        {title}
        <div style={{ position: 'absolute', right: 3, top: 0 }}>
          <ArrowDown />
        </div>
      </div>
      {isOpen && (
        <ul className={cl.list} style={listStyles}>
          {options.map((option, i) => (
            <li
              key={i}
              onClick={handleOptionClick(option)}
              className={currentOption === option ? cl.active : null}
              style={itemStyles}>
              <span>{shortNames ? getShortName(option, shortNames) : option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
