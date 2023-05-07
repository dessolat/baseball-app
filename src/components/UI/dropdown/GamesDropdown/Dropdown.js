import ArrowDown from 'components/UI/icons/ArrowDown';
import React, { useState, useEffect, useRef } from 'react';
import { getShortName } from 'utils';
import cl from './Dropdown.module.scss';
import classNames from 'classnames';
import useComponentVisible from 'hooks/useComponentVisible';
import CrossClose from 'components/UI/buttons/CrossClose/CrossClose';

// function listenForOutsideClicks(listening, setListening, menuRef, setIsOpen, setSearchFieldValue) {
//   return () => {
//     if (listening) return;
//     if (!menuRef.current) return;
//     setListening(true);
//     [`click`, `touchstart`].forEach(type => {
//       document.addEventListener(type, evt => {
//         if (menuRef.current?.contains(evt.target)) return;
//         setIsOpen(false);
//         setSearchFieldValue('');
//       });
//     });
//   };
// }

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
  itemTextStyles = null,
  titleStyles = null,
	listWrapperStyles = null,
  shortNames = false,
  searchField = false,
  disabled = false
}) => {
  // const [listening, setListening] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [searchFieldValue, setSearchFieldValue] = useState('');

  // const menuRef = useRef(null);
  // eslint-disable-next-line
  // useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsOpen, setSearchFieldValue));
  const {
    ref: menuRef,
    isComponentVisible: isOpen,
    setIsComponentVisible: setIsOpen
  } = useComponentVisible(false, setSearchFieldValue);

  const handleTitleClick = () => {
    if (disabled) return;

    setIsOpen(!isOpen);
  };

  const handleOptionClick = option => () => {
    handleClick(option);
    setIsOpen(false);
  };

  const handleCrossClick = () => {
    setIsOpen(false);
  };

  const getFilteredOptions = options => {
    const filterArr = searchFieldValue.split(' ');

    return options.filter(option => {
      return filterArr.reduce((sum, word) => {
        if (
          !option
            .split(' ')
            .find(optionWord => optionWord.slice(0, word.length).toLowerCase() === word.toLowerCase())
        ) {
          sum = false;
        }
        return sum;
      }, true);
    });
  };

  const titleClasses = classNames(cl.title, {
    [cl.disabled]: disabled
  });

  const filteredOptions = searchFieldValue === '' ? options : getFilteredOptions(options);
  return (
    <div ref={menuRef} className={cl.dropdownWrapper} style={wrapperStyles}>
      <div className={titleClasses} onClick={handleTitleClick} style={titleStyles} disabled={true}>
        {title}
        <div style={{ position: 'absolute', right: 3, top: 0 }}>
          <ArrowDown />
        </div>
      </div>
      {isOpen && (
        <div className={cl.listWrapper} style={listWrapperStyles}>
          <ul className={cl.list} style={listStyles}>
            {searchField && (
              <li className={cl.searchFieldWrapper}>
                <SearchField value={searchFieldValue} setValue={setSearchFieldValue} />
              </li>
            )}
            {filteredOptions.map((option, i) => (
              <li
                key={i}
                onClick={handleOptionClick(option)}
                className={currentOption === option ? cl.active : null}
                style={itemStyles}>
                <span style={itemTextStyles}>{shortNames ? getShortName(option, shortNames) : option}</span>
              </li>
            ))}
          </ul>
          <CrossClose
            handleCrossClick={handleCrossClick}
            addedClass={cl.desktopDNone}
            style={{ left: 10, top: 10 }}
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
