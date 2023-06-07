import React, { useEffect, useRef, useState, useLayoutEffect, useContext } from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentYear, setCurrentDate } from 'redux/sharedReducer';
import PortraitImg from 'images/portrait.png';
import { setPlayerCurrentTeam as setCurrentTeam, setTableType } from 'redux/playerStatsReducer';
import { getShortName, getYears } from 'utils';
import { setCurrentLeague } from 'redux/gamesReducer';
import { useParams } from 'react-router-dom';
import { PlayerYearsContext } from 'context';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Logo = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { playerId } = useParams();

  useLayoutEffect(() => {
    setLoaded(false);
    setError(false);
  }, [playerId]);

  const imgUrl = `http://baseball-gametrack.ru/api/logo/${playerId}`;

  const imgStyles = !isLoaded ? { display: 'none' } : {};
  const pHolderStyles = isLoaded || error ? { display: 'none' } : {};
  const defaultImgStyles = error ? {} : { display: 'none' };
  return (
    <>
      <div className={cl.portrait}>
        <img
          src={imgUrl}
          alt=''
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={imgStyles}
        />
        <Skeleton
          // width={22}
          // circle={true}
          height={'100%'}
          style={pHolderStyles}
        />
        <img src={PortraitImg} alt='' style={defaultImgStyles} className={cl.default} />
      </div>
    </>
  );
};

const HeaderSelections = () => {
  const { playerYears, setPlayerYears, calculateTeamsArray } = useContext(PlayerYearsContext);

  const firstMountRef = useRef(true);

  const {
    playerStatsData: statsData,
    playerCurrentTeam: currentTeam,
    tableType
  } = useSelector(state => state.playerStats);
  const isMobile = useSelector(state => state.shared.isMobile);
  const currentLeague = useSelector(state => state.games.currentLeague);

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

  const teamsArray = calculateTeamsArray(tableType);
  teamsArray.length > 1 && teamsArray.unshift('All teams');

  const handleTableOptionClick = option => {
    const teamsArray = calculateTeamsArray(option);

    dispatch(setCurrentTeam(teamsArray.length > 1 ? 'All teams' : teamsArray[0]));
    dispatch(setTableType(option));
  };

  //Table options calculating
  function getSortedTableOptions() {
    const filteredLeagues =
      playerYears === 'All years'
        ? currentTeam === 'All teams'
          ? statsData.leagues.filter(league => league.teams.find(team => team[tableType.toLowerCase()]))
          : statsData.leagues.filter(league =>
              league.teams.find(team => team.name === currentTeam && team[tableType.toLowerCase()])
            )
        : currentTeam === 'All teams'
        ? statsData.leagues.filter(
            league => league.year === playerYears && league.teams.find(team => team[tableType.toLowerCase()])
          )
        : statsData.leagues.filter(
            league =>
              league.year === playerYears &&
              league.teams.find(team => team.name === currentTeam && team[tableType.toLowerCase()])
          );

    const selectedLeague = statsData.leagues.find(league => league.id === currentLeague.id);

    const options = [];
    const anotherTableType =
      tableType === 'Batting' || tableType === 'Fielding' || tableType === 'Running' ? 'Pitching' : 'Batting';

    //All leagues
    if (currentLeague.id === -1) {
      const anotherTableTypeFilteredLeagues =
        playerYears === 'All years'
          ? currentTeam === 'All teams'
            ? statsData.leagues.filter(league =>
                league.teams.find(team => team[anotherTableType.toLowerCase()])
              )
            : statsData.leagues.filter(league =>
                league.teams.find(team => team.name === currentTeam && team[anotherTableType.toLowerCase()])
              )
          : currentTeam === 'All teams'
          ? statsData.leagues.filter(
              league =>
                league.year === playerYears && league.teams.find(team => team[anotherTableType.toLowerCase()])
            )
          : statsData.leagues.filter(
              league =>
                league.year === playerYears &&
                league.teams.find(team => team.name === currentTeam && team[anotherTableType.toLowerCase()])
            );

      if (filteredLeagues.length > 0) {
        if (tableType === 'Pitching') {
          options.push('Pitching');
        } else {
          options.push('Batting');
          options.push('Fielding');
          options.push('Running');
        }
      }
      if (anotherTableTypeFilteredLeagues.length > 0) {
        if (anotherTableType === 'Pitching') {
          options.push('Pitching');
        } else {
          if (options.length > 0) {
            options.unshift('Running');
            options.unshift('Fielding');
            options.unshift('Batting');
          } else {
            options.push('Batting');
            options.push('Fielding');
            options.push('Running');
          }
        }
      }

      return options;
    }

    //Selected league
    const filteredLeague = selectedLeague.teams.find(team => team.name === currentTeam);

    if (filteredLeague) {
      if (filteredLeague.batting) {
        options.push('Batting');
        options.push('Fielding');
        options.push('Running');
      }
      filteredLeague.pitching && options.push('Pitching');
    } else {
      if (selectedLeague.teams.find(team => team.batting)) {
        options.push('Batting');
        options.push('Fielding');
        options.push('Running');
      }
      selectedLeague.teams.find(team => team.pitching) && options.push('Pitching');
    }

    return options;
  }

  const yearsArr = getYears();
  yearsArr.unshift('All years');
  return (
    <div className={cl.selections}>
      <div className={cl.playerInfo}>
        <Logo />
        <div className={cl.fullName}>
          {statsData.name}
          <p>{statsData.surname}</p>
        </div>
      </div>
      <div className={cl.bottom}>
        <div className={cl.years}>
          <Dropdown
            title={playerYears}
            options={yearsArr}
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
            {getSortedTableOptions().length > 1 ? (
              <Dropdown
                title={tableType}
                options={getSortedTableOptions()}
                currentOption={tableType}
								listWrapperClass={cl.mobileTableModesDropdown}
                handleClick={handleTableOptionClick}
              />
            ) : getSortedTableOptions().length === 1 ? (
              tableType
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSelections;
