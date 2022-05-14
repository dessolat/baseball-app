import React, { useState, useRef } from 'react';
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
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const isMobile = useSelector(state => state.shared.isMobile);

  const headerScroll = useRef(null);
  const rowsScroll = useRef(null);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredStatsData =
    currentLeague.id !== -1
      ? statsData
          
          .find(item => item.title === currentLeague.name && item.type === currentGameType)?.teams[tableMode.toLowerCase()] || []
      : statsData.filter(league => league.type === currentGameType).reduce((sum, league) => {
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
    <>
      {isMobile ? (
        <div className={cl.mobileWrapper}>
          <div className={cl.fullHeader}>
            <div className={cl.leftHeader}>
              <div>Team</div>
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
                return (
                  <div key={index} className={cl.tableRow}>
                    <div>
                      <Link to={`/games/team/${currentGameType.toLowerCase()}/${row.name}`}> {row.name}</Link>
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
              <div>Team</div>
              {getTableHeaders(sortField, sortDirection, handleFieldClick, cl)}
            </div>
            <ul className={cl.rows}>
              {getSortedStatsData(filteredStatsData, sortField, sortDirection).map((row, index) => {
                return (
                  <li key={index} className={cl.tableRow}>
                    <div>
                      <Link to={`/games/team/${currentGameType.toLowerCase()}/${row.name}`}> {row.name}</Link>
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

export default ContentTeamTable;
