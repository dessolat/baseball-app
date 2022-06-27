import React, { useState, useEffect, useRef } from 'react';
import cl from './ContentTeamTable.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSortDirection, setSortField } from 'redux/statsReducer';

const ContentTeamTable = ({ getTableHeaders, getTableRows, getSortedStatsData }) => {
  const [isScrollable, setIsScrollable] = useState(true);

  const tableMode = useSelector(state => state.stats.tableMode);
  const sortField = useSelector(state => state.stats.sortField);
  const sortDirection = useSelector(state => state.stats.sortDirection);
  const statsData = useSelector(state => state.stats.statsData);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const isMobile = useSelector(state => state.shared.isMobile);

  const dispatch = useDispatch();

  const headerScroll = useRef(null);
  const rowsScroll = useRef(null);

  useEffect(() => {
    if (rowsScroll.current === null || !isMobile) return;

    setTimeout(() => setIsScrollable(rowsScroll.current?.clientWidth < rowsScroll.current?.scrollWidth), 500);
		// eslint-disable-next-line
  }, []);

  useEffect(() => {
		if (!isMobile) return

    setIsScrollable(rowsScroll.current.clientWidth < rowsScroll.current.scrollWidth);
  }, [tableMode, currentLeague.id, isMobile]);

  const handleFieldClick = field => () => {
    sortField[tableMode] !== field
      ? dispatch(setSortField(field))
      : dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
  };

  const filteredStatsData =
    currentLeague.id !== -1
      ? statsData.find(item => item.title === currentLeague.name && item.type === currentGameType)?.teams[
          tableMode.toLowerCase()
        ] || []
      : statsData.find(item => item.title === 'All leagues' && item.type === currentGameType)?.teams[
          tableMode.toLowerCase()
        ] || [];
  // statsData
  //     .filter(league => league.type === currentGameType)
  //     .reduce((sum, league) => {
  //       league.teams[tableMode.toLowerCase()].forEach(team => {
  //         const teamIndex = sum.findIndex(sumTeam => sumTeam.name === team.name);

  //         if (teamIndex !== -1) {
  //           sum[teamIndex] = getObjectsSum(sum[teamIndex], team, ['name']);
  //         } else {
  //           sum.push(team);
  //         }
  //       });

  //       return sum;
  //     }, [])

  const leftHeaderStyles = !isScrollable ? { borderRight: 'none', boxShadow: 'none' } : null;
  return (
    <>
      {isMobile ? (
        <div className={cl.mobileWrapper}>
          <div className={cl.fullHeader}>
            <div className={cl.leftHeader} style={leftHeaderStyles}>
              <div>Team</div>
            </div>
            <div className={cl.rightHeader} ref={headerScroll}>
              {getTableHeaders(sortField[tableMode], sortDirection, handleFieldClick, cl, {
                top: '.1rem',
                transform: 'translateX(-50%) scale(0.7)'
              })}
            </div>
          </div>
          <div className={cl.sides}>
            <div
              className={cl.leftRows}
              style={!isScrollable ? { borderRight: 'none', boxShadow: 'none' } : null}>
              {getSortedStatsData(filteredStatsData, sortField[tableMode], sortDirection).map(
                (row, index) => {
                  return (
                    <div key={index} className={cl.tableRow}>
                      <div>
                        <Link to={`/games/team/${currentGameType.toLowerCase()}/${row.name}`}>
                          {' '}
                          {row.name}
                        </Link>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <div
              className={cl.rightRows}
              onScroll={e => (headerScroll.current.scrollLeft = e.target.scrollLeft)}
              ref={rowsScroll}>
              {getSortedStatsData(filteredStatsData, sortField[tableMode], sortDirection).map(
                (row, index) => {
                  return (
                    <div
                      key={index}
                      className={cl.tableRow}
                      style={{
                        width: !isScrollable ? '100%' : 'fit-content'
                      }}>
                      {getTableRows(row, cl, sortField[tableMode])}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={cl.wrapper}>
          <div>
            <div className={cl.tableHeader}>
              <div>Team</div>
              {getTableHeaders(sortField[tableMode], sortDirection, handleFieldClick, cl)}
            </div>
            <ul className={cl.rows}>
              {getSortedStatsData(filteredStatsData, sortField[tableMode], sortDirection).map(
                (row, index) => {
                  return (
                    <li key={index} className={cl.tableRow}>
                      <div>
                        <Link
                          className={cl.teamName}
                          to={`/games/team/${currentGameType.toLowerCase()}/${row.name}`}>
                          {' '}
                          {row.name}
                        </Link>
                      </div>
                      {getTableRows(row, cl, sortField[tableMode])}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentTeamTable;
