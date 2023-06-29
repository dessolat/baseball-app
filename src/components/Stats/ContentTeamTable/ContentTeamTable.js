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
  const mobileOrientation = useSelector(state => state.shared.mobileOrientation);
  const currentYear = useSelector(state => state.shared.currentYear);

  const dispatch = useDispatch();

  const headerScroll = useRef(null);
  const rowsScroll = useRef(null);

  useEffect(() => {
    if (rowsScroll.current === null || !isMobile) return;

    setTimeout(() => setIsScrollable(rowsScroll.current?.clientWidth < rowsScroll.current?.scrollWidth), 500);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    setIsScrollable(rowsScroll.current.clientWidth < rowsScroll.current.scrollWidth);
  }, [tableMode, currentLeague.id, isMobile]);

  useEffect(() => {
    if (!isMobile || rowsScroll.current === null) return;

    setTimeout(() => {
      setIsScrollable(rowsScroll.current.clientWidth < rowsScroll.current.scrollWidth);
    }, 150);
  }, [isMobile, mobileOrientation]);

  const handleFieldClick = field => () => {
    sortField[tableMode] !== field
      ? dispatch(setSortField(field))
      : dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
  };

  const filteredStatsData =
    currentLeague.id !== -1
      ? statsData[currentYear].find(
          item => item.title === currentLeague.name && item.type === currentGameType
        )?.teams[tableMode.toLowerCase()] || []
      : statsData[currentYear].find(item => item.title === 'All leagues' && item.type === currentGameType)
          ?.teams[tableMode.toLowerCase()] || [];

  const leftHeaderStyles = !isScrollable ? { borderRight: 'none', boxShadow: 'none' } : null;

	// Mobile render
  if (isMobile) {
    return (
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
            {getSortedStatsData(filteredStatsData, sortField[tableMode], sortDirection).map((row, index) => {
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
            {getSortedStatsData(filteredStatsData, sortField[tableMode], sortDirection).map((row, index) => {
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
            })}
          </div>
        </div>
      </div>
    );
  }

	// Desktop render
  return (
    <div className={cl.wrapper}>
      <div>
        <div className={cl.tableHeader}>
          <div>Team</div>
          {getTableHeaders(sortField[tableMode], sortDirection, handleFieldClick, cl)}
        </div>
        <ul className={cl.rows}>
          {getSortedStatsData(filteredStatsData, sortField[tableMode], sortDirection).map((row, index) => {
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
          })}
        </ul>
      </div>
    </div>
  );
};

export default ContentTeamTable;
