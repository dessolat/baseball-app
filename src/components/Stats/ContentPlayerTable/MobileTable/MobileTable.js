import React, { useState, useEffect, useRef } from 'react';
import cl from '../ContentPlayerTable.module.scss';
import { useSelector } from 'react-redux';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { Link } from 'react-router-dom';
import ContentPlayerFilterField from '../ContentPlayerFilterField';

const MobileTable = ({
  cl,
  filteredStatsData,
  sortedTeamOptions,
  currentTeam,
  handleFieldClick,
  handleTeamClick,
  getTableHeaders,
  getTableRows,
  getSortedStatsData
}) => {
  const [isScrollable, setIsScrollable] = useState(true);

  const headerScroll = useRef(null);
  const rowsScroll = useRef(null);

  const playerFilter = useSelector(state => state.stats.statsPlayerFilterValue);
  const isMobile = useSelector(state => state.shared.isMobile);
  const mobileOrientation = useSelector(state => state.shared.mobileOrientation);
  const tableMode = useSelector(state => state.stats.tableMode);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const sortField = useSelector(state => state.stats.sortField);
  const sortDirection = useSelector(state => state.stats.sortDirection);

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
      rowsScroll.current !== null &&
        setIsScrollable(rowsScroll.current.clientWidth < rowsScroll.current.scrollWidth);
    }, 150);
  }, [isMobile, mobileOrientation]);

  const leftHeaderStyles = !isScrollable ? { borderRight: 'none', boxShadow: 'none' } : null;

  return (
    <div className={cl.mobileWrapper}>
      {filteredStatsData.length !== 0 || playerFilter === '' ? (
        <>
          <div className={cl.fullHeader}>
            <div className={cl.leftHeader} style={leftHeaderStyles}>
              <div>Players</div>
            </div>
            <div className={cl.rightHeader} ref={headerScroll}>
              <div>
                <Dropdown
                  title={'Team'}
                  options={sortedTeamOptions}
                  currentOption={currentTeam}
                  handleClick={handleTeamClick}
                  wrapperStyles={{ position: 'initial' }}
                  listWrapperClass={cl.mobileHeaderTeamDropdown}
                  listStyles={{
                    maxWidth: 125,
                    left: '125px',
                    top: '68px',
                    maxHeight: '50vh',
                    overflowY: 'scroll'
                  }}
                  itemStyles={{ fontSize: '12px', padding: '0.2rem 0.5rem' }}
                  shortNames={13}
                  searchField={true}
                />
              </div>
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
                (row, index) => (
                  <div key={index} className={cl.tableRow}>
                    <div>
                      <Link to={`/stats/player/${row.id}`}>
                        {' '}
                        <span>
                          {row.name} {row.surname}
                        </span>
                      </Link>
                    </div>
                  </div>
                )
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
                      <div>
                        {row.teams
                          .reduce((sum, team) => {
                            sum.push(team.name.slice(0, 2).toUpperCase());
                            return sum;
                          }, [])
                          .join(' / ')}
                      </div>
                      {getTableRows(row, cl, sortField[tableMode])}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      ) : (
        <p className={cl.noPlayersFound}>No players found.</p>
      )}
      <div className={cl.contentPlayerFilterFieldWrapper}>
        <ContentPlayerFilterField mobile={true} />
      </div>
    </div>
  );
};

export default MobileTable;
