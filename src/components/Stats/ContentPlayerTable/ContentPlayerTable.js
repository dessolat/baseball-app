import React, { useState, useLayoutEffect, useMemo, useRef } from 'react';
import cl from './ContentPlayerTable.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getObjectsSum, getShortName } from 'utils';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import TeamLogo from 'images/team_logo.png';

const ContentPlayerTable = ({ getTableHeaders, getTableRows, getSortedStatsData }) => {
  const [currentTeam, setCurrentTeam] = useState('All');
  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('desc');

  const headerScroll = useRef(null);
  const rowsScroll = useRef(null);

  const isMobile = useSelector(state => state.shared.isMobile);
  const currentGameType = useSelector(state => state.shared.currentGameType);

  const tableMode = useSelector(state => state.stats.tableMode);
  const statsData = useSelector(state => state.stats.statsData);
  const currentLeague = useSelector(state => state.shared.currentLeague);

  const handleTeamClick = team => setCurrentTeam(team);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  let filteredStatsData = useMemo(
    () =>
      currentLeague.id !== -1
        ? statsData.find(item => item.title === currentLeague.name && item.type === currentGameType)?.players[tableMode.toLowerCase()] || []
        : statsData
            .filter(league => league.type === currentGameType)
            .reduce((sum, league) => {
              league.players[tableMode.toLowerCase()].forEach(player => {
                const playerIndex = sum.findIndex(sumPlayer => sumPlayer.id === player.id);

                if (playerIndex !== -1) {
                  sum[playerIndex] = getObjectsSum(sum[playerIndex], player, [
                    'name',
                    'surname',
                    'teams',
                    'id'
                  ]);
                } else {
                  sum.push(player);
                }
              });

              return sum;
            }, []) || [],
    [currentLeague, statsData, tableMode, currentGameType]
  );

  const teamOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredStatsData.reduce(
            (sum, cur) => {
              cur.teams.forEach(team => sum.push(team.name));
              return sum;
            },
            ['All']
          )
        )
      ),
    [filteredStatsData]
  );
  //Filtering by team
  filteredStatsData = useMemo(
    () =>
      currentTeam !== 'All'
        ? filteredStatsData.filter(player => player.teams.find(team => team.name === currentTeam))
        : filteredStatsData,
    [filteredStatsData, currentTeam]
  );

  return (
    <>
      {isMobile ? (
        <div className={cl.mobileWrapper}>
          <div className={cl.fullHeader}>
            <div className={cl.leftHeader}>
              <div>Players</div>
              <div>POS</div>
              <div>
                <Dropdown
                  title={'Team'}
                  options={teamOptions}
                  currentOption={currentTeam}
                  handleClick={handleTeamClick}
                  listStyles={{ left: '-.3rem', width: 'calc(100% + 4rem)' }}
                  itemStyles={{ fontSize: '12px', padding: '0.2rem 0.5rem' }}
                  shortNames={13}
                />
              </div>
            </div>
            <div className={cl.rightHeader} ref={headerScroll}>
              {getTableHeaders(sortField, sortDirection, handleFieldClick, cl, {
                top: '.1rem',
                transform: 'translateX(-50%) scale(0.7)'
              })}
            </div>
          </div>
          <div className={cl.sides}>
            <div className={cl.leftRows}>
              {getSortedStatsData(filteredStatsData, sortField, sortDirection).map((row, index) => {
								const posValue = row.teams
								.reduce((sum, team) => {
									sum.push(team.pos);
									return sum;
								}, [])
								.join(' / ');
                return (
                  <div key={index} className={cl.tableRow}>
                    <div>
                      <Link to={`/stats/player/${row.id}`}>
                        {' '}
                        <span>
                          {row.name} {row.surname}
                        </span>
                      </Link>
                    </div>
                    <div>{posValue}</div>
                    <div>
                      <img src={TeamLogo} alt='team-logo' />
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className={cl.rightRows}
              onScroll={e => (headerScroll.current.scrollLeft = e.target.scrollLeft)}
              ref={rowsScroll}>
              {getSortedStatsData(filteredStatsData, sortField, sortDirection).map((row, index) => {
                return (
                  <div key={index} className={cl.tableRow}>
                    {getTableRows(row, cl, sortField)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className={cl.wrapper}>
          <div>
            <div className={cl.tableHeader}>
              <div></div>
              <div>POS</div>
              <div>
                <Dropdown
                  title={'Team'}
                  options={teamOptions}
                  currentOption={currentTeam}
                  handleClick={handleTeamClick}
                  listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
                />
              </div>
              {getTableHeaders(sortField, sortDirection, handleFieldClick, cl)}
            </div>
            <ul className={cl.rows}>
              {getSortedStatsData(filteredStatsData, sortField, sortDirection).map((row, index) => {
                const posValue = row.teams
                  .reduce((sum, team) => {
                    sum.push(team.pos);
                    return sum;
                  }, [])
                  .join(' / ');

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
                    <div>{posValue}</div>
                    <div className={cl.teamNames}>
                      <Link to={`/games/team/${currentGameType.toLowerCase()}/${row.teams[0].name}`}>
                        {getShortName(row.teams[0].name, row.teams[1] ? 12 : 28)}
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
                           / <Link to={`/games/team/${currentGameType.toLowerCase()}/${row.teams[2].name}`}>{row.teams[2].name}</Link>
                        </>
                      )}
                    </div>
                    {getTableRows(row, cl, sortField)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentPlayerTable;
