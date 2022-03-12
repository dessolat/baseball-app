import React from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentYear, setCurrentDate } from 'redux/sharedReducer';
import TeamLogo from 'images/team_logo.png';
import { useParams } from 'react-router-dom';
import { getShortName } from 'utils';

const YEARS = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

const HeaderSelections = () => {
  const { teamName } = useParams();

  const currentYear = useSelector(state => state.shared.currentYear);
  const dispatch = useDispatch();

  const handleClick = option => {
    const tempDate = new Date(option, 0, 1);
    tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
  };
  return (
    <div className={cl.selections}>
      <div className={cl.teamInfo}>
        <img src={TeamLogo} alt='' srcset='' />
        <h2 className={cl.teamName}>{getShortName(teamName, 24)}</h2>
      </div>
      <div className={cl.years}>
        <Dropdown title={currentYear} options={YEARS} currentOption={currentYear} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default HeaderSelections;
