import React, { useState, useMemo } from 'react';
import cl from './ContentPlayerTable.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchParam, getShortName, setSearchParam } from 'utils';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import CustomLeaguesDropdown from 'components/UI/dropdown/CustomLeaguesDropdown/Dropdown';
import { setCurrentCustomLeaguesForFetch, setSortDirection, setSortField } from 'redux/statsReducer';
import ContentPlayerFilterField from './ContentPlayerFilterField';
import MobileTable from './MobileTable/MobileTable';

const ContentPlayerTable = ({ getTableHeaders, getTableRows, getSortedStatsData }) => {
  const [currentTeam, setCurrentTeam] = useState(getSearchParam('team') || 'All');

  const currentCustomLeagues = useSelector(state => state.stats.currentCustomLeagues);
  const customStatsData = useSelector(state => state.stats.customStatsData);

  const isMobile = useSelector(state => state.shared.isMobile);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const currentYear = useSelector(state => state.shared.currentYear);

  const tableMode = useSelector(state => state.stats.tableMode);
  const sortField = useSelector(state => state.stats.sortField);
  const sortDirection = useSelector(state => state.stats.sortDirection);
  const statsData = useSelector(state => state.stats.statsData);
  const playerFilter = useSelector(state => state.stats.statsPlayerFilterValue);

  const currentLeague = useSelector(state => state.games.currentLeague);

  const dispatch = useDispatch();

  const handleTeamClick = team => {
    setCurrentTeam(team);
    setSearchParam('team', team);
  };

  const handleFieldClick = field => () => {
    sortField[tableMode] !== field
      ? dispatch(setSortField(field))
      : dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
  };

  let filteredStatsData = useMemo(
    () =>
      currentLeague.id === -2
        ? customStatsData.find(item => item.type === currentGameType)?.players[tableMode.toLowerCase()] || []
        : currentLeague.id !== -1
        ? statsData[currentYear]?.find(
            item =>
              (item.title === currentLeague.name || item.title === currentLeague.title) &&
              item.type === currentGameType
          )?.players[tableMode.toLowerCase()] || []
        : statsData[currentYear]?.find(item => item.title === 'All leagues' && item.type === currentGameType)
            ?.players[tableMode.toLowerCase()] || [],

    [
      currentLeague.id,
      currentLeague.name,
      currentLeague.title,
      customStatsData,
      statsData,
      currentYear,
      tableMode,
      currentGameType
    ]
  );

  const teamOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredStatsData.reduce((sum, cur) => {
            cur.teams.forEach(team => sum.push(team.name));
            return sum;
          }, [])
        )
      ),
    [filteredStatsData]
  );

  const sortedTeamOptions = useMemo(() => {
    const sortedTeamsArr = teamOptions.sort((a, b) => (a > b ? 1 : -1));
    sortedTeamsArr.unshift('All');

    return sortedTeamsArr;
  }, [teamOptions]);

  //Filtering by team
  filteredStatsData = useMemo(
    () =>
      currentTeam !== 'All'
        ? filteredStatsData.filter(player => player.teams.find(team => team.name === currentTeam))
        : filteredStatsData,
    [filteredStatsData, currentTeam]
  );

  const filterArr = playerFilter.split(' ');
  filteredStatsData =
    playerFilter !== ''
      ? filteredStatsData.filter(player => {
          return filterArr.reduce((sum, word) => {
            if (
              !(
                player.name.slice(0, word.length).toLowerCase() === word.toLowerCase() ||
                player.surname.slice(0, word.length).toLowerCase() === word.toLowerCase()
              )
            ) {
              sum = false;
            }
            return sum;
          }, true);
        })
      : filteredStatsData;

  const leaguesDropdownOptions =
    statsData[currentYear]?.filter(({ id, type }) => id !== null && type === currentGameType) || [];

  // Mobile render
  if (isMobile) {
    return (
      <MobileTable
        cl={cl}
        filteredStatsData={filteredStatsData}
        sortedTeamOptions={sortedTeamOptions}
        currentTeam={currentTeam}
        handleTeamClick={handleTeamClick}
        handleFieldClick={handleFieldClick}
        getTableHeaders={getTableHeaders}
        getTableRows={getTableRows}
        getSortedStatsData={getSortedStatsData}
      />
    );
  }

  // Desktop render

  const handleOkBtn = () => {
    dispatch(setCurrentCustomLeaguesForFetch(currentCustomLeagues));
  };

  return (
    <div className={cl.wrapper}>
      {filteredStatsData.length !== 0 || playerFilter === '' ? (
        <div>
          <div className={cl.tableHeader}>
            <div></div>
            <div>
              <Dropdown
                title={'Team'}
                options={sortedTeamOptions}
                currentOption={currentTeam}
                handleClick={handleTeamClick}
                listStyles={{ left: '-1rem', width: 'calc(100% + .1rem)' }}
                searchField={true}
              />
            </div>
            {getTableHeaders(sortField[tableMode], sortDirection, handleFieldClick, cl)}
          </div>
          <ul className={cl.rows}>
            {getSortedStatsData(filteredStatsData, sortField[tableMode], sortDirection).map((row, index) => {
              return (
                <li key={index} className={cl.tableRow}>
                  <div>
                    <Link to={`/stats/player/${row.id}`}>
                      {' '}
                      <span className={cl.fullName}>
                        {row.name} {row.surname}
                      </span>
                    </Link>
                  </div>
                  <div className={cl.teamNames}>
                    <Link
                      to={
                        row.teams[0]?.name
                          ? `/games/team/${currentGameType.toLowerCase()}/${row.teams[0].name}`
                          : ''
                      }>
                      {getShortName(row.teams[0]?.name || '-', row.teams[1] ? 12 : 28)}
                    </Link>
                    {row.teams[1] && (
                      <>
                         /{' '}
                        <Link to={`/games/team/${currentGameType.toLowerCase()}/${row.teams[1].name}`}>
                          {getShortName(row.teams[1].name, 12)}
                        </Link>
                      </>
                    )}
                    {row.teams[2] && (
                      <>
                         /{' '}
                        <Link to={`/games/team/${currentGameType.toLowerCase()}/${row.teams[2].name}`}>
                          {row.teams[2].name}
                        </Link>
                      </>
                    )}
                  </div>
                  {getTableRows(row, cl, sortField[tableMode])}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className={cl.noPlayersFound}>No players found.</p>
      )}
      <ContentPlayerFilterField />
      {currentLeague.id === -2 && (
        <CustomLeaguesDropdown
          title='Select league'
          options={leaguesDropdownOptions}
          currentOptions={currentCustomLeagues}
          handleOkBtn={handleOkBtn}
          wrapperStyles={{ position: 'absolute', left: 'calc(30px + 15%)', top: 26, width: '13%' }}
          listWrapperStyles={{ left: '-1rem', width: 'calc(100% + 4rem)' }}
        />
      )}
      {/* <Dropdown
        title={currentTeam}
        options={sortedTeamOptions}
        currentOption={currentTeam}
        handleClick={handleTeamClick}
        wrapperStyles={{ position: 'absolute', left: 'calc(30px + 15%)', top: 26, width: '13%' }}
        listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
        searchField={true}
      /> */}
    </div>
  );
};

export default ContentPlayerTable;
