import React, { useState, useMemo } from 'react';
import cl from './ContentPlayerTable.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getObjectsSum } from 'utils';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';

const ContentPlayerTable = ({ getTableHeaders, getTableRows, getSortedStatsData }) => {
  const [currentTeam, setCurrentTeam] = useState('All');
  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('desc');

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
        ? statsData.find(item => item.title === currentLeague.name)?.players[tableMode.toLowerCase()] || []
        : statsData.reduce((sum, league) => {
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
    [currentLeague, statsData, tableMode]
  );
  const teamOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredStatsData.reduce(
            (sum, cur) => {
              cur.teams.forEach(team => sum.push(team.name));
              // sum.push(cur.owners_name);
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
            return (
              <li key={index} className={cl.tableRow}>
                <div>
                  <Link to={`/stats/player/${row.name}/${row.surname}`}>
                    {' '}
                    <span className={cl.fullName}>
                      {row.name} {row.surname}
                    </span>
                  </Link>
                </div>
                <div>{index}</div>
                <div className={cl.teamNames}>
                  <Link to={`/games/team/${row.teams[0].name}`}>{row.teams[0].name}</Link>
                  {row.teams[1] && (
                    <>
                       / <Link to={`/games/team/${row.teams[1].name}`}>{row.teams[1].name}</Link>
                    </>
                  )}
                  {row.teams[2] && (
                    <>
                       / <Link to={`/games/team/${row.teams[2].name}`}>{row.teams[2].name}</Link>
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
  );
};

export default ContentPlayerTable;
