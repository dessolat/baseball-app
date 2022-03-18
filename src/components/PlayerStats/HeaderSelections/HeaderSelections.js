import React, { useEffect } from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentYear, setCurrentDate, setCurrentLeague } from 'redux/sharedReducer';
import { useParams } from 'react-router-dom';
import PortraitImg from 'images/portrait.png';
import { setPlayerCurrentTeam as setCurrentTeam } from 'redux/playerStatsReducer';

const YEARS = ['All years', 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

const HeaderSelections = ({ playerYears, setPlayerYears }) => {
  const { playerName, playerSurname } = useParams();

  const statsData = useSelector(state => state.playerStats.playerStatsData);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const dispatch = useDispatch();

  useEffect(() => {
    const teamsArray =
      // currentLeague.id !== -1
      //   ?
      // statsData.leagues
      //     .find(league => league.id === currentLeague.id)
      //     .teams.reduce((sum, team) => {
      //       sum.push(team.name);
      //       return sum;
      //     }, [])
      // :
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

    dispatch(setCurrentTeam(teamsArray[0]));
    // }, [currentLeague, playerYears]);
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
		dispatch(setCurrentLeague({id: -1, name: 'All'}))
  };

  // const getTeamNames = () => {
  //   const result = [];

  //   statsData.leagues
  //     .find(league => league.id === currentLeague.id)
  //     .teams.forEach(team => result.push(team.name));

  //   return result;
  // };
  // currentLeague.id !== -1 && console.log(getTeamNames());

  const teamsArray =
    // currentLeague.id !== -1
    //   ? statsData.leagues
    //       .find(league => league.id === currentLeague.id)
    //       .teams.reduce((sum, team) => {
    //         sum.push(team.name);
    //         return sum;
    //       }, [])
    //   :
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

  return (
    <div className={cl.selections}>
      <div className={cl.playerInfo}>
        <img src={PortraitImg} alt='' />
        <div className={cl.fullName}>
          {playerName}
          <p>{playerSurname}</p>
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
        <div className={cl.batting}>
          {teamsArray.length > 1 ? (
            <Dropdown
              title={currentTeam}
              options={teamsArray}
              currentOption={currentTeam}
              handleClick={handleTeamClick}
              titleStyles={{ padding: '0 1rem', textAlign: 'center' }}
              listStyles={{ textAlign: 'center' }}
              itemStyles={{ padding: '.25rem 0' }}
            />
          ) : (
            currentTeam
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSelections;
