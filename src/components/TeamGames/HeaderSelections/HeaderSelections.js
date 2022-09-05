import React from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentYear, setCurrentDate } from 'redux/sharedReducer';
import { setCurrentLeague } from 'redux/gamesReducer';
import HeaderSelectionsTeamInfo from './HeaderSelectionsTeamInfo';

const YEARS = [2022, 2021, 2020];

const HeaderSelections = () => {
  const currentYear = useSelector(state => state.shared.currentYear);
  const dispatch = useDispatch();

  const handleClick = option => {
    const tempDate = new Date(option, 0, 1);
    tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
    dispatch(setCurrentLeague({ id: -1, title: 'All' }));
  };
  return (
    <div className={cl.selections}>
      <HeaderSelectionsTeamInfo cl={cl} />
      <div className={cl.years}>
        <Dropdown title={currentYear} options={YEARS} currentOption={currentYear} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default HeaderSelections;
