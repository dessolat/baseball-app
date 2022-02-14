import React from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentYear } from 'redux/gamesReducer';

const YEARS = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

const HeaderSelections = () => {
  const currentYear = useSelector(state => state.games.currentYear);
  const dispatch = useDispatch();

  const handleClick = option => {
    dispatch(setCurrentYear(option));
  };

  return (
    <div className={cl.selections}>
      <div className={cl.years}>
        <Dropdown title={currentYear} options={YEARS} currentOption={currentYear} handleClick={handleClick}/>
      </div>
      <ul className={cl.types}>
        <li className={cl.active}>Baseball</li>
        <li>Softball</li>
      </ul>
    </div>
  );
};

export default HeaderSelections;
