import React, { useState } from 'react';
import cl from './ContentTeamTable.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getObjectsSum } from 'utils';

const ContentTeamTable = ({ getTableHeaders, getTableRows, getSortedStatsData }) => {
  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('desc');

  const tableMode = useSelector(state => state.stats.tableMode);
  const statsData = useSelector(state => state.stats.statsData);
  const currentLeague = useSelector(state => state.shared.currentLeague);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredStatsData =
    currentLeague.id !== -1
      ? statsData.find(item => item.title === currentLeague.name)?.teams[tableMode.toLowerCase()] || []
      : statsData.reduce((sum, league) => {
          league.teams[tableMode.toLowerCase()].forEach(team => {
            const teamIndex = sum.findIndex(sumTeam => sumTeam.name === team.name);

            if (teamIndex !== -1) {
              sum[teamIndex] = getObjectsSum(sum[teamIndex], team, ['name']);
            } else {
              sum.push(team);
            }
          });

          return sum;
        }, []) || [];

  return (
    <div className={cl.wrapper}>
      <div>
        <div className={cl.tableHeader}>
          <div>Team</div>
          {getTableHeaders(sortField, sortDirection, handleFieldClick, cl)}
        </div>
        <ul className={cl.rows}>
          {getSortedStatsData(filteredStatsData, sortField, sortDirection).map((row, index) => {
            return (
              <li key={index} className={cl.tableRow}>
                <div>
                  <Link to={`/games/team/${row.name}`}> {row.name}</Link>
                </div>
                {getTableRows(row, cl)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ContentTeamTable;
