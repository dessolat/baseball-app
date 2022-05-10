import React, { useEffect } from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentYear, setCurrentDate, setCurrentLeague } from 'redux/sharedReducer';
import PortraitImg from 'images/portrait.png';
import { setPlayerCurrentTeam as setCurrentTeam, setTableType } from 'redux/playerStatsReducer';
import { getShortName } from 'utils';

const YEARS = ['All years', 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];
const TABLE_OPTIONS = ['Batting', 'Fielding', 'Running', 'Pitching'];

const HeaderSelections = ({ playerYears, setPlayerYears }) => {
  const statsData = useSelector(state => state.playerStats.playerStatsData);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const isMobile = useSelector(state => state.shared.isMobile);
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const tableType = useSelector(state => state.playerStats.tableType);

  const dispatch = useDispatch();

  useEffect(() => {
    const teamsArray =
      playerYears === 'All years'
        ? Array.from(
            statsData.leagues.reduce((sum, league) => {
              league.teams.forEach(team => sum.add(team.name));
              return sum;
            }, new Set())
          )
        : Array.from(
            statsData.leagues
              .filter(league => league.year === playerYears)
              .reduce((sum, league) => {
                league.teams.forEach(team => sum.add(team.name));
                return sum;
              }, new Set())
          );

    dispatch(setCurrentTeam(teamsArray.length > 1 ? 'All teams' : teamsArray[0]));
    // eslint-disable-next-line
  }, [playerYears]);

  const handleYearClick = option => {
    setPlayerYears(option);

    if (option === 'All years') return;

    const tempDate = new Date(option, 0, 1);
    tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
  };

  const handleTeamClick = team => {
    dispatch(setCurrentTeam(team));
  };

  const teamsArray =
    playerYears === 'All years'
      ? Array.from(
          statsData.leagues.reduce((sum, league) => {
            league.teams.forEach(team => sum.add(team.name));
            return sum;
          }, new Set())
        )
      : currentLeague.id === -1
      ? Array.from(
          statsData.leagues
            .filter(league => league.year === playerYears)
            .reduce((sum, league) => {
              league.teams.forEach(team => sum.add(team.name));
              return sum;
            }, new Set())
        )
      : currentLeague.teams.length > 1
      ? currentLeague.teams.reduce((sum, team) => {
          sum.push(team.name);
          return sum;
        }, [])
      : [currentLeague.teams[0].name];
  teamsArray.unshift('All teams');

  const handleTableOptionClick = option => dispatch(setTableType(option));
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
          {teamsArray.length > 2 ? (
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
