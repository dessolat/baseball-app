import React, { useEffect, useRef } from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentYear, setCurrentDate } from 'redux/sharedReducer';
import PortraitImg from 'images/portrait.png';
import { setPlayerCurrentTeam as setCurrentTeam, setTableType } from 'redux/playerStatsReducer';
import { getShortName } from 'utils';
import { setCurrentLeague } from 'redux/gamesReducer';

const YEARS = ['All years', 2022, 2021, 2020];
const TABLE_OPTIONS = ['Batting', 'Fielding', 'Running', 'Pitching'];

const HeaderSelections = ({ playerYears, setPlayerYears, calculateTeamsArray }) => {
  const firstMountRef = useRef(true);

  const statsData = useSelector(state => state.playerStats.playerStatsData);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const isMobile = useSelector(state => state.shared.isMobile);
  const tableType = useSelector(state => state.playerStats.tableType);

  const dispatch = useDispatch();

  useEffect(() => {
    const teamsArray = calculateTeamsArray(tableType);

    if (firstMountRef.current === true) {
      firstMountRef.current = false;

      if (currentTeam !== null && teamsArray.length > 1) return;
    }
    dispatch(setCurrentTeam(teamsArray.length > 1 ? 'All teams' : teamsArray[0]));
    // eslint-disable-next-line
  }, [playerYears]);

  const handleYearClick = option => {
    setPlayerYears(option);

    dispatch(setCurrentLeague({ id: -1, name: 'All', title: 'All' }));

    if (option === 'All years') return;

    const tempDate = new Date(option, 0, 1);
    tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
  };

  const handleTeamClick = team => {
    dispatch(setCurrentTeam(team));
  };

  const teamsArray = calculateTeamsArray(tableType)
  teamsArray.length > 1 && teamsArray.unshift('All teams');

  const handleTableOptionClick = option => {
    const teamsArray = calculateTeamsArray(option);

    dispatch(setCurrentTeam(teamsArray.length > 1 ? 'All teams' : teamsArray[0]));
    dispatch(setTableType(option));
  };

  return (
    <div className={cl.selections}>
      <div className={cl.playerInfo}>
        <img src={PortraitImg} alt='' />
        <div className={cl.fullName}>
          {statsData.name}
          <p>{statsData.surname}</p>
        </div>
      </div>
      <div className={cl.bottom}>
        <div className={cl.years}>
          <Dropdown
            title={playerYears}
            options={YEARS}
            currentOption={playerYears}
            handleClick={handleYearClick}
            listStyles={{ textAlign: 'center' }}
            itemStyles={{ padding: '.3rem 0' }}
          />
        </div>
        <div className={cl.teamsSelector}>
          {teamsArray.length > 1 ? (
            <Dropdown
              title={getShortName(currentTeam || '', isMobile ? 10 : 13)}
              options={teamsArray}
              currentOption={currentTeam}
              handleClick={handleTeamClick}
              titleStyles={{ padding: '0 1rem', textAlign: 'center' }}
              listStyles={{ textAlign: 'center' }}
              itemStyles={{ padding: '.25rem 0' }}
            />
          ) : (
            getShortName(currentTeam || '', 16)
          )}
        </div>
        {isMobile && (
          <div className={cl.dropWrapper}>
            <Dropdown
              title={tableType}
              options={TABLE_OPTIONS}
              currentOption={tableType}
              handleClick={handleTableOptionClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSelections;
