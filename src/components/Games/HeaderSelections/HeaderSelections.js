import React, { useEffect, useRef } from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentYear, setCurrentDate, setCurrentGameType } from 'redux/sharedReducer';
import { setSearchParam } from 'utils';
import { setCurrentLeague } from 'redux/gamesReducer';
import ContentTableModeLinks from '../ContentTable/ContentTableModeLinks';
import ContentTeam from '../ContentTable/ContentTeam';
import ContentCalendars from '../ContentTable/ContentCalendars';

const YEARS = [2022, 2021, 2020];

const HeaderSelections = () => {
  const currentYear = useSelector(state => state.shared.currentYear);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const games = useSelector(state => state.games.games);

  const dispatch = useDispatch();

  const firstMountRef = useRef(true);

  useEffect(() => {
    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }
    setSearchParam('year', currentYear);
  }, [currentYear]);

  // useEffect(() => {
  // 	if (firstMountRef.current === true) {
  // 		firstMountRef.current = false
  // 		return
  // 	}
  //   setSearchParam('game_type', currentGameType);
  // }, [currentGameType]);

  const handleClick = option => {
    // const tempDate = new Date(option, 0, 1);
    // tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(new Date()));
    // dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
    dispatch(setCurrentLeague({ id: -1, name: 'All' }));
  };

  const getClassName = name => (name === currentGameType ? cl.active : '');

  const handleTypeClick = type => () => {
    dispatch(setCurrentGameType(type));
    dispatch(setCurrentLeague({ id: -1, name: 'All' }));
  };

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
      <div className={cl.modeLinks}>{currentLeague.id !== -1 && <ContentTableModeLinks />}</div>
      <div className={cl.contentTeamWrapper}>
        <ContentTeam games={games} />
      </div>
      <div className={cl.contentGridCalendarWrapper}>
        <ContentCalendars />
      </div>
    </div>
  );
};

export default HeaderSelections;
