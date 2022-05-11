import React, { useState, useRef, useEffect } from 'react';
import cl from './ContentMobileTable.module.scss';
import { useSelector } from 'react-redux';
import ActiveBodyCell from 'components/UI/ActiveBodyCell/ActiveBodyCell';
import SortField from 'components/UI/sortField/SortField';
import { getShortName } from 'utils';

const ContentMobileTable = ({ filteredLeagues, filteredLeague, playerYears, MONTHS }) => {
  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isScrollable, setIsScrollable] = useState(true);

  const currentLeague = useSelector(state => state.shared.currentLeague);
  const tableMode = useSelector(state => state.playerStats.tableType);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);

  const headerScroll = useRef(null);
  const rowScrollRef = useRef();

  useEffect(() => {
		if (rowScrollRef.current === null) return

    setTimeout(
      () => setIsScrollable(rowScrollRef.current?.clientWidth < rowScrollRef.current?.scrollWidth),
      500
    );
  }, []);

  useEffect(() => {
    setIsScrollable(rowScrollRef.current.clientWidth < rowScrollRef.current.scrollWidth);
  }, [tableMode, currentLeague.id]);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const getTableHeaders = (sortField, sortDirection, handleFieldClick, cl, arrowStyles = null) =>
    tableMode === 'Batting' ? (
      <>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          AB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          H
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          1B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          2B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          3B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          HR
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          RBI
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          GDP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          BB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          HP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SH
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SF
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SO
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          TB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          AVG
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          SLG
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          OBP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          OPS
        </SortField>
      </>
    ) : tableMode === 'Pitching' ? (
      <>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          2B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          3B
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          BB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          BK
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          ER
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          ERA
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          H
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          HP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          HR
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          IBB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          IP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          NB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          NP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          NS
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          PA
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          R
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SF
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SH
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SO
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          WP
        </SortField>
      </>
    ) : tableMode === 'Running' ? (
      <>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          CS
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          LOB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          R
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          SB
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}
          renamedField='SB_pr'>
          %SB
        </SortField>
      </>
    ) : (
      <>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          A
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          CH
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          DP
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          E
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}
          addedClass={cl.wider}>
          FLD
        </SortField>
        <SortField
          sortField={sortField}
          sortDirection={sortDirection}
          handleClick={handleFieldClick}
          arrowStyles={arrowStyles}>
          PO
        </SortField>
      </>
    );

  const getTableRows = (row, cl, sortField) =>
    tableMode === 'Batting' ? (
      <>
        <ActiveBodyCell sortField={sortField} row={row}>
          AB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          H
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          1B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          2B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          3B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          HR
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          RBI
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          GDP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          BB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          HP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SH
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SF
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SO
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          TB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          AVG
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          SLG
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          OBP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          OPS
        </ActiveBodyCell>
      </>
    ) : tableMode === 'Pitching' ? (
      <>
        <ActiveBodyCell sortField={sortField} row={row}>
          2B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          3B
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          BB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          BK
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          ER
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={2} addedClass={cl.wider}>
          ERA
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          H
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          HP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          HR
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          IBB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={1}>
          IP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          NB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          NP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          NS
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          PA
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          R
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SF
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SH
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SO
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          WP
        </ActiveBodyCell>
      </>
    ) : tableMode === 'Running' ? (
      <>
        <ActiveBodyCell sortField={sortField} row={row}>
          CS
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          LOB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          R
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          SB
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          SB_pr
        </ActiveBodyCell>
      </>
    ) : (
      <>
        <ActiveBodyCell sortField={sortField} row={row}>
          A
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          CH
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          DP
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          E
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
          FLD
        </ActiveBodyCell>
        <ActiveBodyCell sortField={sortField} row={row}>
          PO
        </ActiveBodyCell>
      </>
    );

  const sortedLeagueGames =
    filteredLeague &&
    filteredLeague[tableMode.toLowerCase()][`games_${tableMode.toLowerCase()}`]
      .slice()
      .sort((a, b) =>
        a[sortField] > b[sortField] ? (sortDirection === 'asc' ? 1 : -1) : sortDirection === 'asc' ? -1 : 1
      );

  const sortedLeagues = filteredLeagues
    .slice()
    .sort((a, b) =>
      a.teams.find(team => team.name === currentTeam)[tableMode.toLowerCase()][sortField] >
      b.teams.find(team => team.name === currentTeam)[tableMode.toLowerCase()][sortField]
        ? sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1
    );

  let leftHeaderStyles = {
    flex: `0 0 ${currentLeague.id !== -1 ? 260 : playerYears === 'All years' ? 210 : 150}px`
  };
  !isScrollable && Object.assign(leftHeaderStyles, { borderRight: 'none', boxShadow: 'none' });

  return (
    <div className={cl.mobileWrapper}>
      <div className={cl.fullHeader}>
        <div className={cl.leftHeader} style={leftHeaderStyles}>
          {playerYears === 'All years' && <div className={cl.years}>Years</div>}
          {currentLeague.id === -1 && <div className={cl.league}>League</div>}
          {currentLeague.id !== -1 && <div className={cl.game}>Game</div>}
        </div>
        <div className={cl.rightHeader} ref={headerScroll}>
          {getTableHeaders(sortField, sortDirection, handleFieldClick, cl, {
            top: '.1rem',
            transform: 'translateX(-50%) scale(0.7)'
          })}
        </div>
      </div>
      <div className={cl.sides}>
        <div
          className={cl.leftRows}
          style={!isScrollable ? { borderRight: 'none', boxShadow: 'none' } : null}>
          {currentLeague.id === -1 //All leagues
            ? sortedLeagues.map((row, index) => {
                const team = row.teams.find(team => team.name === currentTeam);
                return (
                  <div key={index} className={cl.tableRow}>
                    {playerYears === 'All years' && <div className={cl.years}>{row.year}</div>}
                    <div className={cl.league}>{row.title}</div>
                  </div>
                );
              }) //Selected league
            : sortedLeagueGames.map((row, index) => (
                <div key={index} className={cl.tableRow}>
                  <div className={cl.game}>
                    <div className={cl.date}>
                      {row.date.slice(8, 10)} {MONTHS[+row.date.slice(5, 7) - 1]},
                    </div>
                    <div className={cl.teamNames}>
                      {getShortName(row.home_team.name, 26)} - {getShortName(row.visit_team.name, 26)}
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div
          className={cl.rightRows}
          onScroll={e => (headerScroll.current.scrollLeft = e.target.scrollLeft)}
          ref={rowScrollRef}>
          {currentLeague.id === -1 //All leagues
            ? sortedLeagues.map((row, index) => {
                const team = row.teams.find(team => team.name === currentTeam);
                return (
                  <div
                    key={index}
                    className={cl.tableRow}
                    style={{
                      width: !isScrollable ? '100%' : 'fit-content'
                    }}
										>
                    {getTableRows(team[tableMode.toLowerCase()], cl, sortField)}
                  </div>
                );
              }) //Selected league
            : sortedLeagueGames.map((row, index) => (
                <div key={index} className={cl.tableRow}>
                  {getTableRows(row, cl, sortField)}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ContentMobileTable;
