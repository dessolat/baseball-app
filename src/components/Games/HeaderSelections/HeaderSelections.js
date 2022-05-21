import React from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentYear, setCurrentDate, setCurrentGameType } from 'redux/sharedReducer';

const YEARS = [2022, 2021, 2020];

const HeaderSelections = () => {
  const currentYear = useSelector(state => state.shared.currentYear);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const dispatch = useDispatch();

  const handleClick = option => {
    // const tempDate = new Date(option, 0, 1);
    // tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(new Date()));
    // dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
  };

  const getClassName = name => (name === currentGameType ? cl.active : '');

  const handleTypeClick = type => () => dispatch(setCurrentGameType(type));

  return (
    <div className={cl.selections}>
      <div className={cl.years}>
        <Dropdown title={currentYear} options={YEARS} currentOption={currentYear} handleClick={handleClick} />
      </div>
      <ul className={cl.types}>
        <li className={getClassName('Baseball')} onClick={handleTypeClick('Baseball')}>
          Baseball
        </li>
        <li className={getClassName('Softball')} onClick={handleTypeClick('Softball')}>
          Softball
        </li>
      </ul>
    </div>
  );
};

export default HeaderSelections;
