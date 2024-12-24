import ArrowDown from 'components/UI/icons/ArrowDown';
import React, { useState } from 'react';
// import { getShortName } from 'utils';
import cl from './Dropdown.module.scss';
import classNames from 'classnames';
import useComponentVisible from 'hooks/useComponentVisible';
import CrossClose from 'components/UI/buttons/CrossClose/CrossClose';
import Checkmark from 'components/UI/checkboxes/CheckMark/Checkmark';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCustomLeagues } from 'redux/statsReducer';

// const SearchField = ({ value, setValue }) => {
//   const handleSearchFieldChange = e => {
//     setValue(e.target.value);
//   };
//   return (
//     <input
//       className={cl.searchField}
//       value={value}
//       placeholder='Team name'
//       onChange={handleSearchFieldChange}
//     />
//   );
// };

const Dropdown = ({
  title,
  options,
  currentOptions,
  handleOkBtn,
  wrapperStyles = null,
  listWrapperClass = null,
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

  const currentCustomLeagues = useSelector(state => state.stats.currentCustomLeagues);
  const dispatch = useDispatch();

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
    const isLeague = currentCustomLeagues.find(prevOption => prevOption === option.id);

    let newLeagues = [...currentCustomLeagues];

    if (!isLeague) newLeagues.push(option.id);
    if (isLeague) newLeagues = newLeagues.filter(prevOption => prevOption !== option.id);

		console.log(newLeagues)

		dispatch(setCurrentCustomLeagues(newLeagues))
    
    // handleClick(option);
    // setIsOpen(false);
  };

	const handleOkBtnClick = () => {
		handleOkBtn?.();
		setIsOpen(false)
	}

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

  console.log(currentCustomLeagues);
  return (
    <div ref={menuRef} className={cl.dropdownWrapper} style={wrapperStyles}>
      <div className={titleClasses} onClick={handleTitleClick} style={titleStyles} disabled={true}>
        {title}
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <ArrowDown />
        </div>
      </div>
      {isOpen && (
        <div className={cl.listWrapper + ' ' + listWrapperClass} style={listWrapperStyles}>
          <ul className={cl.list} style={listStyles}>
            {/* {searchField && (
              <li className={cl.searchFieldWrapper}>
                <SearchField value={searchFieldValue} setValue={setSearchFieldValue} />
              </li>
            )} */}
            {filteredOptions.map((option, i) => {
              return (
                <li key={i} onClick={handleOptionClick(option)} className={cl.listItem} style={itemStyles}>
                  <Checkmark isActive={currentCustomLeagues.includes(option.id)} />
                  <p>{option.title}</p>
                  {/* <span style={itemTextStyles}>{shortNames ? getShortName(option, shortNames) : option}</span> */}
                </li>
              );
            })}
          </ul>
          <div className={cl.btnWrapper}>
            <button className={cl.okBtn} onClick={handleOkBtnClick}>Ok</button>
          </div>
          <CrossClose
            handleCrossClick={handleCrossClick}
            addedClass={cl.desktopDNone}
            style={{ left: 0, top: 0, padding: '10px', backgroundColor: 'white' }}
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
