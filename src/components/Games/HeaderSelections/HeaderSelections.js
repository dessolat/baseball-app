import React, { useContext, useEffect, useRef } from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentYear, setCurrentDate, setCurrentGameType } from 'redux/sharedReducer';
import { getYears, setSearchParam } from 'utils';
import { setCurrentLeague } from 'redux/gamesReducer';
import ContentTableModeLinks from '../ContentTable/ContentTableModeLinks';
import ContentTeam from '../ContentTable/ContentTeam';
import ContentCalendars from '../ContentTable/ContentCalendars';
import { GamesLoadingContext } from 'context';

const HeaderSelections = () => {
  const { currentYear, currentGameType } = useSelector(state => state.shared);
  const { currentLeague, games, summaryYearsData } = useSelector(state => state.games);

  const dispatch = useDispatch();

  const firstMountRef = useRef(true);

	const isLoading = useContext(GamesLoadingContext)

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

  // const yearsArr = getYears();
  const yearsArr = Object.keys(summaryYearsData)
    .map(year => +year)
    .reverse();

  return (
    <div className={cl.selections}>
      <div className={cl.years}>
        <Dropdown
          title={currentYear}
          options={yearsArr}
          currentOption={currentYear}
          handleClick={handleClick}
					disabled={isLoading}
        />
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
